import Stomp from 'stompjs';
import SockJs from 'sockjs-client';

const sock=new SockJs('http://localhost:8080/websocket');
const client=Stomp.over(sock);


const connect=(number)=>{
    if(number===1){
        client.connect({},function (frame){  
            client.subscribe('/topic/template',function (data){
              //console.log(data.body);
            })
          })
    }
}


export default connect;