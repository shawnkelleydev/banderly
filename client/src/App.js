/*

I want this app to help people in positions of great influence
teach right things to their band kids. 

These people, whom I love, are not stupid -- they just weren't
prepared well, as many are not.

May this be for God's glory.  Soli Deo Gloria.

*/

//children
import Home from "./components/Home";
import Header from "./components/Header";
// import Instrument from "./components/Instrument";
// import Family from "./components/Family";
// import Topic from "./components/Topic";
import Footer from "./components/Footer";

//dep
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          {/* <Route path=":family" element={<Family />}>
            <Route path=":instrument" element={<Instrument />}>
              <Route path=":topic" element={<Topic />} />
            </Route>
          </Route> */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
