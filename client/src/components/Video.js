import React, { useRef, useEffect } from 'react';

export default function Video(props) {
  const videoRef = useRef();

  useEffect(() => {
    if (props.peer) {
      props.peer.on('stream', (stream) => {
        videoRef.current.srcObject = stream;
      });
    }
  }, [props.peer]);

  return (
    <video
      style={{ height: '40%', width: '50%' }}
      className='border-4 border-white'
      playsInline
      autoPlay
      ref={videoRef}
    />
  );
}
