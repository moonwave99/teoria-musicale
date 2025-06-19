import { useState } from "react";
import cx from "clsx";

const notes = "CDEFGAB";
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

const pick = (array) => array[Math.floor(Math.random() * array.length)];

const pickInterval = () => 1 + Math.round(Math.random() * 5);

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

function getTargetNote({ note, interval }) {
    const i = notes.indexOf(note);
    const target = i + interval;
    return notes[target % 7];
}

export default function IntervalTrainer({ mode = "guessTargetNote" }) {
    if (mode === "guessTargetNote") {
        return <GuessTargetNote />;
    }
    return <GuessIntervalName />;
}

function GuessIntervalName() {
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
                    <Interval>{getInterval(notesToGuess) - 1}</Interval>
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

function GuessTargetNote() {
    const [data, setData] = useState({
        note: pick(notes),
        interval: pickInterval(),
    });
    const [showSolution, setShowSolution] = useState(false);

    function reset() {
        setData({
            note: pick(notes),
            interval: pickInterval(),
        });
        setShowSolution(false);
    }

    return (
        <section className="interval-trainer">
            <h2>Quanto conosci il paesaggio delle note?</h2>
            <p className="question">
                Chi è la <Interval>{data.interval}</Interval> di
                <Note>{data.note}</Note>?
                <span className={cx("solution", { showSolution })}>
                    <Note>{getTargetNote(data)}</Note>
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

function Note({ children }) {
    const noteName = italianNotes[notes.split("").indexOf(children)];
    return <span className="note">{noteName}</span>;
}

function Interval({ children }) {
    const intervalName = italianIntervals[children];
    return <span className="interval">{intervalName}</span>;
}
