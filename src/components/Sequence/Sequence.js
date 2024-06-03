import React, { useState } from "react";
import Notation from "../Notation";
import SequenceActions from "./SequenceActions";
import Piano from "../Piano";
import { parseNotes, padSequenceWithOctave } from "../../lib/utils";
import soundEngine from "../../lib/soundEngine";
import cx from "clsx";
import sha1 from "sha1";

export function Part(props) {
    return null;
}

function getSpeed({ articulation }, mainArticulation) {
    return articulation || mainArticulation;
}

export function Sequence({
    split = false,
    articulation,
    children,
    startOctave,
    sequenceKey = "C",
}) {
    const [isPlaying, setPlaying] = useState(false);
    const [currentMeasure, setCurrentMeasure] = useState(-1);
    const [showSplit, setShowSplit] = useState(split);

    if (!children.length) {
        children = [children];
    }
    const parts = children.map(({ props }, i) => ({
        ...props,
        notes: props.notes.includes(", ")
            ? props.notes
                  .split(", ")
                  .map((x) =>
                      padSequenceWithOctave(x, props.octave || startOctave)
                  )
                  .join(", ")
            : padSequenceWithOctave(props.notes, props.octave || startOctave),
        id: `part${sha1(`${props.notes}-${i}`)}`,
    }));

    function onNoteClick({ measure }) {
        setCurrentMeasure(measure);
    }

    async function playAll() {
        setPlaying(true);
        for (let [index, props] of parts.entries()) {
            const { notes: chord } = props;
            const { notes } = parseNotes(chord);
            setCurrentMeasure(index);
            await soundEngine.play({
                notes,
                speed: getSpeed(props, articulation),
                id: props.id,
            });
        }
        setPlaying(false);
        setCurrentMeasure(-1);
    }

    function stop() {
        soundEngine.stop();
        setPlaying(false);
        setCurrentMeasure(-1);
    }

    function togglePlayback() {
        if (isPlaying) {
            stop();
            return;
        }
        playAll();
    }

    function toggleSplit() {
        setShowSplit(!showSplit);
    }

    return (
        <div
            className={cx("sequence alert alert--secondary", {
                "sequence-is-playing": isPlaying,
                "sequence-show-split": showSplit,
            })}
        >
            <Notation
                sequenceKey={sequenceKey}
                parts={parts}
                articulation={articulation}
                currentMeasure={currentMeasure}
                onNoteClick={onNoteClick}
            />
            <div className="sequence-content">
                <div className="parts">
                    {showSplit ? (
                        parts.map((x, i) => (
                            <Piano
                                key={x.id}
                                className={cx({
                                    "is-playing":
                                        isPlaying && currentMeasure === i,
                                })}
                                showActions={false}
                                {...x}
                            />
                        ))
                    ) : isPlaying ? (
                        <Piano
                            className="is-playing"
                            showActions={false}
                            {...parts[currentMeasure]}
                        />
                    ) : (
                        <Piano showActions={false} {...parts[currentMeasure]} />
                    )}
                </div>
                <SequenceActions
                    showSplit={parts.length > 1}
                    actions={{ togglePlayback, toggleSplit }}
                    isPlaying={isPlaying}
                />
            </div>
        </div>
    );
}
