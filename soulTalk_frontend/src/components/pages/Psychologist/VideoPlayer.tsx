import React, { useEffect, useRef } from 'react'

export const VideoPlayer = ({user}: any) => {
    const ref = useRef<any>();

    useEffect(() => {
        user.videoTrack.play(ref.current)
    }, []);
    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 200px)'}}>
        Uid: {user.uid}
        <div ref={ref} style = {{width: '400px', height: '500px'}}></div>
    </div>
</div>)
}