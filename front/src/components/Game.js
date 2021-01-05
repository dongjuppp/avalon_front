import React, { useState } from "react";
import "./Game.scss";
import morgana from "../img/mor.jpg";
import merlin from "../img/merlin.jpg";
import Character from "./Character";
import qs from "qs";
import socket from "./GameSocket";

//import axios from "axios";

const Game = ({ location, history }) => {
  const userId = window.sessionStorage.getItem("userInfo");
  if (!userId) {
    history.push("/");
  }
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const roomId = query.roomId;
  const { GameSocket, client } = socket;
  document.addEventListener("DOMContentLoaded", () => {
    GameSocket(roomId);
  });

  //const rule = query.rule;

  const [msg, setMsg] = useState("");

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      sendChattingMsg();
    }
  };

  const chattingInput = (e) => {
    setMsg(e.target.value);
  };

  const sendChattingMsg = () => {
    client.send(
      "/app/chatting",
      {},
      JSON.stringify({ userId: userId, msg: msg, roomId: roomId })
    );

    setMsg("");
  };

  const choied = {
    border: "5px solid red",
  };

  const crown = {
    border: "5px solid green",
  };
  return (
    <>
      <div className="game">
        <div className="upper">
          <div className="character-box">
            <Character image={morgana} clicked={crown} />
            <Character image={merlin} clicked={choied} />
            <Character image={merlin} clicked={crown} />
            <Character image={merlin} clicked={crown} />
            <Character image={merlin} clicked={crown} />
            <Character image={merlin} />
          </div>
          <div className="chatting">
          
            <div id='scroll-chatting'  className="message-area">
            <li id="msgList"></li>
            </div>
            <div className="chatting-area">
              <input
                className="chatting-input"
                value={msg}
                type="text"
                onChange={chattingInput}
                onKeyPress={pressEnter}
              />
              <input type="submit" value="입력" onClick={sendChattingMsg} />
            </div>
          </div>
        </div>
        <div className="lower">
          <div className="situation"></div>
          <div className="game-button-area">
            <button className="game-button">성공</button>
            <button className="game-button">찬성</button>
            <button className="game-button">시작</button>
            <button className="game-button">실패</button>
            <button className="game-button">반대</button>
            <button className="game-button">나가기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
