import React,{useEffect} from 'react';
import './Game.scss';
import qs from 'qs';
import axios from 'axios';

const Game = ({location,history}) => {
    const query=qs.parse(location.search,{
        ignoreQueryPrefix:true
    });
    const roomId=query.roomId;
    const rule=query.rule;

   

    useEffect(() => {
        console.log(history);
        const unblock = history.block('정말 떠나실건가요?');
       
        return () => {
          unblock();
        };
      }, [history]);
    return (
        <div>
            <h1>이곳은 게임 방이다! {roomId}  {rule}</h1>
        </div>
    );
};

export default Game;