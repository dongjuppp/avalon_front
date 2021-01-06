import React from 'react';
import Character from './Character';


const CharacterList = (list) => {
    console.log(list.userList)
    //const [userList,setUserList]=useState([...list.userList]);
    // console.log('Eldyd')
     //console.log(userList)
    if(!list.userList){
        return null;
    }
    return (
        <>
        <div>
            {list.userList.map((user,index)=>(
                <Character image={user.image} key={index}/>
            ))}
        </div>
       
        </>
    );
};

export default CharacterList;