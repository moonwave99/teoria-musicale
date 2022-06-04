import { useEffect, useRef } from "react";
import { Paino } from "@moonwave99/paino";
import { parseNotes } from "../lib/utils";
import soundEngine from "../lib/soundEngine";

export default function usePaino({ notes = "", octaves = 3 }) {
  const ref = useRef(null);
  const pianoRef = useRef(null);
  const parsedNotes = parseNotes(notes);

  useEffect(() => {
    if (pianoRef.current) {
      return;
    }
    pianoRef.current = new Paino({
      el: ref.current,
      octaves,
      startOctave: 2
    });
    pianoRef.current.render();
  }, [octaves]);

  useEffect(() => {
    if (parsedNotes) {
      pianoRef.current.setNotes(parsedNotes);
    }
    return () => {
      pianoRef.current.clearNotes();
    };
  }, [parsedNotes]);

  async function play({ speed }) {
    await soundEngine.play({
      notes: parsedNotes.notes,
      speed
    });
  }

  return { ref, parsedNotes, play };
}
