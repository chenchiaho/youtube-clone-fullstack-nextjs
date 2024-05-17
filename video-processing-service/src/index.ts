import express from 'express'
import Ffmpeg from 'fluent-ffmpeg'
import fs from 'fs'

const app = express()
app.use(express.json())

app.post('/process-video', (req, res) => {
    const inputFilePath = req.body.inputFilePath
    const outputFilePath = req.body.outputFilePath

    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad Request: Missing file path.')
    }

    if (!fs.existsSync(inputFilePath)) {
        return res.status(400).send('Bad Request: Input file does not exist.')
    }

    Ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale=-2:360')
        .on('start', (commandLine) => {
            console.log(`Spawned FFmpeg with command: ${commandLine}`)
        })
        .on('end', () => {
            console.log('Processing finished successfully.')
            res.status(200).send('Processing finished successfully.')
        })
        .on('error', (err) => {
            console.error(`Internal Server Error: ${err.message}`)
            res.status(500).send(`Internal Server Error: ${err.message}`)
        })
        .save(outputFilePath)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
