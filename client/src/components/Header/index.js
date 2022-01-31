// HEADER

// import { useState } from "react";
import "./styles.css";

// import Menu from "../Menu";
import { Link } from "react-router-dom";

export default function Index() {
  // const [showMega, setShowMega] = useState(false);

  return (
    <header>
      <Link to="/">
        <h1>Banderly</h1>
      </Link>
      {/* <button
        onClick={() => setShowMega(!showMega)}
        className={showMega ? "active instruments" : "instruments"}
      >
        {showMega ? <>&#187;</> : <>&#171;</>} instruments
      </button>
      <Menu show={showMega} setShow={setShowMega} /> */}
    </header>
  );
}
