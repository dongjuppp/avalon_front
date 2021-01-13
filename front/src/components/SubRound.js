import React from 'react';
import suc from '../img/suc.png';
import fa from '../img/fa.png';

const SubRound = (info) => {
    console.log(info)
    let image=suc
    if(info.info===0){
        image=fa;
    }
    
    return (
        <div className='subRound'>
            <img src={image} alt='이미지 불러오지 못함'/>
        </div>
    );
};

export default SubRound;