import React, { useState, useId, Children } from "react";
import Piano from "../components/Piano";
import useAbcPlayer from "../hooks/useAbcPlayer";
import { FaPlay, FaStop } from "react-icons/fa";
import cx from "clsx";

function getABCString(children) {
    const child = Children.toArray(children)?.at(0);
    return child?.props?.children || null;
}

export default function Score({
    defaultNoteLength = "1/4",
    meter = "4/4",
    tempo = 120,
    scoreKey = "C",
    startOctave = 3,
    octaves = 3,
    children,
    showPiano = true,
}) {
    const [isPlaying, setPlaying] = useState(false);
    const id = useId();
    const abcString = getABCString(children);

    const { ref, toggle, stop } = useAbcPlayer({
        id,
        abcString,
        defaultNoteLength,
        meter,
        tempo,
        key: scoreKey,
        onNotesChange,
    });

    function onNotesChange(notes) {
        document
            .querySelectorAll(`#${CSS.escape(id)} [data-midi]`)
            .forEach((el) => el.classList.remove("key-on"));
        notes.forEach((note) => {
            const el = document.querySelector(
                `#${CSS.escape(id)} [data-midi="${note}"]`
            );
            if (!el) {
                return;
            }
            el.classList.add("key-on");
        });
    }

    function onClick() {
        if (isPlaying) {
            stop();
        } else {
            toggle();
        }
        setPlaying((prev) => !prev);
    }

    return (
        <figure className="score alert alert--secondary" id={id}>
            <div className="abc-wrapper" ref={ref}></div>
            <div className="controls">
                <button
                    className={cx("button-playback", { isPlaying })}
                    onClick={onClick}
                    aria-label="Toggle playback"
                >
                    <FaStop className="icon-stop" />
                    <FaPlay className="icon-play" />
                </button>
            </div>
            {showPiano && (
                <Piano
                    showActions={false}
                    startOctave={startOctave}
                    octaves={octaves}
                />
            )}
        </figure>
    );
}
