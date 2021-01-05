import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

const client=Stomp.over(new SockJs('http://localhost:8080/websocket'));
client.debug=null;

const GameSocket=(roomId)=>{
    client.connect({}, function () {
        client.subscribe("/topic/chatting/" + roomId, function (data) {
        const msgList = document.getElementById("msgList");
        const li = document.createElement("li");
        li.innerHTML = data.body;
        msgList.appendChild(li);
        let scrollingElement = document.getElementById('scroll-chatting');
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
        });
        
      });
}
const socket={GameSocket,client};
export default socket;