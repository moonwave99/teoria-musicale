import { useState } from "react";
import cx from "clsx";

const notes = "CDEFGAB";

const pick = (array) => array[Math.floor(Math.random() * array.length)];

function pickNotes() {
    const first = pick(notes);
    const second = pick(notes.replace(first, ""));
    return [first, second];
}

function getInterval([first, second]) {
    const i = notes.indexOf(first);
    let j = notes.indexOf(second);
    if (j < i) {
        j += notes.length;
    }
    return j - i + 1;
}

export default function IntervalTrainer() {
    const [notesToGuess, setNotesToGuess] = useState(pickNotes());
    const [showSolution, setShowSolution] = useState(false);

    function reset() {
        setNotesToGuess(pickNotes());
        setShowSolution(false);
    }

    return (
        <section className="interval-trainer">
            <h2>Quanto conosci il paesaggio delle note?</h2>
            <p className="question">
                Tra il <Note>{notesToGuess[0]}</Note> e il{" "}
                <Note>{notesToGuess[1]}</Note> c'è una:
                <span className={cx("solution", { showSolution })}>
                    {italianIntervals[getInterval(notesToGuess) - 1]}
                </span>
            </p>
            <div className="actions">
                <button
                    onClick={() => setShowSolution(true)}
                    disabled={showSolution}
                >
                    Mostra soluzione
                </button>
                <button onClick={reset}>Gioca ancora</button>
            </div>
        </section>
    );
}

const italianNotes = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
const italianIntervals = [
    "Unisono",
    "Seconda",
    "Terza",
    "Quarta",
    "Quinta",
    "Sesta",
    "Settima",
];

function Note({ language = "it", children }) {
    const noteName = italianNotes[notes.split("").indexOf(children)];
    return <span className="note">{noteName}</span>;
}
