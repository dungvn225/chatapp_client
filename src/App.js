import React, { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Hơme from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import  io  from "socket.io-client";
const socket = io(process.env.REACT_APP_SERVER_URL,{
  transports:['websocket']
});

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Hơme socket={socket}/>} exect />
        <Route path="/chat" element={<Chat socket={socket}/>} exect />
      </Routes>
    </div>
  );
};

export default App;
