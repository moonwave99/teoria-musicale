import React from "react";

import cx from "clsx";
import usePaino from "../hooks/usePaino";

export default function Piano({
    notes,
    octaves = 3,
    className,
    showActions = true,
    label,
    id,
}) {
    const { ref, play } = usePaino({ notes, octaves });
    return (
        <div
            className={cx("piano-wrapper", { "show-actions": showActions })}
            id={id}
        >
            <div className="piano-content">
                <figure ref={ref} className={cx("paino", className)}></figure>
                <div className="piano-sidebar">
                    {label && <span className="piano-label">{label}</span>}
                </div>
            </div>
            {showActions && (
                <div className="button-group">
                    <button
                        className="button button--sm button--primary action"
                        onClick={play}
                    >
                        Play
                    </button>
                    <button
                        className="button button--sm button--primary action"
                        onClick={() => play({ speed: "rake" })}
                    >
                        Rake
                    </button>
                    <button
                        className="button button--sm button--primary action"
                        onClick={() => play({ speed: "arpeggio" })}
                    >
                        Arpeggio
                    </button>
                </div>
            )}
        </div>
    );
}
