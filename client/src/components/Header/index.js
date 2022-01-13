import { Link } from "react-router-dom";
import "./styles.css";

//children
import Menu from "../Menu";

export default function Index(props) {
  return (
    <header>
      <Link to="/">
        <h2>Band Helper</h2>
      </Link>
      <ul
        className={props.isHam ? "Ham" : "Ham X"}
        onClick={() => props.setIsHam(!props.isHam)}
      >
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Menu isHam={props.isHam} />
    </header>
  );
}
