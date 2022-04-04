import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {registerUser} from '../../../_actions/user_action'

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEamilHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler=(event) =>{
    setPassword(event.currentTarget.value)
  }
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }
  const onConfirmpasswordHandler = (event) =>{
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) =>{
    //submit 새로고침 방지
    event.preventDefault();
    if(Password !== ConfirmPassword){
      return alert('비밀번호 재확인')
    }

    let body={
      email:Email,
      name:Name,
      password:Password,
    }

    dispatch(registerUser(body))
    .then(response=>{
      if(response.payload.success){
        navigate('/')
      }else{
        alert("중복유저")
      }
    })

    
  }
  return (
    <div style={{display : 'flex', justifyContent:"center", alignItems:"center", width:'100%', height:'100vh'}}>

      <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEamilHandler}/>
        <label>Name</label>
        <input type='text' value={Name} onChange={onNameHandler}/>
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler}/>
        <label>Confirm Password</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmpasswordHandler}/>
        <br/>
        <button>
          회원가입
        </button>
        
      </form>

  </div>
  )
}

export default RegisterPage