import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./styles.css";

export default function Index() {
  const [instrument, setInstrument] = useState(null);

  const params = useParams();

  useEffect(() => {
    let instr = params.instrument;
    setInstrument(instr);
  }, [params]);

  return (
    <>
      <p>
        Hello from <span className="capitalize">{instrument}</span>!
      </p>
    </>
  );
}
