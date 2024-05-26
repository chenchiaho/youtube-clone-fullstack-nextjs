import { httpsCallable } from 'firebase/functions'
import { functions } from './firebase'

const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl')
const getVideosFunction = httpsCallable(functions, 'getVideos')

export interface Video {
    id?: string,
    uid?: string,
    filename?: string,
    status?: 'processing' | 'processed',
    title?: string,
    description?: string
}


export const uploadVideo = async (file: File) => {
    const response: any = await generateUploadUrlFunction({
        fileExtension: file.name.split('.').pop()
    })

    // Upload the file to the signed URL
    const uploadResult = await fetch(response?.data?.url, {
        method: 'PUT',
        body: file,
        headers: {
            'Content-Type': file.type,
        },
        cache: 'no-cache'
    })

    return uploadResult
}

export const getVideos = async () => {
    const response: any = await getVideosFunction()
    return response.data as Video[]
}
