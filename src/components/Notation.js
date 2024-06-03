import React from "react";
import useAbc from "../hooks/useAbc";

export default function Notation({
    parts,
    sequenceKey = "C",
    currentMeasure,
    onNoteClick,
}) {
    const { ref } = useAbc({
        parts,
        key: sequenceKey,
        currentMeasure,
        onNoteClick,
    });
    return (
        <div className="notation">
            <div className="abc-wrapper" ref={ref}></div>
        </div>
    );
}
