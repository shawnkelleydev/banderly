// PEDAGOGY

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";

export default function Index(props) {
  const [topic, setTopic] = useState(null);
  const params = useParams();

  useEffect(() => {
    let top = params.topic;
    setTopic(top);
  }, [params]);

  return (
    <div className="Topic capitalize">
      <h3>{topic}</h3>
    </div>
  );
}
