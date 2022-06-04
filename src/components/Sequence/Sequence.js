import React, { useState } from "react";
import Notation from "../Notation";
import SequenceActions from "./SequenceActions";
import Piano from "../Piano";
import { parseNotes, padSequenceWithOctave } from "../../lib/utils";
import soundEngine from "../../lib/soundEngine";
import cx from "classnames";

export function Part(props) {
  return null;
}

function getSpeed({ arpeggio, rake }, mainSpeed) {
  if (arpeggio) {
    return "arpeggio";
  }
  if (rake) {
    return "rake";
  }
  return mainSpeed;
}

export function Sequence({ split = false, speed, children, startOctave }) {
  const [isPlaying, setPlaying] = useState(false);
  const [currentMeasure, setCurrentMeasure] = useState(-1);
  const [showNotation, setShowNotation] = useState(true);
  const [showPianos, setShowPianos] = useState(true);
  const [showSplit, setShowSplit] = useState(split);

  if (!children.length) {
    children = [children];
  }

  const parts = children.map(({ props }) => ({
    ...props,
    notes: padSequenceWithOctave(props.notes, props.octave || startOctave)
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
      await soundEngine.play({ notes, speed: getSpeed(props, speed) });
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

  function toggleNotation() {
    setShowNotation(!showNotation);
  }

  function togglePianos() {
    setShowPianos(!showPianos);
  }

  function toggleSplit() {
    setShowSplit(!showSplit);
  }

  return (
    <div
      className={cx("sequence alert alert--secondary", {
        "sequence-is-playing": isPlaying,
        "sequence-show-notation": showNotation,
        "sequence-show-pianos": showPianos,
        "sequence-show-split": showSplit
      })}
    >
      <div className="sequence-content">
        <Notation
          parts={parts}
          currentMeasure={currentMeasure}
          onNoteClick={onNoteClick}
        />
        <div className="parts">
          {showSplit ? (
            children.map((x, i) => (
              <Piano
                key={`${x.props.notes}-${i}`}
                className={cx({
                  "is-playing": isPlaying && currentMeasure === i
                })}
                showActions={false}
                {...x.props}
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
      </div>
      <SequenceActions
        actions={{ togglePlayback, toggleNotation, togglePianos, toggleSplit }}
        isPlaying={isPlaying}
      />
    </div>
  );
}
