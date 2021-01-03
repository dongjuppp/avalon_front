import React,{useReducer,useEffect} from 'react';
import './Room.scss';
import {Link} from 'react-router-dom';

function reducer(state,action){
    switch(action.type){
        case 1:
            return '5인: (선)멀린+신하2 (악)암살자+신하1';
        case 2:
            return '6인: (선)멀린+신하3 (악)암살자+신하1'
        case 3:
            return '6인 확장: (선)멀린+퍼시벌+신하2 (악)암살자+모르가나';
        case 4:
            return '7인: (선)멀린+퍼시벌+신하2 (악)암살자+신하2';
        case 5:
            return '7인 확장: (선)멀린+퍼시벌+신하2 (악)암살자+모르가나+오베론';
        case 6:
            return '8인: (선)멀린+퍼시벌+신하3 (악)암살자+신하2';
        case 7:
            return '8인 확장: (선)멀린+퍼시벌+신하3 (악)암살자+모르가나+오베론';
        case 8:
            return '9인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+모드레드';
        case 9:
            return '9인 확장:(선)멀린+퍼시벌+신하4 (악)암살자+모르가나+신하1';
        case 10:
            return '10인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+모드레드+신하';
        case 11:
            return '10인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+오베론+신하';
        case 12:
            return '10인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+모드레드+오베론';
        default:
            return '';
    }
}


const Room = ({room}) => {
    const [state,dispatch]=useReducer(reducer,'sd');
    const {roomName,rule,roomId}=room
    const path=`/game?roomId=${roomId}&rule=${rule}`

    const getString=()=>{
        dispatch({type:rule});
        return state;
    }

    useEffect(()=>{
        getString()
    })
    
    return (
        <>
        <Link to={path}>
        <button className='list-button'>방제:{roomName}
        <br/>룰:{state}</button></Link></>
    );
};

export default Room;