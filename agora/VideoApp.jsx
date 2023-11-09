import { useState } from "react";
import VideoCall from "./VideoCall";

function VideoApp({room}) {
  const [inCall, setInCall] = useState(false);

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      // className="flex justify-center items-center"
    >
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <div className="w-min h-full ">
          {" "}
          <button
            onClick={() => setInCall(true)}
            className="sm:px-16 px-4 sm:mt-20 mt-40 w-max sm:ml-52 mx-12 py-8 rounded-lg hover:border-4 hover:border-white text-6xl hover:text-white bg-white text-purple-500 hover:bg-transparent"
          >
            Join Video
          </button>
        </div>
      )}
    </div>
  );
}

export default VideoApp;
