import React from "react";

export default function SequenceActions({ actions, isPlaying, showSplit }) {
  const { togglePlayback, toggleSplit } = actions;
  return (
    <div className="sequence-actions">
      <button
        className="button button--sm button--primary action action-play"
        onClick={togglePlayback}
      >
        {isPlaying ? "Stop" : "Play"}
      </button>
      {showSplit ? (
        <button
          className="button button--sm button--primary action action-toggle-split"
          onClick={toggleSplit}
          disabled={isPlaying}
        >
          Toggle split
        </button>
      ) : null}
    </div>
  );
}
