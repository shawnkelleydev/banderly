// HEADLINE

import "./styles.css";
import { useState, useEffect } from "react";

export default function Index(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (props.instrument) {
      setData(props.instrument);
    }
  }, [props.instrument]);

  // RENDER
  return (
    <>
      {!data ? null : (
        <>
          <h1 className="capitalize">{data.name}</h1>
          <ul>
            {data.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
