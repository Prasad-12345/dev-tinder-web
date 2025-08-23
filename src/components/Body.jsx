import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

function Body() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getProfile = async () => {
    try{
      const res = await axios.get(BASE_URL + '/profile/view', {withCredentials:true})
      dispatch(addUser(res.data))
    }
    catch(err){
      console.log(err.message)
      if(err.status === 401){
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <div className='w-full h-full'>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body
