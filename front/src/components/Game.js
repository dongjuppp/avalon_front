import React, { useState,useCallback,useMemo,useRef } from "react";
import "./Game.scss";
import qs from "qs";
import socket from "./GameSocket";
import CharacterList from "./CharacterList";
import RoundArea from "./RoundArea";
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
  const [mainRound,setMainRound]=useState([]);
  const [subRound,setSubRound]=useState([]);

  const { GameSocket, client } = socket;
  window.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded');
    GameSocket(roomId,userList,setUserList,turnNumber,setMainRound,setSubRound);
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
    const confirm=window.sessionStorage.getItem('state');
    const nowTurnId=window.sessionStorage.getItem('nowTurnId');
    console.log(confirm)
    console.log(nowTurnId)
    if(confirm==='Init') //시작전 
      client.send('/app/start',{},JSON.stringify({roomId:roomId,userId:userId,rule:rule}));
    else if(confirm==='Choice'){ //원정대 인원선정
      if(nowTurnId===userId)
        client.send('/app/expeditionMemberFull',{},JSON.stringify({roomId:roomId,userId:userId}))
    }
    else if(confirm==='choiceComplete'){ //찬반투표 끝나야 누를 수 있는 것
      if(nowTurnId===userId)
        client.send('/app/prosAndConsEnd',{},JSON.stringify({roomId:roomId,userId:userId}));
    }
    else if(confirm==='Expedition'){// 원정 성공/실패끝나면 방장이 누를것
        //원정대 투표가 끝나면 누르는것
        client.send('/app/expeditionEnd',{},JSON.stringify({roomId:roomId,userId:userId}));
    }
  }

  //원정 성공/실패
  const expeditionWin=useCallback((num)=>{
    const nowState=window.sessionStorage.getItem('state');
    console.log('성공띠')
    console.log(nowState)
    if(nowState==='Expedition'){
      if(num===0){
        console.log('성공버튼')
        client.send('/app/expeditionWin',{},JSON.stringify({roomId:roomId,userId:userId}))
      }
      else{
        console.log('실패버튼')
        client.send('/app/expeditionLose',{},JSON.stringify({roomId:roomId,userId:userId}))
      }
      
    }
  },[client,roomId,userId])


  //원정대 보내기 찬성/반대
  const expeditionAgree=useCallback(()=>{
    const nowState=window.sessionStorage.getItem('state');
    if(nowState==='choiceComplete'){
      console.log('찬성')
      client.send('/app/expeditionAgree',{},JSON.stringify({roomId:roomId,userId:userId}))
    }
    
  },[client,roomId,userId])

  const expeditionDisAgree=useCallback(()=>{
    const nowState=window.sessionStorage.getItem('state');
    if(nowState==='choiceComplete'){
      console.log('반대')
      client.send('/app/expeditionDisAgree',{},JSON.stringify({roomId:roomId,userId:userId}))
    }
  },[client,userId,roomId])
  
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
          <div className="situation">
            <RoundArea mainRound={mainRound} subRound={subRound}/>
          </div>
          <div className="game-button-area">
          <button onClick={()=>{expeditionWin(0)}} className="game-button beauti">성공</button>
            <button onClick={expeditionAgree} className="game-button">찬성</button>
            <button onClick={start} className="game-button">시작/확정</button>
            <button onClick={()=>{expeditionWin(1)}} className="game-button">실패</button>
            <button onClick={expeditionDisAgree} className="game-button">반대</button>
            <button onClick={exit} className="game-button">나가기</button>
          </div>
        </div>
      </div>
     
    </>

    
  );
};

export default Game;
