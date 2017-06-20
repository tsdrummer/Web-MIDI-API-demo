import React, { PureComponent } from 'react';
import './App.css';
import Bar from './components/Bar/Bar.jsx'
import Pad from './components/Pad/Pad.jsx'
import MC from './components/MidiControllerBase/MidiControllerBase.jsx'
import {
    loadAll as loadSounds,
    playKick,
    playClap,
    playHh,
    playDaunt,
    playDj,
    playLoop,
    setRoomSize,
    setDampening
} from './Sound.js'

class App extends PureComponent {

    state = {
        bar1Height: 0,
        bar2Height: 0,
        bar3Height: 0,
        pad1: false,
        pad2: false,
        pad3: false,
    }

    componentDidMount() {
        loadSounds()
    }

    barCallback = data => {

        switch (data.noteNumber) {

            case 1:
                this.setState({
                    bar1Height: data.velocity,
                })
                setRoomSize(data.velocity)
                break;
            case 2:
                this.setState({
                    bar2Height: data.velocity,
                })
                setDampening(data.velocity)
                break;
            case 3:
                this.setState({
                    bar3Height: data.velocity,
                })
                break;

            case 5:
                document.documentElement.style.setProperty('--r', Math.round(data.velocity / 127 * 255));
                break;
            case 6:
                document.documentElement.style.setProperty('--g', Math.round(data.velocity / 127 * 255));
                break;
            case 7:
                document.documentElement.style.setProperty('--b', Math.round(data.velocity / 127 * 255));
                break;

            case 36:
                this.setState({
                    pad1: data.cmd === 144,
                })
                data.cmd === 144 && playKick()

                break;
            case 37:
                this.setState({
                    pad2: data.cmd === 144,
                })
                data.cmd === 144 && playClap()
                break;
            case 38:
                this.setState({
                    pad3: data.cmd === 144,
                })
                data.cmd === 144 && playDj()
                break;
            case 39:
                data.cmd === 144 && playDaunt()
                break;
            case 40:
                data.cmd === 144 && playHh()
                break;
            case 43:
                data.cmd === 144 && playLoop()
                break;
        }

    }

    render() {

        const { bar1Height, bar2Height, bar3Height, pad1, pad2, pad3 } = this.state

        return (
            <div className="App">

                <MC cb={this.barCallback}/>

                <Pad status={pad1}/>
                <Pad status={pad2}/>
                <Pad status={pad3}/>

                <Bar backgroundColor="darkslategrey" height={bar1Height}/>
                <Bar backgroundColor="teal" height={bar2Height}/>
                <Bar backgroundColor="navy" height={bar3Height}/>
            </div>
        );
    }

}

export default App;
