import React from 'react';
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

const Character = ({image,clicked}) => {
    return (
        <div className='character'>
            <img src={change(image)} style={clicked} alt='이미지 불러오지 못함'/>
        </div>
    );
};

export default Character;