/*

I want this app to help people in positions of great influence
teach right things to their band kids. 

These people, whom I love, are not stupid -- they just weren't
prepared well, as many are not.

May this be for God's glory.  Soli Deo Gloria.

*/

import "./App.css";
import { Routes, Route } from "react-router-dom";

//children
import Home from "./components/Home";
import Pedagogy from "./components/Pedagogy";
import Instrument from "./components/Instrument";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="pedagogy" element={<Pedagogy />}>
            <Route path=":instrument" element={<Instrument />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
