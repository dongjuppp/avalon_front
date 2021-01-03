import React, { useState } from "react";
import "./MakeRoom.scss";
import axios from 'axios';

const MakeRoom = ({history}) => {

  if(!window.sessionStorage.getItem('userInfo')){
    history.push('/')
  }
  const [roomName, setRoomName] = useState("");
  const [rule,setRule]=useState('0');
  const [msg,setMsg]=useState('')
  const changeRule=(e)=>{
    setRule(e.target.value);
  }

  const makeRoom=async ()=>{
    if(rule==='0' || roomName===''){
      setMsg(<div>빈칸을 모두 입력해주세요</div>)
    }
    else{
      try{
        console.log(`룰:${rule} 방제:${roomName}`)
        const response = await axios.post('/makeRoom',{rule:rule,roomName:roomName});
        
        if(response.data!=='fail'){
          history.push(`/game?roomId=${response.data}&rule=${rule}`);
          
        }
        else{
          setMsg(<div>방만들기에 실패하였습니다</div>)
          
        }
      }catch(e){
        setMsg(<div>서버와의 통신에 문제가 생겼습니다</div>)
        console.log(e);
      }
    }
    
  }
  return (
    <div className="login-box">
      <div className="from-box">
        <div className="form-body">
          <h1 className="logo">AVALON 방만들기</h1>

          <div className="form-group">
            <div>
              <label>
                <b>방제목 </b>
              </label>
            </div>
            <input
              type="text"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
            />
          </div>

          <label for="pet-select">룰선택</label>
              <br/>
          <select value={rule} onChange={changeRule}>
            <option value="0">규칙을 선택하세요</option>
            <option value="1">5인: (선)멀린+신하2 (악)암살자+신하1</option>
            <option value="2">6인: (선)멀린+신하3 (악)암살자+신하1</option>
            <option value="3">6인 확장: (선)멀린+퍼시벌+신하2 (악)암살자+모르가나</option>
            <option value="4">7인: (선)멀린+퍼시벌+신하2 (악)암살자+신하2</option>
            <option value="5">7인 확장: (선)멀린+퍼시벌+신하2 (악)암살자+모르가나+오베론</option>
            <option value="6">8인: (선)멀린+퍼시벌+신하3 (악)암살자+신하2</option>
            <option value="7">8인 확장: (선)멀린+퍼시벌+신하3 (악)암살자+모르가나+오베론</option>
            <option value="8">9인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+모드레드</option>
            <option value="9">9인 확장:(선)멀린+퍼시벌+신하4 (악)암살자+모르가나+신하1</option>
            <option value="10">10인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+모드레드+신하</option>
            <option value="11">10인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+오베론+신하</option>
            <option value="12">10인: (선)멀린+퍼시벌+신하4 (악)암살자+모르가나+모드레드+오베론</option>
          </select>

          <div className="button-area">
            <div>
              <button className="in" onClick={makeRoom}>만들기</button>
            </div>
          </div>
          {msg}
        </div>
      </div>
    </div>
  );
};

export default MakeRoom;
