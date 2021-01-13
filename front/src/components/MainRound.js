import React from 'react';
import success from '../img/success.png'
import fail from '../img/fail.png';
import question from '../img/question.jpg';

const MainRound = (info) => {
    let str=info.isWin;
    if(info.info===1){
        str=success;
    }
    else if(info.info===0){
        str=fail;
    }
    else{
        str=question;
    }
    return (
        <div className='mainRound'>
            <img src={str} alt='이미지 불러오지 못함'/>
        </div>
    );
};

export default MainRound;