// INSTRUMENT

import { useEffect, useState } from "react";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import "./styles.css";
import Headline from "../Headline";
import Quote from "../Quote";
import { instruments } from "../../data/data";
import TopicButton from "../TopicButton";

export default function Index() {
  const [instrument, setInstrument] = useState(null);
  const [instrObj, setInstrObj] = useState(null);
  const [family, setFamily] = useState(null);
  const [topics, setTopics] = useState(null);

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    //re-establish camel case for key comparison
    let instr = params.instrument;
    if (instr.includes(" ")) {
      instr = instr
        .split(" ")
        .map((val, i) =>
          i === 0 ? val : val.charAt(0).toUpperCase() + val.slice(1, val.length)
        )
        .reduce((word, val) => (word += val));
    }
    setInstrument(instr);
  }, [params]);

  useEffect(() => {
    if (instrument) {
      let fams = Object.keys(instruments);
      fams.forEach((fam) => {
        let list = Object.keys(instruments[fam]);
        if (list.includes(instrument)) {
          setFamily(fam);
        }
      });
    }
  }, [instrument]);

  useEffect(() => {
    if (family && instrument) {
      let obj = instruments[family][instrument];
      setInstrObj(obj);
    }
  }, [family, instrument]);

  // set quote query
  useEffect(() => {
    if (instrObj) {
      let n = instrObj.quotes.length;
      n = Math.floor(Math.random() * n);
      setSearchParams(`q=${n}`);
    }
  }, [instrObj, setSearchParams]);

  useEffect(() => {
    if (instrObj) {
      if (instrObj.topics) {
        setTopics(Object.keys(instrObj.topics));
      }
    }
  }, [instrObj]);

  return (
    <div className="Instrument full-height">
      <Headline instrument={instrObj} />
      <Quote instrument={instrObj} quoteParams={searchParams} />
      {topics ? (
        <div className="TopicButtons">
          {" "}
          {topics.map((topic, i) => (
            <TopicButton key={i} topic={topic} instrument={instrObj} />
          ))}
        </div>
      ) : null}

      <Outlet />
    </div>
  );
}
