import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import Players from "./Pages/Players/Players";
import TeamManager from "./Pages/TeamManager/TeamManager";

import LoginApp from "./Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginApp />} />

          <Route path="/login" element={<LoginApp />} />

          <Route path="/players" element={<Players />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="/player" element={<Players />} />

          <Route path="/teamManager" element={<TeamManager />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
