import { useEffect, useRef, useCallback } from "react";
import abc from "abcjs";
import { padWithOctave } from "../lib/utils";
import { scientificToAbcNotation, transpose } from "@tonaljs/abc-notation";

function upOneOctave(note) {
    return transpose(note, "8P");
}

function notesToAbc(notes) {
    return notes.map(
        (x) =>
            `[${x
                .split(" ")
                .map(scientificToAbcNotation)
                .map(upOneOctave)
                .join("")}]`
    );
}

function getAbcString(notes, key = "C") {
    return `
    X: 1
    M: 4/4
    L: 1
    K: ${key}
    ${notesToAbc(notes).join("|")}||
    `;
}

function getAbcStringForBothHands(notes, key = "C") {
    const leftVoice = [];
    const rightVoice = [];

    notes.forEach((x) => {
        let [left, right] = x.split(",");
        left = left
            .trim()
            .split(" ")
            .map((x) => padWithOctave(x, 3))
            .join(" ");
        right = right
            .trim()
            .split(" ")
            .map((x) => padWithOctave(x, 4))
            .join(" ");
        leftVoice.push(left);
        rightVoice.push(right);
    });

    return `
  X: 1
  M: 4/4
  L: 1
  V: 1
  K: ${key}
  ${notesToAbc(rightVoice).join("|")}||
  V: 2 clef=bass
  ${notesToAbc(leftVoice).join("|")}||
  `;
}

const abcOptions = {
    paddingleft: 0,
    paddingRight: 0,
    responsive: "resize",
    add_classes: true,
};

export default function useAbc({
    parts,
    currentMeasure,
    onNoteClick,
    key = "C",
}) {
    const ref = useRef(null);

    const clickListener = useCallback(
        (abcelem, tuneNumber, classes, analysis, drag, mouseEvent) => {
            onNoteClick &&
                onNoteClick({
                    measure: analysis.measure,
                });
        },
        [onNoteClick]
    );

    useEffect(() => {
        const notes = parts.map((x) => x.notes);
        const abcString = notes.some((x) => x.indexOf(",") > -1)
            ? getAbcStringForBothHands(notes, key)
            : getAbcString(notes, key);

        abc.renderAbc(ref.current, abcString, { ...abcOptions, clickListener });
    }, [parts, key, clickListener]);

    useEffect(() => {
        const els = ref.current.querySelectorAll("g.abcjs-note");
        els.forEach((x) =>
            x.classList.toggle(
                "is-playing",
                x.classList.contains(`abcjs-mm${currentMeasure}`)
            )
        );
    }, [currentMeasure]);

    return { ref };
}
