// MENU BLOCK

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { instruments } from "../../data";

export default function Index(props) {
  const [show, setShow] = useState(false);
  const [family, setFamily] = useState(null);
  const [familyList, setFamilyList] = useState(null);

  useEffect(() => {
    if (!props.showMega) {
      setShow(false);
    }
  }, [props.showMega]);

  useEffect(() => {
    let family = props.family;
    setFamily(family);
    let list = instruments[family];
    list = Object.keys(list);
    //get actual name with spaces / not camel case
    let arr = [];
    list.forEach((instrument) => {
      let name = instruments[family][instrument].name;
      arr.push(name);
    });
    //set list
    setFamilyList(arr);
  }, [props]);

  return (
    <div className="Block">
      <h3 onClick={() => setShow(!show)} className={show ? "active" : null}>
        {props.family}
      </h3>
      {!familyList ? null : (
        <ul className={!show ? "ul hide" : "ul"}>
          {familyList.map((instrument, i) => (
            <NavLink
              to={`/${family}/${instrument}`}
              key={i}
              onClick={() => props.setShowMega(false)}
            >
              {instrument}
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
}
