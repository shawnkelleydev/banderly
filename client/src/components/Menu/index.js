import { NavLink } from "react-router-dom";
import "./styles.css";

export default function Index(props) {
  return (
    <nav className={!props.isHam ? null : "Menu-hide"}>
      <NavLink to="/pedagogy">pedagogy</NavLink>
    </nav>
  );
}
