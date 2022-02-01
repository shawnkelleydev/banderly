import "./styles.css";
import * as Tone from "tone";
import { useEffect, useState } from "react";
import { trans, notes } from "../../data";
import Interweave from "interweave";

export default function Home() {
  const [instruments, setInstruments] = useState(null);

  useEffect(() => {
    let inst = [
      "flute",
      "clarinet",
      "altoSaxophone",
      "trumpet",
      "frenchHorn",
      "trombone",
      "baritone",
      "tuba",
    ];
    // FINGERINGS ARRAY FOR PATCHING TO INSTRUMENTS BELOW
    let fingerings = [
      null,
      null,
      null,
      ["0", "1", "12", "13", "0"],
      ["0", "1", "12", "0", "1"],
      ["1", "3", "4", "6", "1"],
      ["0", "1", "12", "13", "0"],
      ["0", "1", "12", "13", "0"],
    ];
    let arr = [];
    inst.forEach((ins, i) => {
      let obj = {
        instrument: ins,
        trans: 0,
        fing: fingerings[i],
      };

      let keys = Object.keys(trans);
      if (keys.includes(ins)) {
        obj.trans = trans[ins];
      }
      arr.push(obj);
    });
    setInstruments(arr);
  }, []);

  return (
    <div className="Home full-height">
      <h3>
        <em>Know thine instruments.</em>
      </h3>
      <Metronome />
      <h3>First Five Notes</h3>
      {instruments
        ? instruments.map((instrument, i) => (
            <FiveNotes key={i} instrument={instrument} />
          ))
        : null}
    </div>
  );
}

function Trombone() {
  return (
    <img
      src="https://www.yamaha.com/en/musical_instrument_guide/common/images/trombone/fingering1.gif"
      alt="trombone slide positions"
      className="trombone"
    />
  );
}

// METRONOME
function Metronome() {
  const [active, setActive] = useState(false);
  const [pitch, setPitch] = useState("F6");
  const [bpm, setBpm] = useState("");
  const [met, setMet] = useState(null);
  const [warning, setWarning] = useState(false);
  const [tooHigh, setTooHigh] = useState(false);
  const [tooLow, setTooLow] = useState(false);

  function handleClick() {
    let tempo = parseInt(bpm);
    if (tempo !== "" && tempo > 0 && tempo < 300 && !active) {
      setActive(true);
      // cancel warnings
      setWarning(false);
      setTooHigh(false);
      setTooLow(false);
      let int = 60 / tempo;
      int *= 1000;
      async function metro() {
        const synth = new Tone.Synth().toDestination();
        await Tone.start();
        synth.triggerAttackRelease(pitch, "16n");
      }
      setMet(setInterval(metro, int));
    } else {
      if (tempo === "") {
        setWarning(true);
      }

      if (tempo < 1) {
        setWarning(true);
        setTooLow(true);
      }

      if (tempo > 300) {
        setWarning(true);
        setTooHigh(true);
      }
      setActive(false);
      setMet(clearInterval(met));
    }
  }

  return (
    <div className="Metronome">
      {!warning ? (
        <h3>Metronome</h3>
      ) : warning && tooHigh ? (
        <h3 className="warning">Too high. Try something under 300.</h3>
      ) : warning && tooLow ? (
        <h3>Too low. Try something above 0.</h3>
      ) : (
        <h3 className="warning">How many beats per minute (bpm) ?</h3>
      )}
      <div>
        <label htmlFor="metroInput">
          <span>bpm</span>
          <input
            id="metroInput"
            type="number"
            pattern="[0-9]*"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
            style={warning ? { border: "4px solid red" } : null}
          />
        </label>
        <label htmlFor="pitch">
          <span>pitch</span>
          <select id="pitch" onChange={(e) => setPitch(e.target.value)}>
            <option value="F6">F</option>
            <option value="E6">E</option>
            <option value="Eb6">E&#9837;/D&#9839;</option>
            <option value="D6">D</option>
            <option value="Db6">D&#9837;/C&#9839;</option>
            <option value="C6">C</option>
            <option value="B5">B</option>
            <option value="Bb5">B&#9837;/A&#9839;</option>
            <option value="A5">A</option>
            <option value="Ab5">A&#9837;/G&#9839;</option>
            <option value="G5">G</option>
            <option value="Gb5">G&#9837;/F&#9839;</option>
          </select>
        </label>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          {active ? "stop" : "go"}
        </button>
      </div>
    </div>
  );
}

// 5 NOTES
function FiveNotes(props) {
  const [allNotes, setAllNotes] = useState(null);
  const [firstFive, setFirstFive] = useState(null);
  const [displayFive, setDisplayFive] = useState(null);
  const [playFive, setPlayFive] = useState(null);
  const [instrObj, setInstrObj] = useState(null);

  // CONSTRUCT ARRAY OF USEFUL NOTES WITHIN 6 OCTAVES
  useEffect(() => {
    let arr = [];
    for (let i = 0, octave = 1; i < 6; i++) {
      notes.forEach((note) => arr.push(note + octave));
      octave++;
    }
    setAllNotes(arr);
  }, []);

  useEffect(() => {
    setFirstFive(["f4", "eb4", "d4", "c4", "bb3"]);
    setInstrObj(props.instrument);
  }, [props]);

  useEffect(() => {
    if (firstFive && allNotes && instrObj) {
      let t = instrObj.trans;
      let dArr = [];
      let pArr = [];
      firstFive.forEach((note) => {
        // get index in allNotes array for navigation
        let i = allNotes.indexOf(note);
        let trans = i + t;
        let dnote = allNotes[trans];
        dnote = dnote.split(/[0-9]/)[0];
        dArr.push(dnote);

        let pnote = note;
        if (t >= 12 || t <= -12) {
          pnote = allNotes[trans];
        }
        pArr.push(pnote);
      });
      setDisplayFive(dArr);
      setPlayFive(pArr);
    }
  }, [firstFive, allNotes, instrObj]);
  return (
    <>
      <div className="idiv">
        <div className="instr">{props.instrument.instrument}</div>
        <div className="notes">
          {!displayFive
            ? null
            : displayFive.map((note, i) => (
                <div key={i} className="note">
                  <Note displayNote={note} playNote={playFive[i]} />
                  <span>
                    {props.instrument.fing ? props.instrument.fing[i] : null}
                  </span>
                </div>
              ))}
        </div>
      </div>
      {props.instrument.instrument === "trombone" ? <Trombone /> : null}
    </>
  );
}

// NOTE COMPONENT
function Note(props) {
  const [dNote, setDNote] = useState(null);

  useEffect(() => {
    let note = props.displayNote;
    if (note.includes("b")) {
      let burst = note.split("");
      if (burst.length > 1) {
        let flat = "&#9837;";
        note = burst[0] + flat;
      }
    }
    setDNote(note);
  }, [props]);

  return (
    <button
      onClick={async () => {
        const synth = new Tone.Synth().toDestination();
        await Tone.start();
        synth.triggerAttackRelease(props.playNote, "2");
      }}
    >
      <Interweave content={dNote} />
    </button>
  );
}
