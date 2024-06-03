import { useEffect } from "react";
import soundEngine from "../lib/soundEngine";

export default function useSoundEngine() {
    const onNote = (note, id) =>
        document
            .querySelector(`#${id} .midi-${note}`)
            ?.classList?.toggle("playing");

    const onAllNotesOff = () =>
        document
            .querySelectorAll(".key.playing")
            .forEach((el) => el.classList.remove("playing"));

    useEffect(() => {
        ["noteOn", "noteOff"].forEach((event) => soundEngine.on(event, onNote));
        soundEngine.on("allNotesOff", onAllNotesOff);
        return () => {
            soundEngine.off("noteOn", onNote);
            soundEngine.off("noteOff", onNote);
            soundEngine.off("allNotesOff", onAllNotesOff);
        };
    }, []);
}
