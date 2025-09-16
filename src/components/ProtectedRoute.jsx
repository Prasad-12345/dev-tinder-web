import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const user = useSelector((store) => store.userStore)
    console.log("protect route" + user)
    if(!user) {
        console.log("here")
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute
