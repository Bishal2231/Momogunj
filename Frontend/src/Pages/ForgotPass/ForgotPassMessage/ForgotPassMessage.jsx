import React from 'react'
import { useParams } from 'react-router-dom'
const ForgotPassMessage = () => {
    const {message}=useParams()
  return (
    <div>ForgotPassMessage

    <h1> check yur gmail {message}</h1>

    </div>
  )
}

export default ForgotPassMessage