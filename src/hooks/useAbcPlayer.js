// #TODO
// - fix tempo label
// - fix note on/off events
// - fix shared audio engine
// - merge hooks

import { useEffect, useRef } from "react";
import { toggle, stop, setVisualObj } from "./useAbcEngine";
import abc from "abcjs";
import "abcjs/abcjs-audio.css";

function getQ(meter = "4/4") {
    return `1/${meter.split("/").at(-1)}`;
}

function formatScore({
    abcString,
    defaultNoteLength = "1/4",
    meter = "4/4",
    tempo = 120,
    key = "C",
}) {
    return `
X: ${++scoreCount}
M: ${meter}
Q: ${getQ(meter)}=${tempo}
L: ${defaultNoteLength}
K: ${key}
${abcString}`.trim();
}

const abcOptions = {
    paddingleft: 0,
    paddingRight: 0,
    responsive: "resize",
    add_classes: true,
};

let scoreCount = 0;

export default function useAbcPlayer({
    id,
    abcString,
    defaultNoteLength = "1/4",
    meter = "4/4",
    tempo = 120,
    key = "C",
}) {
    const ref = useRef(null);
    const abcRef = useRef(null);
    const formattedScore = formatScore({
        abcString,
        defaultNoteLength,
        meter,
        tempo,
        key,
    });

    useEffect(() => {
        abcRef.current = abc
            .renderAbc(ref.current, formattedScore, abcOptions)
            .at(0);
    }, [formattedScore]);

    return {
        ref,
        toggle: async function () {
            await setVisualObj(abcRef.current, id);
            toggle(id);
        },
        stop,
    };
}
