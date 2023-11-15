import React, { useRef, useEffect } from "react";

export default function Video(props) {
  const videoRef = useRef();

  useEffect(() => {
    if (props.peer) {
      props.peer.on("stream", (stream) => {
        videoRef.current.srcObject = stream;
      });
    }
  }, [props.peer]);

  return (
    <video
      className="border-4 border-white h-full w-full"
      playsInline
      autoPlay
      ref={videoRef}
    />
  );
}
