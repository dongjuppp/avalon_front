import React from 'react';
import MainRound from './MainRound';
import SubRound from './SubRound';


const RoundArea = (info) => {
    //0:패배 1:승리 2:아직미진행
    if(!info)return null;
    const mainInfo=info.mainRound

    const subInfo=info.subRound
    
    return (
        <div className='roundArea'>
            <div className='mainRoundArea'>
                {mainInfo.map((info,index)=><MainRound key={index} info={info}/>)}
            </div>
            <div className='subRoundArea'>
                {subInfo.map((info,index)=><SubRound key={index} info={info}/>)}
            </div>
        </div>
    );
};

export default RoundArea;