import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.js";
import Chats from "./Pages/Chats.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
