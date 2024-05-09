import React, {useEffect, useState} from 'react'
import AgoraRTC from "agora-rtc-sdk-ng";
import {VideoPlayer} from './VideoPlayer'


export const VideoRoom = () => {
    const APP_ID = "84cd947b94c744deaca5575946294f1f";
    const TOKEN = sessionStorage.getItem('token') || "abc"
    const CHANNEL = sessionStorage.getItem('room') || 'defaultname'
    let uid = Number(sessionStorage.getItem('UID'))

    const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
});



    const [users,setUsers] = useState<any[]>([]);
    const [localTracks, setLocalTracks] = useState<any[]>([])


    const handleUserJoined = async (user: any, mediaType: any) => {
        await client.subscribe(user, mediaType);

        if(mediaType === 'video'){
            setUsers((previousUsers) => [...previousUsers, user]);
        }
        if(mediaType === 'audio'){
            user.audioTrack.play();
        }
    }
    const handleUserLeft = async (user: any) => {
        setUsers((previousUsers) => previousUsers.filter((u) => u.uid !== user.uid));
    }

   useEffect(() => {
   client.on('user-published', handleUserJoined);
   client.on('user-left', handleUserLeft);

        client.join(APP_ID, CHANNEL, TOKEN, uid)
            .then((uid) =>
                Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
           ).then(([tracks, uid]) => {
            const [audioTrack, videoTrack] = tracks;
            setLocalTracks(tracks)
            setUsers((previousUsers) => [ ...previousUsers, {
                uid,
                videoTrack,
                audioTrack,
            },])
            client.publish(tracks);
        })

       return () => {

            for (let localTrack of localTracks){
                localTrack.stop();
                localTrack.close();
            }
            client.off('user-published', handleUserJoined)
            client.off('user-left', handleUserLeft)

       }
        }
   ,[])

    return (<div>
        VideoRoom
        {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
        ))}
    </div>)
}

