import React, { useRef, useEffect, useState } from "react";
import { RevolvingDot } from "react-loader-spinner";
export default function Video(props) {
  const [streamAvailable, setStreamAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef();

  useEffect(() => {
    const setStream = (stream) => {
      const videoElement = videoRef.current; // Store the current ref value
      if (videoElement && stream) {
        videoElement.srcObject = stream;
        setStreamAvailable(true);
        setLoading(false);
      }
    };

    if (props.peer) {
      props.peer.on("stream", (stream) => {
        setStream(stream);
      });
    }

    return () => {
      const videoElement = videoRef.current; // Use the ref value from the effect scope
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
  }, [props.peer]);

  return (
    <>
      {loading ? (
        <div className="flex border-white h-min">
          <RevolvingDot
            radius="45"
            strokeWidth="2"
            color="purple"
            secondaryColor="white"
            ariaLabel="revolving-dot-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : streamAvailable ? (
        <video
          style={{ height: "40%", width: "50%" }}
          className="border-4 border-white"
          playsInline
          autoPlay
          ref={videoRef}
        />
      ) : (
        <div>No video stream available</div>
      )}
    </>
  );
}
