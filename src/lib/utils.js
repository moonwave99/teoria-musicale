import Note from "@tonaljs/note";
import { parsers } from "@moonwave99/paino";

export function endsWithOctave(note) {
    const maybeOctave = note.slice(-1);
    return Number.isInteger(+maybeOctave);
}

export function padWithOctave(note, octave = 3) {
    return `${note}${endsWithOctave(note) ? "" : octave}`;
}

export function padSequenceWithOctave(sequence, startOctave = 3) {
    let currentOctave = startOctave;
    let currentChroma = -1;
    return sequence
        .split(" ")
        .map((x) => {
            const { chroma } = Note.get(x);
            if (!currentOctave) {
                const firstNote = padWithOctave(x);
                currentOctave = firstNote.slice(-1);
            }
            if (chroma < currentChroma) {
                currentOctave++;
            }
            currentChroma = chroma;
            return padWithOctave(x, currentOctave);
        })
        .join(" ");
}

export function parseNotes(notes) {
    if (notes.indexOf(",") === -1) {
        return {
            notes: parsers.notes(padSequenceWithOctave(notes)),
        };
    }
    return parsers.notesHands(padSequenceWithOctave(notes));
}
