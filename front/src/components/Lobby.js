import React, { useState } from "react";
import "./Lobby.scss";
import RoomList from "./RoomList";

const Lobby = ({ history }) => {
  const [sign, setSign] = useState(1);

  if (!window.sessionStorage.getItem("userInfo")) {
    console.log("로비 세션없음");
    history.push("/");
  }

  const move=()=>{
    history.push('/makeRoom')
  }

  return (
    <div>
      <RoomList sign={sign} />
      <div>
       <button onClick={move} className="make-button">방만들기</button>
      </div>
      <button
        className="refresh"
        onClick={() => {
          setSign(sign + 1);
        }}
      >
        새로고침
      </button>
    </div>
  );
};

export default Lobby;
