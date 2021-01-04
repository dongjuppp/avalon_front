import React from 'react';

const Character = ({image,clicked}) => {
    return (
        <div className='character'>
            <img src={image} style={clicked} alt='이미지 불러오지 못함'/>
        </div>
    );
};

export default Character;