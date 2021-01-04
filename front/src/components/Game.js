import React, { useEffect } from "react";
import "./Game.scss";
import morgana from '../img/mor.jpg';
import merlin from '../img/merlin.jpg'
import Character from "./Character";


//import qs from "qs";
//import axios from "axios";

const Game = ({ location, history }) => {
  //const query = qs.parse(location.search, {
  //  ignoreQueryPrefix: true,
  //});
  //const roomId = query.roomId;
  //const rule = query.rule;

  useEffect(() => {
    console.log(history);
    const unblock = history.block("정말 떠나실건가요?");

    return () => {
      unblock();
    };
  }, [history]);

  const choied={
    border:'5px solid red'
  }

  const crown={
      border:'5px solid green'
  }
  return (
    <>
      <div className="game">
        <div className='upper'>
          <div className="character-box">
              <Character image={morgana} clicked={crown}/>
              <Character image={merlin} clicked={choied}/>
              <Character image={merlin} clicked={crown}/>
              <Character image={merlin} clicked={crown}/>
              <Character image={merlin} clicked={crown}/>
              <Character image={merlin}/>
          </div>
          <div className="chatting">
              <div className='chatting-area'>
              <input className='chatting-input' type='text'/>
              <input type='submit' value='입력'/>
              </div>
          </div>
        </div>
        <div className='lower'>
            <div className='situation'></div>
            <div className='game-button-area'>
                <button className='game-button'>성공</button>
                <button className='game-button'>찬성</button>
                <button className='game-button'>시작</button>
                <button className='game-button'>실패</button>
                <button className='game-button'>반대</button>
                <button className='game-button'>나가기</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Game;
