import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.css";

// TOPIC BUTTON

export default function Index(props) {
  const [instrument, setInstrument] = useState(null);
  const [active, setActive] = useState(false);

  const location = useLocation();

  //avoid async issues
  useEffect(() => {
    if (props.instrument) {
      setInstrument(props.instrument);
    }
  }, [props]);

  //check if currently navigated to this topic / setActive as needed
  useEffect(() => {
    let loc = location;
    loc = loc.pathname.split("/");
    loc = loc[loc.length - 1];
    setActive(loc === props.topic ? true : false);
  }, [location, props]);

  //random number derived from length of quotes, encoded in url

  return (
    <>
      {!instrument ? null : (
        <Link
          to={
            !active
              ? `/${instrument.family}/${instrument.name}/${props.topic}`
              : `/${instrument.family}/${instrument.name}`
          }
        >
          <button className={active ? "active" : null}>{props.topic}</button>
        </Link>
      )}
    </>
  );
}
