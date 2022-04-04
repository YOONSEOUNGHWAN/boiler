import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../../../_actions/user_action'
function LoginPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEamilHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler=(event) =>{
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) =>{
    //submit 새로고침 방지
    event.preventDefault();
    
    let body={
      email:Email,
      password:Password
    }

    dispatch(loginUser(body))
    .then(response=>{
      if(response.payload.loginSuccess){
        navigate('/')
      }else{
        alert('Error')
      }
    })

    
  }
  return (
    <div style={{display : 'flex', justifyContent:"center", alignItems:"center", width:'100%', height:'100vh'}}>

      <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
        <label>Eanmil</label>
        <input type='email' value={Email} onChange={onEamilHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <br/>
        <button>
          login
        </button>
        
      </form>

  </div>
  )
}

export default LoginPage