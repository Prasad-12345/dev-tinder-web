import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

function NavBar() {
    const user = useSelector((store) => store.userStore)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
      try{
        const res = axios.post(BASE_URL+'/logout', {}, {withCredentials:true})  
        dispatch(removeUser())
        localStorage.removeItem("user");
        navigate('/login')
      }
      catch(err){
        console.log(err.message)
      }
    }
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && (
        <div className="flex gap-2 mx-5">
            <div>Welcome, {user.firstName}  {user.lastName} </div>
          <div className="dropdown dropdown-end"> 
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <Link to='/requests'>Requests</Link>
              </li>
              <li>
                <Link to='/premium'>Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
