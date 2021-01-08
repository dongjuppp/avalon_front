import React,{useState} from 'react';
import que from '../img/que.png'
import assassinn from '../img/assassin.jpg';
import merlin from '../img/merlin.jpg';
import mor from '../img/mor.jpg';
import mordred from '../img/mordred.jpg';
import normalevil1 from '../img/normalevil1.jpg';
import normalevil2 from '../img/normalevil2.jpg';
import normalgood1 from '../img/normalgood1.jpg';
import normalgood2 from '../img/normalgood2.jpg';
import normalgood3 from '../img/normalgood3.jpg';
import normalgood4 from '../img/normalgood4.jpg';
import oberon from '../img/oberon.jpg';
import par from '../img/par.png';
import { client } from 'stompjs';


function change(image){
    switch(image){
        case 'que':
            return que;
        case 'assassin':
            return assassinn
        case 'merlin':
            return merlin
        case 'mor':
            return mor;
        case 'mordred':
            return mordred
        case 'normalevil1':
            return normalevil1
        case 'normalevil2':
            return normalevil2
        case 'oberon':
            return oberon
        case 'par':
            return par
        case 'normalgood1':
            return normalgood1
        case 'normalgood2':
            return normalgood2
        case 'normalgood3':
            return normalgood3
        case 'normalgood4':
            return normalgood4
        default:
            return que;
    }
}

const Character = ({client,userId,image,isTurn}) => {
    const myId=window.sessionStorage.getItem("userInfo")
    let turn={
        border:'solid 5px green'
    }
    // if(!isTurn){
    //     turn=null;
    // }
    const [clicked,setClicked]=useState(false);

    const onClick=()=>{
        console.log(clicked)
        //const roomId=window.sessionStorage.getItem("roomId")
        //client.send("/app/choice",{},JSON.stringify({choiceId:userId,userId:myId,roomId:roomId}))
        setClicked(!clicked)
    }

    let show=<img onClick={onClick} src={change(image)} alt='이미지 불러오지 못함'/>
    const showClick=<img style={turn} onClick={onClick} src={change(image)} alt='이미지 불러오지 못함'/>
    return (
        <div className='character'>
            {clicked ? show:showClick}
            <div className='identity'>{userId}</div>
        </div>        
    );
};

export default Character;