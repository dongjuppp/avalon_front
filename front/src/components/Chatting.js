import React from 'react';

const Chatting = ({chattingInput,sendChattingMsg}) => {
    return (
        <div className='chatting-area'>
            <input className="chatting-input" type="text" onChange={chattingInput}/>
              <input type="submit" value="입력" onClick={sendChattingMsg}/>
        </div>
    );
};

export default Chatting;