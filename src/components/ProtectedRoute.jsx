import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const user = useSelector((store) => store.userStore)
    const storedUser = JSON.parse(localStorage.getItem("user") || null);
    console.log("protect route" + user)
    console.log("storedUser" + storedUser)
    if(!user && !storedUser) {
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute
