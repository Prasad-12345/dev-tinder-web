import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

function EditProfile({user}) {
    const [firstName, setFirstName] = useState(user?.firstName)
    const [lastName, setLastName] = useState(user?.lastName)
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "")
    const [age, setAge] = useState(user?.age || "")
    const [gender, setGender] = useState(user?.gender || "")
    const [about, setAbout] = useState(user?.about || "")
    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)

    const dispatch = useDispatch()

    const saveProfile = async () => {
        try{
            const res = await axios.post(BASE_URL+'/profile/edit', 
                {firstName, lastName, photoUrl, age, gender, about},
                {withCredentials:true})
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            const i = setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
        catch(err){
            console.log(err.message)
        }
    }

  return (
    <>
    <div className='flex justify-center my-10'>
        <div className="flex justify-center items-center mx-10">
        <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input type="text" className="input" placeholder="Enter firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input type="text" className="input" placeholder="Enter lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo Url</legend>
                        <input type="text" className="input" placeholder="Enter lastName" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input type="text" className="input" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <input type="text" className="input" placeholder="Enter lastName" value={gender} onChange={(e) => setGender(e.target.value)}/>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About</legend>
                        <input type="text" className="input" placeholder="Enter firstName" value={about} onChange={(e) => setAbout(e.target.value)}/>
                    </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-primary my-1" onClick={saveProfile}>Save</button>
            </div>
            </div>
        </div>
        </div>
        <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} connection={false}/>
    </div>
    {
        showToast && <div className="toast toast-top toast-end">
            <div className="alert alert-info">
                <span>Profile Saved.</span>
            </div>
        </div>
    }
    </>
  )
}

export default EditProfile
