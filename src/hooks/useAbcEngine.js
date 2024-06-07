import { useEffect } from "react";
import { synth, TimingCallbacks } from "abcjs";

export async function setVisualObj(visualObj, id) {
    await getEngine().init(visualObj, id);
}

function getAudioContext() {
    const active = synth.activeAudioContext();
    return active || new window.AudioContext();
}

class Engine {
    _synth;
    _id;
    _isPlaying;
    _timings;
    _progress;
    _meter;
    constructor() {
        this._synth = null;
        this._id = null;
        this._isPlaying = false;
        this._timings = null;
        this._meter = null;
        this._progress = {
            beat: 0,
            bar: 0,
        };
    }
    async init(visualObj, id) {
        if (!visualObj || !synth.supportsAudio() || this._id === id) {
            return;
        }
        if (this._synth) {
            this._synth.stop();
            this._synth = null;
            this._isPlaying = false;
        }
        this._meter = visualObj.getMeter().value[0];
        this._id = id;
        const audioContext = getAudioContext();
        const midiBuffer = new synth.CreateSynth();
        await midiBuffer.init({
            visualObj,
            audioContext,
            millisecondsPerMeasure: visualObj.millisecondsPerMeasure(),
            options: {
                onEnded: () => this.stop(),
            },
        });
        await midiBuffer.prime();
        this._synth = midiBuffer;
        this._timings = new TimingCallbacks(visualObj, {
            beatCallback: (beatNumber, totalBeats) => {
                this._onBeatsChange(beatNumber, totalBeats);
            },
            eventCallback: (event) => {
                if (!event) {
                    this._onNotesChange([]);
                    return;
                }
                this._onNotesChange(event?.midiPitches?.map((x) => x.pitch));
            },
        });
        return true;
    }
    toggle() {
        if (!this._synth) {
            return;
        }
        if (this._isPlaying) {
            this.pause();
            return;
        }
        this.play();
    }
    play() {
        this._synth.start();
        this._timings.start();
        this._isPlaying = true;
        this._updateButtonText("Pause");
    }
    pause() {
        if (!this._isPlaying) {
            return;
        }
        this._synth.pause();
        this._timings.pause();
        this._isPlaying = false;
        this._updateButtonText("Play");
    }
    stop() {
        if (!this._isPlaying) {
            return;
        }
        this._synth.stop();
        this._timings.pause();
        this._timings.reset();
        this._isPlaying = false;
        this._updateButtonText("Play");
        this._onNotesChange([]);
        this._onBeatsChange(-1);
    }
    _onBeatsChange(beatNumber) {
        const measure = Math.floor(beatNumber / this._meter.num);
        document
            .querySelectorAll(`#${CSS.escape(this._id)} .abcjs-note`)
            .forEach((el) => {
                el.classList.toggle(
                    "note-on",
                    el.classList.contains(`abcjs-mm${measure}`)
                );
            });
    }
    _onNotesChange(notes) {
        document
            .querySelectorAll(`#${CSS.escape(this._id)} [data-midi]`)
            .forEach((el) => el.classList.remove("key-on"));
        notes.forEach((note) => {
            const el = document.querySelector(
                `#${CSS.escape(this._id)} [data-midi="${note}"]`
            );
            if (!el) {
                return;
            }
            el.classList.add("key-on");
        });
    }
    _updateButtonText(text) {
        const button = document.querySelector(
            `#${CSS.escape(this._id)} .controls button`
        );
        if (!button) {
            return;
        }
        button.innerText = text;
    }
}

export function toggle() {
    getEngine().toggle();
}

export function stop() {
    getEngine().stop();
}

let _engine = null;

export function getEngine() {
    if (_engine) {
        return _engine;
    }
    _engine = new Engine();
    return _engine;
}

export default function useAbcEngine() {
    useEffect(() => {
        return () => {
            getEngine().pause();
        };
    }, []);
}
