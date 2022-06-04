import React from "react";

import cx from "classnames";
import usePaino from "../hooks/usePaino";

export default function Piano({
  notes,
  octaves = 3,
  className,
  showActions = true,
  label
}) {
  const { ref, play } = usePaino({ notes, octaves });

  return (
    <div className="piano-wrapper">
      <div className="piano-content">
        <figure ref={ref} className={cx("paino", className)}></figure>
        <div className="piano-sidebar">
          {label && <span className="piano-label">{label}</span>}
        </div>
      </div>
      {showActions && (
        <div>
          <button onClick={play}>Play</button>
          <button onClick={() => play({ speed: "rake" })}>Rake</button>
          <button onClick={() => play({ speed: "arpeggio" })}>Arpeggio</button>
        </div>
      )}
    </div>
  );
}
