import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setSetRoom] = useState('')
  
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> Join </h1>
        <div> 
          <input 
            className="joinInput" 
            placeholder="" 
            name="" 
            type="text" 
            onChange={(e)=> setName(e.target.value)}
          /> 
        </div>
        <div> 
          <input 
            className="joinInput mt-20" 
            placeholder="" 
            name="" 
            type="text"  
            onChange={ e => setSetRoom(e.target.value)} 
          /> 
        </div>
        <Link onClick={ e => (!name || !room) ? e.preventDefault() : null } to={"/chat?name=${name}&room=${room}"}>
          <button className="button  mt-20" type="submit"> Submit </button>
        </Link>
      </div>
    </div>
  )
}

export default Join
