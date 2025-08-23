import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import { removeFeed } from "../utils/feedSlice";

function UserCard({user, connection = false, request = false}) {
    const {firstName, lastName, age, photoUrl, gender, about, skills} = user
    const dispatch = useDispatch()

    const reviewRequest = async (status, id) => {
      try{
        const res = await axios.post(BASE_URL + '/request/review/'+status+'/'+id, {}, {withCredentials:true})
        console.log(res)
        dispatch(removeRequest(res?.data?.data?._id))
      }
      catch(err){
        console.log(err.message)
      }
    }

    const handleSendRequest = async (status, userId) => {
      try{
        const res = await axios.post(BASE_URL + '/request/send/' + status + '/' + userId, {}, {withCredentials:true})
        console.log(res?.data?.data?.toUserId)
        dispatch(removeFeed(res?.data?.data?.toUserId))
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src={photoUrl}
            alt="photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          {!connection && <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={request ? ()=>reviewRequest('rejected', request) : () => handleSendRequest('ignored', user._id)}>{request ? 'Reject' : 'Ignore'}</button>
            <button className="btn btn-primary" onClick={request ? ()=>reviewRequest('accepted', request) : () => handleSendRequest('interested', user._id)}>{request ? 'Accept' : 'Interested'}</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
