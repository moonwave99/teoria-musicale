import { useEffect, useRef, useCallback } from "react";
import abc from "abcjs";
import { padWithOctave } from "../lib/utils";
import { scientificToAbcNotation, transpose } from "@tonaljs/abc-notation";

function upOneOctave(note) {
    return transpose(note, "8P");
}

function partToAbc({ notes, articulation }, mainArticulation) {
    if (!articulation) {
        articulation = mainArticulation;
    }
    if (articulation === "arpeggio") {
        return notes
            .split(" ")
            .map(scientificToAbcNotation)
            .map(upOneOctave)
            .join("");
    }

    return `${articulation === "rake" ? "!arpeggio!" : ""}[${notes
        .split(" ")
        .map(scientificToAbcNotation)
        .map(upOneOctave)
        .join("")}]`;
}

function getAbcString(parts, articulation, key = "C") {
    return `
    X: 1
    M: 4/4
    L: 1
    K: ${key}
    ${parts.map((part) => partToAbc(part, articulation)).join("|")}||
    `;
}

function getAbcStringForBothHands(parts, articulation, key = "C") {
    const leftVoice = { notes: [] };
    const rightVoice = { notes: [] };

    parts.forEach(({ notes, articulation }) => {
        let [left, right] = notes.split(", ");
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
        leftVoice.articulation = articulation;
        rightVoice.articulation = articulation;
        leftVoice.notes.push(left);
        rightVoice.notes.push(right);
    });

    return `
  X: 1
  M: 4/4
  L: 1
  V: 1
  K: ${key}
  ${rightVoice.notes.map((notes) => partToAbc({ notes }, articulation))}||
  V: 2 clef=bass
  ${leftVoice.notes.map((notes) => partToAbc({ notes }, articulation))}||
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
    articulation,
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
        const abcString = parts
            .map((x) => x.notes)
            .some((x) => x.includes(", "))
            ? getAbcStringForBothHands(parts, articulation, key)
            : getAbcString(parts, articulation, key);

        abc.renderAbc(ref.current, abcString, { ...abcOptions, clickListener });
    }, [parts, articulation, key, clickListener]);

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
