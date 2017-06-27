// @author: 🍒

import load from 'audio-loader'
import Tone from 'tone'

const files = [
    'sounds/kick2.wav',
    'sounds/808clap.wav',
    'sounds/hh.wav',
    'sounds/daunt.wav',
    'sounds/djnosie3.wav',
    'sounds/60key.wav'
]

const sounds = Array.from({
    length: files.length,
})

const freeverb = new Tone.Freeverb(0.22, 5000).toMaster();
const dist = new Tone.Distortion(0.22).toMaster()
const lowpass = new Tone.Filter(200, 'lowpass', -12);

export const loadAll = () => load(files).then(buffer =>
    sounds.map((item, index) =>
        sounds[index] = new Tone.Player(buffer[index]).chain(lowpass, freeverb, dist)))

export const playKick = () => sounds[0].start()
export const playClap = () => sounds[1].start()
export const playHh = () => sounds[2].start()
export const playDaunt = () => sounds[3].start()
export const playDj = () => sounds[4].start()
export const playLoop = () => sounds[5].start()

// Some effects
export const setRoomSize = newRev => {
    freeverb.set({
        roomSize: newRev / 127,
    })
}
export const setDampening = distortion => {
    dist.set({
        distortion: (distortion / 127) * 3,
    })
}

export const setLowpass = freq => {
    lowpass.set({
        frequency: (freq * 50)
    })
}
