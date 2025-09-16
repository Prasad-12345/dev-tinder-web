import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import UserCard from './UserCard'

function Connections() {
    const dispatch = useDispatch()
    const connections = useSelector((store) => store.connectionStore)
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + '/user/connections', {withCredentials:true})
            dispatch(addConnections(res?.data?.data))
        }
        catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if(!connections) return
    if(connections.length == 0) return <h1 className='font-bold text-2xl text-center my-10'>No connections found</h1>
  return (
    <div className='text-center my-10'>
      <h1 className='font-bold text-2xl'>Connections</h1>
      <div className='flex flex-row justify-center gap-2'>
        {connections.map((connection) => (
            <UserCard user={connection} connection={true}/>
        ))}
      </div>
    </div>
  )
}

export default Connections
