import React,{useState} from 'react';

const Chatting = ({userId,roomId,client}) => {

    const [msg, setMsg] = useState("");

    const pressEnter = (e) => {
        if (e.key === "Enter") {
          sendChattingMsg();
        }
      };
    
      const chattingInput = (e) => {
        setMsg(e.target.value);
      };
    
      const sendChattingMsg = () => {
        client.send(
          "/app/chatting",
          {},
          JSON.stringify({ userId: userId, msg: msg, roomId: roomId })
        );
          //console.log(roomId)
        setMsg("");
      };

    return (
        <div className="chatting">
          
            <div id='scroll-chatting'  className="message-area">
            <li id="msgList"></li>
            </div>
            <div className="chatting-area">
              <input
                className="chatting-input"
                value={msg}
                type="text"
                onChange={chattingInput}
                onKeyPress={pressEnter}
              />
              <input type="submit" value="입력" onClick={sendChattingMsg} />
            </div>
          </div>
    );
};

export default Chatting;