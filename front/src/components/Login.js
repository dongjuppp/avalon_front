import React,{useState} from "react";
import "./Login.scss";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = ({history}) => {

    
    if(window.sessionStorage.getItem('userInfo')){
        history.push('/lobby')
    }

    const [id,setId]=useState('');

    const [pwd,setPwd]=useState('');

    const [msg,setMsg]=useState('');


    
    const postLogin= async ()=>{

        try{
            const response = await axios.post('/login', {
                id:id,
                pwd:pwd
            })
            console.log(`응답은: ${response.data}`)

            if(response.data==='success'){
                window.sessionStorage.setItem('userInfo',id)
                console.log('로비로이동!')
                history.push('/lobby')
            }

            if(response.data==='fail'){
                setMsg(<div>아이디 혹은 비밀번호가 틀렸습니다</div>)
            }
        }catch(e){
            console.log(e)
            setMsg(<div>서버와의 통신에 문제가 생겼습니다</div>)
        }
    }

  return (
    <div className='login-box'>
      <div className="from-box">
        <div className="form-body">
        <h1 className="logo">AVALON</h1>
        
            <div className='form-group'>
                <div><label><b>ID </b></label></div>
                <input type='text' value={id} onChange={(e)=>{setId(e.target.value)}}/>
            </div>
            <div className='form-group'>
                <div><label><b>PassWord </b></label></div>
                <input type='password' value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/>
            </div>

            <div className='button-area'>
                <div><button className='in' onClick={postLogin}>Sign In</button></div>
                <Link to='/signup'>
                <div><button className='up'>Sign Up</button></div>
                </Link>
            </div>

            <div style={{textAlign:'center',color:'red',fontSize:'20px',marginTop:'5px'}}>
            {msg}
            </div>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
