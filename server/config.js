import { constants } from "buffer"
import { join, dirname } from "path"
import { fileURLToPath } from 'url'

const currentDir = import.meta.url
const root = dirname(fileURLToPath(join(currentDir, "../")))
const audioDirectory = join(root, "audio")
const publicDirectory = join(root, "public")
const songsDirectory = join(audioDirectory, 'songs')
const fxDirectory = join(audioDirectory, 'fx')

export default {
    port: process.env.PORT || 3000,
    dir:{
        root,
        publicDirectory,
        audioDirectory,
        songsDirectory,
        fxDirectory
    },
    pages:{
        homeHTML: "home/index.html",
        controllerHTML: "controller/index.html"
    },
    location:{
        home: "/home"
    },
    constants:{
        CONTENT_TYPE: {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "text/javascript"
        },
        audioMediaType: 'mp3',
        songVolume: '0.99',
        fallbackBitRate: '128000',
        bitRateDivisor: 8,
        englishConversation: join(songsDirectory, 'conversation.mp3')
    }
}