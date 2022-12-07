import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import Home from "./components/Home";
import VisualMagic from "./components/VisualMagic";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magic_visuals" element={<VisualMagic />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
