import { NavLink } from "react-router-dom";
import "./styles.css";

import { instruments } from "../../data/data";

export default function Index(props) {
  const brass = instruments.brass;
  const woodwinds = instruments.woodwinds;
  const strings = instruments.strings;
  const percussion = instruments.percussion;

  return (
    <div className="MenuBlock">
      <h3>{props.title}</h3>
      <h4>brass</h4>
      <ul className="items">
        {brass.map((item, i) => (
          <li key={i}>
            <NavLink to={`/${props.title}/${item}`}>{item}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
