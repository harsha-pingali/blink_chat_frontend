import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.js";
import Chats from "./Pages/Chats.js";
import Profile from "./Pages/Profile.js";
import Reset from "./Pages/Reset.js";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chats/:id" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
