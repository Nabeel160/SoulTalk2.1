import React from 'react'
import {useState} from "react";
import { VideoRoom } from './VideoRoom';

const PsychologistRoom = () => {
    let data = "channel"

    let room = data

    const [joined, setJoined] = useState(false)

    let handleSub = async () => {
        let room = "test"
        let response = await fetch(`http://127.0.0.1:8000/get_token/?channel=${room}`)
        let data = await response.json()

        let UID = data.uid
        let token = data.token

        sessionStorage.setItem('UID', UID)
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('room', room)
    }

    let handleClick = () => {
        setJoined(true);
        handleSub();
    }
    return (
    <div>
        <br/><br/><br/>

        {!joined && (<button onClick={handleClick}>Join Room</button>)}
        {joined && (<VideoRoom />)}
    </div>
    )
}

export default PsychologistRoom
