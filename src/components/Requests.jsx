import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'
import UserCard from './UserCard'

function Requests() {
    const dispatch = useDispatch()
    const requests = useSelector((store) => store.requestStore)
    const fetchRequest = async () => {
        try{
            const res = await axios.get(BASE_URL + '/user/requests/received', {withCredentials:true})
            dispatch(addRequests(res?.data?.pendingRequest))
        }
        catch(err){
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchRequest()
    }, [])

    if(!requests) return
    if(requests.length == 0) return <h1 className='font-bold text-2xl text-center my-10'>No connections found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='font-bold text-2xl'>Requests</h1>
      <div className='flex justify-center'>
        {requests.map((request, index) => (
            <UserCard key={index} user={request?.fromUserId} request={request._id}/>
        ))}
      </div>
    </div>
  )
}

export default Requests
