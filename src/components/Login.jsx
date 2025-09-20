import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import api from "../utils/axiosInstance";

function Login() {
    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [error, setError] = useState("")
    const [isLoginForm, setIsLoginForm] = useState(true)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogin = async () => {
        try{
            const res = await api.post(BASE_URL + '/login', {
                emailId, password
            }, {withCredentials:true})
            dispatch(addUser(res.data.user))
            localStorage.setItem("user", JSON.stringify(res.data.user))
            navigate('/')
        }
        catch(err){
            // setError(err.response.data)
        }        
    }

    const handleSigUp = async () => {
      try{
        const res = await axios.post(BASE_URL + '/signUp',{firstName, lastName, emailId, password}, {withCredentials:true})
        console.log(res)
        dispatch(addUser(res.data.user))
        navigate('/profile')
      }
      catch(err){
        console.log(err.message)
      }
    }

  return (
    <div className="flex justify-center items-center my-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? 'Login' : 'SignUp'}</h2>
          <div>
                {
                  !isLoginForm && <fieldset className="fieldset">
                      <legend className="fieldset-legend">First Name</legend>
                      <input type="text" className="input" placeholder="Enter first name" value={firstName} onChange={(e) => setfirstName(e.target.value)}/>
                  </fieldset>
                }
                {
                  !isLoginForm && <fieldset className="fieldset">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input type="text" className="input" placeholder="Enter last name" value={lastName} onChange={(e) => setlastName(e.target.value)}/>
                  </fieldset>
                }
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email</legend>
                    <input type="text" className="input" placeholder="Enter email" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="password" className="input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-1" onClick={isLoginForm ? handleLogin : handleSigUp}>{isLoginForm ? 'Login' : 'SignUp'}</button>
          </div>
          <p onClick={() => setIsLoginForm(!isLoginForm)} className="text-center text-blue-500 cursor-pointer">{isLoginForm ? 'new user?? Signup here' : 'aleady signedup? login here'}</p>
          <p class="text-sm text-pink-800 sm:text-sm sm:text-blue-500 md:text-lg md:text-yellow-300 lg:text-xl lg:text-red-500 xl:text-2xl ">
            Responsive Text
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
