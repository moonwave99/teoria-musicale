import React from "react";
import useAbc from "../hooks/useAbc";

export default function Notation({
    parts,
    articulation,
    sequenceKey = "C",
    currentMeasure,
    onNoteClick,
}) {
    const { ref } = useAbc({
        parts,
        articulation,
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
