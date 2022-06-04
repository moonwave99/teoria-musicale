import React from "react";
import useAbc from "../hooks/useAbc";

export default function Notation({ parts, currentMeasure, onNoteClick }) {
  const { ref } = useAbc({ parts, currentMeasure, onNoteClick });
  return (
    <div className="notation">
      <div className="abc-wrapper" ref={ref}></div>
    </div>
  );
}
