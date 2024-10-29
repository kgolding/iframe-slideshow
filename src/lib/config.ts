
type Frame = {
    src: string
    duration: number
    reload: boolean
}

type Config = {
    // interval: number
    animation: number
    frames: Frame[]
}

const defaultConfig = {
    interval: 5,
    animation: 0.5,
    frames: [
        { src: "http://192.168.100.250", duration: 5, reload: false }
    ]
}

export {
    defaultConfig,
}

export type {
    Config,
    Frame
}