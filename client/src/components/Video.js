import React, { useRef, useEffect } from "react";

export default function Video(props) {
  const videoRef = useRef();

  useEffect(() => {
    if (props.peer) {
      console.log(props.peer.readable);
      console.log(props.peer);

      props.peer.on("stream", (stream) => {
        videoRef.current.srcObject = stream;
        console.log(videoRef.current.srcObject);
      });
      console.log(videoRef.current);
    }
  }, []);

  return (
    <video
      className="border-4 border-white h-fit w-fit"
      playsInline
      autoPlay
      ref={videoRef}
    />
  );
}
