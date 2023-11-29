import React, { useState } from 'react'
import axios from 'axios';

const Register = () => {
    const [userName, setuserName] = useState("")
    const [pwd, setpwd] = useState("")
    const register=()=>{
        axios.post("http://127.0.0.1:8000/register/",{userName,pwd})
    }
  return (
    <div>Register
        User name:<input onChange={(evt)=>setuserName(evt.target.value)}/>
        Pwd :<input onChange={(evt)=>setpwd(evt.target.value)} type='password'/>
        Administrator:????
        <button onClick={()=>register()}>Register/signup</button>
    </div>
  )
}

export default Register