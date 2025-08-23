import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

function Profile() {
  const user = useSelector((store) => store.userStore)
  return (
    <div>
      {user && <EditProfile user={user}/>}
    </div>
  )
}

export default Profile
