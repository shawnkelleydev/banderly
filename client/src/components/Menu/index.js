// MENU

import "./styles.css";

import { instruments } from "../../data";
import { useEffect, useState } from "react";
import Block from "../Block";

export default function Index(props) {
  const [families, setFamilies] = useState(null);

  useEffect(() => {
    let fams = Object.keys(instruments);
    setFamilies(fams);
  }, []);

  return (
    <nav className={props.show ? "nav" : "nav nav-hide"}>
      {families
        ? families.map((family, i) => {
            return (
              <Block
                key={i}
                family={family}
                showMega={props.show}
                setShowMega={props.setShow}
              />
            );
          })
        : null}
    </nav>
  );
}
