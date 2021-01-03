import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "./Room";
import './RoomList.scss';

const RoomList = ({sign}) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/getRoom");
        setRooms(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  },[sign]);

  if(!rooms){
      return null;
  }
  return (
      <>
      <div className='list'>
      {rooms.map((room,index) => (
          <Room key={index} room={room} />
      ))}
      </div>
      
      </>
  );
};

export default RoomList;
