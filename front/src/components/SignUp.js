import React,{useState} from 'react';
import axios from 'axios';

const SignUp = ({history}) => {

    if(window.sessionStorage.getItem('userInfo')){
        history.push('/lobby')
    }
    const [id,setId]=useState('');

    const [pwd,setPwd]=useState('');

    const [name,setName]=useState('');

    const [msg,setMsg]=useState('');

    const sign= async ()=>{
        const response = await axios.post('/signup',{
            id:id,
            pwd:pwd,
            name:name
        });

        if(response.data==='success'){
            alert('회원가입 성공!')
            history.push('/')
        }

        if(response.data==='name_duplication'){
            setMsg(<div>닉네임이 중복됩니다</div>)
        }

        if(response.data==='id_duplication'){
            setMsg(<div>아이디가 중복됩니다</div>)
        }
    }
    return (
        <div className='login-box'>
      <div className="from-box">
        <div className="form-body">
        <h1 className="logo">AVALON 회원가입</h1>
        
            <div className='form-group'>
                <div><label><b>ID </b></label></div>
                <input type='text' value={id} onChange={(e)=>{setId(e.target.value)}}/>
            </div>
            <div className='form-group'>
                <div><label><b>PassWord </b></label></div>
                <input type='password' value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/>
            </div>
            <div className='form-group'>
                <div><label><b>name </b></label></div>
                <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </div>

            <div className='button-area'>
                <div><button className='in' onClick={sign}>Sign Up</button></div>
            </div>

            <div style={{textAlign:'center',color:'red',fontSize:'20px',marginTop:'5px'}}>
            {msg}
            </div>
            
        
        </div>
      </div>
    </div>
    );
};

export default SignUp;