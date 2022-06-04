import React from "react";

export default function SequenceActions({ actions, isPlaying }) {
  const { togglePlayback, toggleNotation, togglePianos, toggleSplit } = actions;
  return (
    <div className="sequence-actions">
      <button
        className="button button--sm button--primary action action-play"
        onClick={togglePlayback}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
      <button
        className="button button--sm button--primary action action-toggle-notation"
        onClick={toggleNotation}
      >
        Toggle notation
      </button>
      <button
        className="button button--sm button--primary action action-toggle-pianos"
        onClick={togglePianos}
      >
        Toggle pianos
      </button>
      <button
        className="button button--sm button--primary action action-toggle-split"
        onClick={toggleSplit}
        disabled={isPlaying}
      >
        Toggle split
      </button>
    </div>
  );
}
