// @author: 🍒

import React, { PureComponent } from 'react'

export default class MidiControllerBase extends PureComponent {

    componentDidMount() {

        const onMIDISuccess = midiAccess => {
            let inputs = midiAccess.inputs.values()
            for (let input = inputs.next();
                 input && !input.done;
                 input = inputs.next()) {
                input.value.onmidimessage = this.midiMessageReceived
            }
        }

        const onMIDIFailure = () => console.log('Problem!')

        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
    }

    midiMessageReceived = ev => {
        console.log('midiMessageReceived', ev)
        const [cmd, noteNumber] = ev.data
        const velocity = ev.data.length > 2 ? ev.data[2] : 0

        this.props.cb({
            cmd,
            noteNumber,
            velocity,
        })
    }

    render() {
        return null
    }
}
