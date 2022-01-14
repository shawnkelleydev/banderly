// HEADLINE

import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import "./styles.css";

export default function Index(props) {
  const [quotes, setQuotes] = useState(null);
  const [quote, setQuote] = useState(null);
  const [speaker, setSpeaker] = useState(null);

  useEffect(() => {
    if (props.instrument) {
      let arr = props.instrument.quotes;
      setQuotes(arr);
    }
  }, [props]);

  useEffect(() => {
    if (quotes) {
      let q = quotes;
      q = q[0];
      let cit = q.citation;
      q = q.quote;
      setQuote(q);
      setSpeaker(cit);
    }
  }, [quotes]);

  return (
    <>
      {quote && speaker ? (
        <blockquote>
          <span className="quote">{quote}</span>
          <span className="citation">{speaker}</span>
        </blockquote>
      ) : null}
    </>
  );
}
