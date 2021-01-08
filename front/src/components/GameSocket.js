import Stomp from "stompjs";
import SockJs from "sockjs-client";

const client = Stomp.over(new SockJs("http://localhost:8080/websocket"));
client.debug = null;
const userId = window.sessionStorage.getItem("userInfo");

const printMsg = (msg, color = "black") => {
  const msgList = document.getElementById("msgList");
  const li = document.createElement("li");
  li.innerHTML = msg;
  li.style.cssText = `color:${color}`; //"color:red; font-size:20px;";
  msgList.appendChild(li);
  let scrollingElement = document.getElementById("scroll-chatting");
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
};

const GameSocket = (roomId, userList, setUserList,turnNumber) => {
  console.log("게임 소캣 실행");
  client.connect({}, function (frame) {
    console.log("커넥트 실행");
    client.subscribe("/topic/chatting/" + roomId, function (data) {
      //console.log("메세지 소켓 실행");
      printMsg(data.body, "black");
    });

    client.subscribe("/topic/whoEntry" + roomId, function (data) {
      const info = JSON.parse(data.body);
      //console.log(info);
      
      setUserList(info.users);
      printMsg(info.msg, "red");
    });

    client.subscribe("/topic/exit"+roomId,function (data){
      const info=JSON.parse(data.body);

      if(info.msg==='success'){
        alert(`${info.userId}가 게임에서 나가 게임이 종료되었습니다`,'red')
        client.disconnect()
        window.location.href='/';
      }
    })
    client.subscribe("/topic/exitFail/"+roomId+'/'+userId,function (data){
      const info=data.body;
      printMsg(info,'red');
    })

    client.subscribe("/topic/start"+roomId+'/'+userId,function (data){
      const list=JSON.parse(data.body);
      const images=list.images;
      const users=list.users;
           
      let userList=[]
      for(let i=0;i<images.length;i++){
        
        userList.push(
          {
            userId:users[i],
            image:images[i]
          }
        )
      }
      printMsg(list.msg,'red')
      setUserList(userList);
    })

    client.send(
      "/app/whoEntry",
      {},
      JSON.stringify({ userId: userId, roomId: roomId })
    );

    
  });
};

const socket = { GameSocket, client };
export default socket;
