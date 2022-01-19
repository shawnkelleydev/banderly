// TOPIC

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import { instruments } from "../../data";

export default function Index(props) {
  const [topic, setTopic] = useState(null);
  const [instrObj, setInstrObj] = useState(null);
  const [topicData, setTopicData] = useState(null);
  const params = useParams();

  useEffect(() => {
    let top = params.topic;
    setTopic(top);
    //get instrument object
    let family = params.family;
    let instrument = params.instrument;
    let obj = instruments[family][instrument];
    setInstrObj(obj);
  }, [params]);

  useEffect(() => {
    if (instrObj) {
      setTopicData(instrObj.topics[topic]);
    }
  }, [topic, instrObj]);

  useEffect(() => {}, [topicData]);

  return (
    <div className="Topic">
      <h1 className="capitalize">{topic}</h1>
      {!topicData
        ? null
        : topicData.map((obj, i) => {
            return (
              <div key={i}>
                <h2>{obj.title}</h2>
                <p>{obj.content}</p>
                {obj.img ? <img src={obj.img} alt={obj.title} /> : null}
                {obj.embedAudio ? (
                  <iframe
                    title="trumpet-buzz"
                    width="100%"
                    height="auto"
                    src={obj.embedAudio}
                  />
                ) : null}
              </div>
            );
          })}
    </div>
  );
}
