import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { use } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext);

  const [currState,setCurrState] = useState("Login")
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
  
  // used to handle input changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value})) // updating data state
  }

  const onLogin = async (event) => {
    event.preventDefault(); // prevent page reload on form submit
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl,data);

    if (response.data.success) {
      setToken(response.data.token); // setting token in context
      localStorage.setItem("token",response.data.token); // storing token in local storage
      setShowLogin(false); // closing login popup / keeping it hidden
    } else {
      alert(response.data.message); // showing error message
    }

  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {/* If current state is Login then don't show name input field */}
          {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type='submit' >{currState=="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms & conditions and privacy policy.</p>
        </div>

        {currState==="Login"
        ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        }

      </form>
    </div>
  )
}

export default LoginPopup
