import React, { useState } from "react";
import axios from "axios";

const SignUp = ({ history }) => {
  function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  }

  if (window.sessionStorage.getItem("userInfo")) {
    history.push("/lobby");
  }
  const [id, setId] = useState("");

  const [pwd, setPwd] = useState("");

  const [pwdValidation, setPwdValidation] = useState("");

  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");

  const [valid,setValid]=useState(false);

  const [code,setCode]=useState('');

  const [userInputCode,setUserInputCode]=useState('');

  const sign = async () => {
    if (pwd !== pwdValidation) {
      setMsg(<div>비밀번호가 일치하지 않습니다</div>);
      return;
    }
    if (pwd.length < 8) {
      setMsg(<div>비밀번호를 8자 이상으로 해주세요</div>);
      return;
    }
    if (name.length > 10) {
      setMsg(<div>닉네임 길이를 10자 이하로 해주세요</div>);
      return;
    }
    if(!ValidateEmail(id)){
        setMsg(<div>아이디를 이메일 형식으로 해주세요</div>)
        return;
    }
    try {
      const response = await axios.post("/signup", {
        id: id,
        pwd: pwd,
        name: name,
      });
      if (response.data === "name_duplication") {
        setMsg(<div>닉네임이 중복됩니다</div>);
      }

      if (response.data === "id_duplication") {
        setMsg(<div>아이디가 중복됩니다</div>);
      }
      if(response.data==="emailFail"){
        setMsg(<div>이메일 서비스가 실패했습니다</div>)
      }
      if(response.data===null){
        setMsg(<div>>서버와의 통신에 실패했습니다</div>)
      }
      const data=response.data.split('/');
      if (data[0] === "success") {
          setValid(true);
          setCode(data[1])
          alert('인증메일이 발송되었습니다.')
      }
    } catch (e) {
      console.log(e);
      setMsg(<div>서버와의 통신에 실패했습니다</div>);
    }
  };

  const success=async()=>{
      if(code===userInputCode){
          try{
              const response= await axios.post('/validation',{
                id: id,
                pwd: pwd,
                name: name,
              })
              if(response.data==='success'){
                  alert('회원가입 성공!')
                  history.push("/");
              }
          }
          catch(e){
              console.log(e);
              setMsg(<div>서버와의 통신에 실패했습니다
              </div>)
          }
      }
      else{
          setMsg(<div>인증 코드와 다른 입력입니다.</div>)
      }
  }
  return (
    <div className="login-box">
      <div className="from-box">
        <div className="form-body">
          <h1 className="logo">AVALON 회원가입</h1>

          <div className="form-group">
            <div>
              <label>
                <b>ID </b>
              </label>
            </div>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              placeholder="email"
            />
          </div>
          <div className="form-group">
            <div>
              <label>
                <b>PassWord </b>
              </label>
            </div>
            <input
              type="password"
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
              placeholder="password"
            />
          </div>
          <div className="form-group">
            <div>
              <label>
                <b>PassWord Check</b>
              </label>
            </div>
            <input
              type="password"
              value={pwdValidation}
              onChange={(e) => {
                setPwdValidation(e.target.value);
              }}
              placeholder="password check"
            />
          </div>
          <div className="form-group">
            <div>
              <label>
                <b>nickname </b>
              </label>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="nickname"
            />
          </div>
          {valid ? <div className="form-group">
              <input value={userInputCode} onChange={(e)=>{setUserInputCode(e.target.value)}} type="text" placeholder='validation code'/>
              <button onClick={success}>submit</button>
          </div>: <div></div>}
          
          {valid ? <div></div>:
          <div className="button-area">
          <div>
            <button className="in" onClick={sign}>
              Sign Up
            </button>
          </div>
        </div>}          

          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "20px",
              marginTop: "5px",
            }}
          >
            {msg}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
