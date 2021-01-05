import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

const sock=new SockJs('http://localhost:8080/websocket');
const client=Stomp.over(sock);


const GameSocket=(number)=>{
    if(number==='init'){
        client.connect({},function (frame){  
            client.subscribe('/topic/template',function (data){
              //console.log(data.body);
            })
        })
    }
}


export default GameSocket;