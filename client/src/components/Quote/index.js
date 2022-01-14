// HEADLINE

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import "./styles.css";

export default function Index(props) {
  const [quotes, setQuotes] = useState(null);
  const [quote, setQuote] = useState(null);
  const [speaker, setSpeaker] = useState(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (props.instrument) {
      let arr = props.instrument.quotes;
      setQuotes(arr);
    }
  }, [props]);

  useEffect(() => {
    if (quotes) {
      let quo = quotes;
      let n = searchParams.get("q");
      if (n) {
        let text = quo[n].quote;
        let cit = quo[n].citation;
        setQuote(text);
        setSpeaker(cit);
      }
    }
  }, [quotes, searchParams]);

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
