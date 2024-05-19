import { Storage } from '@google-cloud/storage'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

const storage = new Storage()

const rawVideoBucketName = 'chenchiaho-raw-videos'
const processedVideoBucketName = 'chenchiaho-processed-videos'

const localRawVideoPath = './raw-videos'
const localProcessedVideoPath = './processed-videos'


// Creates the local directories for raw and processed videos
export const setupDirectories = () => {
    ensureDirectoryExistence(localRawVideoPath)
    ensureDirectoryExistence(localProcessedVideoPath)
}


// Returns a promise that resolves when the video has been converted
export const convertVideo = (rawVideoName: string, processedVideoName: string) => {

    return new Promise<void>((resolve, reject) => {
        ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
            .outputOptions("-vf", "scale=-2:360") // 360p
            .on("end", function () {
                console.log("Processing finished successfully")
                resolve()
            })
            .on("error", function (err: any) {
                console.log("An error occurred: " + err.message)
                reject(err)
            })
            .save(`${localProcessedVideoPath}/${processedVideoName}`)
    })

}

// Returns a promise that resolves when the file has been downloaded
export const downloadRawVideo = async (fileName: string) => {
    await storage.bucket(rawVideoBucketName)
        .file(fileName)
        .download({
            destination: `${localRawVideoPath}/${fileName}`
        })

    console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}.`)
}

// Returns a promise that resolves when the file has been uploaded
export const uploadProcessedVideo = async (fileName: string) => {
    const bucket = storage.bucket(processedVideoBucketName)

    await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
        destination: fileName,
    })

    console.log(
        `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`
    )

    await bucket.file(fileName).makePublic()
}


export const deleteRawVideo = (fileName: string) => {
    return deleteFile(`${localRawVideoPath}/${fileName}`)
}

export const deleteProcessedVideo = (fileName: string) => {
    return deleteFile(`${localProcessedVideoPath}/${fileName}`)
}

// Returns a promise that resolves when the file has been deleted
const deleteFile = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Failed to delete file at ${filePath}`, err)
                    reject(err)
                } else {
                    console.log(`File deleted at ${filePath}`)
                    resolve()
                }
            })
        } else {
            console.log(`File not found at ${filePath}, skipping delete.`)
            resolve()
        }
    })
}

const ensureDirectoryExistence = (dirPath: string) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }) // recursive: true enables creating nested directories
        console.log(`Directory created at ${dirPath}`)
    }
}