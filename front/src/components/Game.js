import React, { useState,useCallback,useMemo,useRef } from "react";
import "./Game.scss";
import qs from "qs";
import socket from "./GameSocket";
import CharacterList from "./CharacterList";
//import axios from "axios";

const Game = ({ location, history }) => {
  const userId = window.sessionStorage.getItem("userInfo");
  if (!userId) {
    history.push("/");
  }
  let turnNumber=useRef(1);
  const sign='1'
  const query= useMemo(()=>{
    return qs.parse(location.search, {
      ignoreQueryPrefix: true,
    })
  },[location])
  
  //const roomState=0; //0대기, 1시작 
  
  const roomId = useMemo(()=>{return query.roomId},[query]);
  window.sessionStorage.setItem("roomId",roomId)

  const [msg, setMsg] = useState("");

  const [userList,setUserList]=useState([]);

  const { GameSocket, client } = socket;
  window.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded');
    GameSocket(roomId,userList,setUserList,turnNumber);
})

  const rule = query.rule;

 
  

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
      //console.log(roomId)
    setMsg("");
  };

  const exit=useCallback(()=>{
    client.send('/app/exit',{},JSON.stringify({userId:userId,roomId:roomId}));
  },[userId,roomId,client])

  const start=()=>{
    client.send('/app/start',{},JSON.stringify({roomId:roomId,userId:userId,rule:rule}));
  }
  
  return (
    <>
    <div style={{display:'none'}}>{sign}</div>
      <div className="game">
        <div className="upper">
          <div className="character-box">
            <CharacterList client={client} userList={userList}/>            
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
            <button onClick={start} className="game-button">시작</button>
            <button className="game-button">실패</button>
            <button className="game-button">반대</button>
            <button onClick={exit} className="game-button">나가기</button>
          </div>
        </div>
      </div>
     
    </>

    
  );
};

export default Game;
