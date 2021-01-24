import Stomp from "stompjs";
import SockJs from "sockjs-client";

//const client = Stomp.over(new SockJs("http://back/websocket")); //이게 맞는듯

//const client = Stomp.over(new SockJs("http://http://13.124.172.205:8080/websocket"));
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

const GameSocket = (roomId, userList, setUserList,turnNumber,setMainround,setSubRound) => {
  console.log(client)
  console.log('local!!!')
  client.connect({}, function (frame) {
    console.log("커넥트 실행");
    client.subscribe("/topic/chatting/" + roomId, function (data) {
      //console.log("메세지 소켓 실행");
      printMsg(data.body, "black");
    });

    client.subscribe("/topic/whoEntry" + roomId, function (data) {
      const info = JSON.parse(data.body);
      //console.log(info);
      window.sessionStorage.setItem('state','Init')
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

    //원정대 인원선정 완료
    client.subscribe("/topic/expeditionMemberFull/"+roomId, function (data){
      const msg=data.body;
      printMsg(msg,'red');
      window.sessionStorage.setItem('state','choiceComplete');
    })

    client.subscribe("/topic/expeditionMsg/"+roomId,function (data){
      const msg=data.body;
      printMsg(msg,'red');
    })

    client.subscribe("/topic/prosAndConsResult/"+roomId,function(data){
      const res=JSON.parse(data.body);
      printMsg(res.msg,'red');
      if(res.result===1){
        window.sessionStorage.setItem('state','Expedition'); //원정대 출발
      }
      else window.sessionStorage.setItem('state','Choice'); //원정대 다시 선정
    })

    client.subscribe("/topic/voteWinLose/"+roomId,function (data){
      const res=data.body;
      printMsg(res,'red');
    })

    client.subscribe("/topic/expeditionEnd/"+roomId,function (data){
      const res=data.body;
      window.sessionStorage.setItem('state','Choice')
      printMsg(res,'red');
    })

    client.subscribe("/topic/endImage/"+roomId,function(data){
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
      setUserList(userList);
    })

    client.subscribe("/topic/initImage/"+roomId+'/'+userId,function (data){
      const list=JSON.parse(data.body);
      const images=list.images;
      const users=list.users;
      const nowTurnId=list.nowTurnId;
      window.sessionStorage.setItem("nowTurnId",nowTurnId)
      let userList=[]

      for(let i=0;i<images.length;i++){
        userList.push(
          {
            userId:users[i],
            image:images[i]
          }
        )
      }
      setUserList(userList);
    })

    client.subscribe("/topic/roundInfo/"+roomId,function (data){
      
      const info=JSON.parse(data.body)
      const mainRound=info.mainRound;
      const subRound=info.subRound;
      
      setMainround(mainRound);
      setSubRound(subRound);
    })

    client.subscribe("/topic/endSign/"+roomId,function (data){
      const res=JSON.parse(data.body);
      if(res.userId){
        window.sessionStorage.setItem("nowTurnId",res.userId);
        window.sessionStorage.setItem("state","AssassinChoice");
      }
      printMsg(res.msg,'green')
    })

    client.subscribe("/topic/start"+roomId+'/'+userId,function (data){
      const list=JSON.parse(data.body);
      const images=list.images;
      const users=list.users;
      const nowTurnId=list.nowTurnId;
      window.sessionStorage.setItem("nowTurnId",nowTurnId);
      window.sessionStorage.setItem("state",'Choice');
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

    client.subscribe("/topic/choice/"+roomId+"/"+userId,function (data){
      const list=JSON.parse(data.body);
      const checked=list.checked;
      const images=list.images;
      const users=list.users;
      //const nowTurnId=list.nowTurnId;
      //window.sessionStorage.setItem("nowTurnId",nowTurnId);
      let userList=[]
      for(let i=0;i<images.length;i++){
        
        userList.push(
          {
            userId:users[i],
            image:images[i],
            check:checked[i]
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

    
  },function errorCallback(params) {
    console.log('error callback back:8080')
    console.log(params);
  });
};

const socket = { GameSocket, client };
export default socket;
