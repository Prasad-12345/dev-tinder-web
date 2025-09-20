// import React, { useState } from 'react'
// import UserCard from './UserCard'
// import axios from 'axios'
// import { BASE_URL } from '../utils/constants'
// import { useDispatch } from 'react-redux'
// import { addUser } from '../utils/userSlice'

// function EditProfile({user}) {
//     const [firstName, setFirstName] = useState(user?.firstName)
//     const [lastName, setLastName] = useState(user?.lastName)
//     const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "")
//     const [age, setAge] = useState(user?.age || "")
//     const [gender, setGender] = useState(user?.gender || "")
//     const [about, setAbout] = useState(user?.about || "")
//     const [error, setError] = useState('')
//     const [showToast, setShowToast] = useState(false)

//     const dispatch = useDispatch()

//     const saveProfile = async () => {
//         try{
//             const res = await axios.post(BASE_URL+'/profile/edit', 
//                 {firstName, lastName, photoUrl, age, gender, about},
//                 {withCredentials:true})
//             dispatch(addUser(res?.data?.data))
//             setShowToast(true)
//             const i = setTimeout(() => {
//                 setShowToast(false)
//             }, 3000)
//         }
//         catch(err){
//             console.log(err.message)
//         }
//     }

//   return (
//     <>
//     <div className='flex flex-col lg:flex-row justify-center my-10 overflow-auto'>
//         <div className="flex justify-center items-center mx-10">
//             <div className="card card-border bg-base-300 w-96">
//                 <div className="card-body">
//                 <h2 className="card-title">Edit Profile</h2>
//                 <div>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">First Name</legend>
//                             <input type="text" className="input" placeholder="Enter firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
//                         </fieldset>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Last Name</legend>
//                             <input type="text" className="input" placeholder="Enter lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                         </fieldset>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Photo Url</legend>
//                             <input type="text" className="input" placeholder="Enter lastName" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>
//                         </fieldset>

//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Age</legend>
//                             <input type="text" className="input" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)}/>
//                         </fieldset>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">Gender</legend>
//                             <input type="text" className="input" placeholder="Enter lastName" value={gender} onChange={(e) => setGender(e.target.value)}/>
//                         </fieldset>
//                         <fieldset className="fieldset">
//                             <legend className="fieldset-legend">About</legend>
//                             <input type="text" className="input" placeholder="Enter firstName" value={about} onChange={(e) => setAbout(e.target.value)}/>
//                         </fieldset>
//                 </div>
//                 <p className="text-red-500">{error}</p>
//                 <div className="card-actions justify-center">
//                     <button className="btn btn-primary my-1" onClick={saveProfile}>Save</button>
//                 </div>
//                 </div>
//             </div>
//         </div>
//         <UserCard user={{firstName, lastName, photoUrl, age, gender, about}} connection={false}/>
//     </div>
//     {
//         showToast && <div className="toast toast-top toast-end">
//             <div className="alert alert-info">
//                 <span>Profile Saved.</span>
//             </div>
//         </div>
//     }
//     </>
//   )
// }

// export default EditProfile

import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user }) {
  const dispatch = useDispatch();

  // Form state
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");

  // UI state
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // Save profile handler
  const saveProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      // Update Redux store and localStorage
      dispatch(addUser(res?.data?.data));
      localStorage.setItem("user", JSON.stringify(res?.data?.data));

      // Show success toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-6 my-6 px-4 lg:px-0 overflow-auto">
        {/* Form Card */}
        <div className="flex justify-center w-full lg:w-1/3 overflow-auto">
          <div className="card bg-base-300 w-full sm:w-96 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center text-xl font-semibold">Edit Profile</h2>

              <div className="flex flex-col gap-4 mt-4">
                <input
                  type="text"
                  className="input w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Photo URL"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                <textarea
                  className="input w-full resize-none h-24"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 mt-2">{error}</p>}

              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={saveProfile}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-1/3 flex justify-center overflow-auto">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            connection={false}
          />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50">
          <div className="alert alert-info shadow-lg">
            <span>Profile Saved.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
