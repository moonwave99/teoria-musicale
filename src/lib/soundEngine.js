import { EventEmitter } from "events";
import { Howler, Howl } from "howler";
import Note from "@tonaljs/note";

const RAKE_SPEED = 50;
const ARPEGGIO_SPEED = 250;
const NOTE_LENGTH = 2400;
const NOTE_TAIL = 1000;
const DEFAULT_VOLUME = 0.5;

const sound = new Howl({
    src: ["/piano_sprite.mp3"],
    onload() {
        soundEngine.init();
        soundEngine.setVolume(DEFAULT_VOLUME);
    },
    onloaderror(e, msg) {
        console.log("Error loading sound", e, msg);
    },
});

const speeds = {
    rake: RAKE_SPEED,
    arpeggio: ARPEGGIO_SPEED,
};

let timeouts = [];

const emitter = new EventEmitter();

let currentId = null;

const soundEngine = {
    init() {
        let timeIndex = 0;
        for (let i = 24; i <= 96; i++) {
            sound._sprite[i] = [timeIndex, NOTE_LENGTH];
            timeIndex += NOTE_LENGTH;
        }
    },
    on(event, callback) {
        emitter.on(event, callback);
    },
    off(event, callback) {
        emitter.off(event, callback);
    },
    play({ notes, speed, id }) {
        return new Promise((resolve) =>
            notes.forEach((note, index) => {
                const midiNote = Note.midi(note);

                function playNote() {
                    sound.play(`${midiNote}`);
                    emitter.emit("noteOn", midiNote, id);
                    if (index < notes.length - 1) {
                        return;
                    }
                    timeouts.push(
                        setTimeout(() => {
                            emitter.emit("noteOff", midiNote, id);
                            resolve(true);
                        }, NOTE_TAIL)
                    );
                }

                if (!speed) {
                    playNote();
                    emitter.emit("noteOff", midiNote, id);
                    return;
                }

                timeouts.push(setTimeout(playNote, speeds[speed] * index));
                if (index === notes.length - 1) {
                    return;
                }
                timeouts.push(
                    setTimeout(
                        () => emitter.emit("noteOff", midiNote, id),
                        speeds[speed] * (index + 1)
                    )
                );
            })
        );
    },
    setVolume(volume) {
        Howler.volume(volume);
    },
    stop() {
        timeouts.forEach(clearTimeout);
        timeouts = [];
        emitter.emit("allNotesOff");
    },
};

export default soundEngine;
