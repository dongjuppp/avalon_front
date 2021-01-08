import React from 'react';
import Character from './Character';


const CharacterList = (list) => {
    
    if(!list.userList){
        return null;
    }
    
    return (
        <>
        <div>
            {list.userList.map((user,index)=>(
                <Character client={list.client} isTurn={user.isTurn} userId={user.userId} image={user.image} key={index}/>
            ))}
        </div>
       
        </>
    );
};

export default CharacterList;