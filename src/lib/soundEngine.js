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
  }
});

const speeds = {
  rake: RAKE_SPEED,
  arpeggio: ARPEGGIO_SPEED
};

let timeouts = [];

const soundEngine = {
  init() {
    let timeIndex = 0;
    for (let i = 24; i <= 96; i++) {
      sound._sprite[i] = [timeIndex, NOTE_LENGTH];
      timeIndex += NOTE_LENGTH;
    }
  },
  play({ notes, speed }) {
    return new Promise((resolve) =>
      notes.forEach((note, index) => {
        const midiNote = Note.midi(note);

        function playNote() {
          sound.play(`${midiNote}`);
          if (index === notes.length - 1) {
            timeouts.push(setTimeout(() => resolve(true), NOTE_TAIL));
          }
        }

        if (!speed) {
          playNote();
          return;
        }

        timeouts.push(setTimeout(playNote, speeds[speed] * index));
      })
    );
  },
  setVolume(volume) {
    Howler.volume(volume);
  },
  stop() {
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }
};

export default soundEngine;
