
import React, { useEffect, useRef, useState } from 'react';

export const VideoPlayer = ({ user, isVideoStopped }: any) => {
    const ref = useRef<any>();
    const [videoTrack, setVideoTrack] = useState<any>(null);

    useEffect(() => {
        user.videoTrack.play(ref.current);
        setVideoTrack(user.videoTrack);
    }, []);

    useEffect(() => {
        if (videoTrack) {
            if (isVideoStopped) {
                videoTrack.setEnabled(false);
            } else {
                videoTrack.setEnabled(true);
            }
        }
    }, [isVideoStopped]);

    return (
        <div style={{ display: 'flex', flexDirection: "row", gap: "10px" }}>
            Uid: {user.uid}
            <div ref={ref} style={{ width: '300px', height: '300px',borderRadius:"15px" }}></div>
        </div>
    );
};