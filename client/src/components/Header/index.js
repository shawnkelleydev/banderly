import { Link } from "react-router-dom";
import "./styles.css";

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
    </header>
  );
}
