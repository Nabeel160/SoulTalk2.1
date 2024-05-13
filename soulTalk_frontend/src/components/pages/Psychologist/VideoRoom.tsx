import React, { useEffect, useState } from 'react';
import bg from "../../../assets/images/bg1.jpg"
import m from "../../../assets/images/mic.png";
import mm from "../../../assets/images/mute.png"
import video from "../../../assets/images/3d-video.png"
import stop from "../../../assets/images/stop.png"
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from './VideoPlayer';
import ".././../../styles/Video.css"
import {useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../../../reduxStore/slice/Loginslice"

export const VideoRoom = () => {
    const APP_ID = "84cd947b94c744deaca5575946294f1f";
    const TOKEN = sessionStorage.getItem('token') || "abc";
    const CHANNEL = sessionStorage.getItem('room') || 'defaultname';
    let uid = Number(sessionStorage.getItem('UID'));
    const checkLogin = useSelector((state: any) => state?.login.isLoggedIn)
    const navigate = useNavigate()

    const client = AgoraRTC.createClient({
        mode: 'rtc',
        codec: 'vp8'
    });


    useEffect(() => {
        if(!checkLogin){
      navigate('/logIn')
      alert('Kindly login to access all pages')
    }
    }, [])

    const [users, setUsers] = useState<any[]>([]);
    const [localTracks, setLocalTracks] = useState<any[]>([]);
    const [isAudioMuted, setIsAudioMuted] = useState(true);
    const [isVideoStopped, setIsVideoStopped] = useState(true);

    const handleUserJoined = async (user: any, mediaType: any) => {
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
            setUsers((previousUsers) => [...previousUsers, user]);
        }
        if (mediaType === 'audio') {
            user.audioTrack.play();
        }
    };

    const handleUserLeft = async (user: any) => {
        setUsers((previousUsers) => previousUsers.filter((u) => u.uid !== user.uid));
    };

    const toggleAudioMute = () => {
        localTracks[0].setEnabled(!isAudioMuted);
        setIsAudioMuted(!isAudioMuted);
    };

    const toggleVideoStop = () => {
        localTracks[1].setEnabled(!isVideoStopped);
        setIsVideoStopped(!isVideoStopped);
    };

    useEffect(() => {
        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);

        client.join(APP_ID, CHANNEL, TOKEN, uid)
            .then((uid) =>
                Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
            ).then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setLocalTracks(tracks);
                setUsers((previousUsers) => [...previousUsers, {
                    uid,
                    videoTrack,
                    audioTrack,
                }]);
                client.publish(tracks);
            });

        return () => {
            for (let localTrack of localTracks) {
                localTrack.stop();
                localTrack.close();
            }
            client.off('user-published', handleUserJoined);
            client.off('user-left', handleUserLeft);
        };
    }, []);

    return (
        <div className="video-room-container " style={{backgroundImage:`url(${bg})`}}>

            <div className="video-players" style={{position:"relative"}}>
                {users.map((user) => (
                    <VideoPlayer key={user.uid} user={user} />
                ))}
                <div className="controls d-flex justify-content-center" style={{position:"absolute",bottom:"-15px"}}>
                <button onClick={toggleAudioMute}>
    {isAudioMuted ?
        <img style={{width:"20px",height:"20px"}} src={m} alt="Mute Audio" /> :
        <img style={{width:"20px",height:"20px"}}  src={mm} alt="Unmute Audio" />
    }
</button>
                 <button onClick={toggleVideoStop}>
    {isVideoStopped ?
        <img style={{width:"20px",height:"20px"}} src={video} alt="Mute Audio" /> :
        <img style={{width:"20px",height:"20px"}} src={stop} alt="Unmute Audio" />
    }
</button>
            </div>
            </div>


        </div>
    );
};
