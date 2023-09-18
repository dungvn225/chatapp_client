import React, { useState } from "react";

import { images } from "../../assets/images/images";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";
import { config } from "../../config";


const Hơme = ({socket}) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const { bg_chat } = images;

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && room.trim() !== "") {
      socket.emit('join room from client to server',{
        username,room
      })
      navigate(config.routes.CHAT,{state:{username}}); 
    } else {
      Swal.fire("Oops!", "Please enter full information", "error");
    }
  };

  return (
   
      <div
        className={`flex w-screen h-screen`}
        style={{
          background: `url('${bg_chat}') no-repeat center/cover`,
        }}
      >
        <div className="m-auto w-[400px] p-4 border">
          <h1 className="font-bold mb-4">Join a room</h1>
          <form>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="border border-1 border-[black] outline-none h-[40px] w-full mb-2 pl-2 rounded"
            />{" "}
            <br />
            <input
              type="text"
              name="room"
              value={room}
              placeholder="room"
              onChange={(e) => setRoom(e.target.value)}
              className="border border-1 border-[black] outline-none h-[40px] w-full mb-2 pl-2 rounded"
            />{" "}
            <br />
            <button
              onClick={(e) => handleJoin(e)}
              className="w-full bg-blue-500 text-white  rounded py-2"
            >
              Join
            </button>
          </form>
        </div>
      </div>
      
  
  );
};

export default Hơme;
