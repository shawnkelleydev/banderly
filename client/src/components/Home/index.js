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
    ];
    let arr = [];
    inst.forEach((ins) => {
      let obj = {
        instrument: ins,
        trans: 0,
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
      <h3>Know thine instruments.</h3>
      {instruments
        ? instruments.map((instrument, i) => (
            <FiveNotes key={i} instrument={instrument} />
          ))
        : null}
    </div>
  );
}

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
        if (t === 12 || t === -12) {
          pnote = allNotes[trans];
        }
        pArr.push(pnote);
      });
      setDisplayFive(dArr);
      setPlayFive(pArr);
    }
  }, [firstFive, allNotes, instrObj]);

  return (
    <div className="idiv">
      <div className="instr">{props.instrument.instrument}</div>
      <div className="notes">
        {!displayFive
          ? null
          : displayFive.map((note, i) => (
              <Note key={i} displayNote={note} playNote={playFive[i]} />
            ))}
      </div>
    </div>
  );
}

function Note(props) {
  const [dNote, setDNote] = useState(null);

  useEffect(() => {
    let note = props.displayNote;
    if (note.includes("b")) {
      let burst = note.split("");
      if (burst.length > 1) {
        let flat = "&#9837;";
        note = burst[0] + flat;
        console.log(note);
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
