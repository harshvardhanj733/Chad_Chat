import "./App.css";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import Messaging from "./components/Messaging";
import Canvas from "./components/Canvas";
import Board from "./components/Board";
import VideoApp from "./agora/VideoApp";
import Peer from 'simple-peer';
import Video from "./components/Video"

const socket = io.connect("http://localhost:3001");

function App() {
  //All Users State In a Room
  const [partiMap, setPartiMap] = useState({});

  //Name State
  const [name, setName] = useState("");
  // Room State
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  // Messages States
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Messenger State
  const [myId, setMyId] = useState("");
  const myRef = useRef();

  //Peers State
  const [peers, setPeers] = useState([])

  //Ref Variables
  const userVideo = useRef();
  const peersRef = useRef([]);
  const middleMessageContainerRef = useRef();

  const joinRoom = () => {
    console.log(myId);
    if (room !== "" && name !== "") {
      setJoined(true);
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        userVideo.current.srcObject = stream;
      })
      socket.emit("join_room", { room, name });
      alert(
        `Your Name is: ${name} ~ ${myId.substring(
          0,
          3
        )} and You have joined room ${room}`
      );

      socket.on('peerMap', (peerMap) => {
        const peers = [];
        console.log("Peer Map obtained is: "+peerMap);
        peerMap.forEach(peerInRoom => {
          console.log("My id while creating a connection : " + myId);
          const peer = createPeer(peerInRoom.id, myId, userVideo.current.srcObject);
          peersRef.current.push({
            peerID: peerInRoom.id,
            peer,
          })
          peers.push(peer);
        })
        setPeers(peers);
      })

      
    }
  };

  const handleDeletion = () => {
    console.log("Delete Button Clicked");
    socket.emit("wannaDisconnect");
    window.location.reload();
  };

  const sendMessage = () => {
    const date = new Date();
    const currentTime = date.getTime();
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    // Pad single-digit hours and minutes with leading zeros
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    console.log(formattedTime);

    let messageDeet = {
      message,
      name: `${name} ~ ${myId.substring(0, 3)}`,
      messageTime: formattedTime,
      sent: true,
    };
    setMessages((existingMessages) => {
      const updatedMessages = [...existingMessages, messageDeet];
      return updatedMessages;
    });

    const sendMessage = {
      messageDeet,
      room,
    };

    setMessage("");
    socket.emit("send_message", sendMessage);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Call handleDeletion when the page is about to unload (reload, close, etc.)
      handleDeletion();
    };

    // Attach the event listener to the beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    socket.on("getId", (id) => {
      setMyId(id);
      myRef.current = id;
    });
    console.log(myId)
  }, []);

  useEffect(() => {
    socket.on("receive_message", (messageDetails) => {
      messageDetails.messageDeet.sent = false; //You can change this and line number 33
      setMessages((existingMessages) => {
        const updatedMessages = [
          ...existingMessages,
          messageDetails.messageDeet,
        ];
        return updatedMessages;
      });
    });

    socket.on("newJoinee", ({ name, id }) => {
      alert(`New User Joined: ${name} ~ ${id.substring(0, 3)}`);
    });

    socket.on("participantMap", (participantMap) => {
      setPartiMap(participantMap);
    });

    socket.on("disconnectJoinee", (disconnectObj) => {
      alert(
        `User Disconnected: ${disconnectObj.name
        } ~ ${disconnectObj.id.substring(0, 3)}`
      );
      setPartiMap(disconnectObj.participantMap);
    });

    socket.on("peer_joined", payload => {
      console.log("My Id for add peer: "+myId);
      const peer = addPeer(payload.signal, payload.callerID, userVideo.current.srcObject, myRef.current);
      peersRef.current.push({
          peerID: payload.callerID,
          peer,
      })

      setPeers(users => [...users, peer]);
  });
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    const container = middleMessageContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  const handleEnterRoom = (e) => {
    if (e.key === "Enter") {
      joinRoom(e);
    }
  };

  function createPeer(userToSignal, callerID, stream) {
    // console.log("Called Id is : "+ callerID);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:global.stun.twilio.com:3478",
          },
        ],
      },
    });

    peer.on("signal", signal => {
      socket.emit("sending_signal", { userToSignal, callerID, signal })
    })

    socket.on("receiving_returned_signal", payload => {
      console.log("Peers Ref is: "+peersRef.current);
      console.log(payload);
      const item = peersRef.current.find(p => p.peerID === payload.id);
      console.log(item);
      if(item.peer){
        item.peer.signal(payload.signal);
      }
  });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream, id) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "stun:global.stun.twilio.com:3478",
          },
        ],
      },
    })

    peer.on("signal", signal => {
      socket.emit("returning_signal", { signal, callerID, id })
    })

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <div className="flex w-screen flex-col md:flex-row">
      <Messaging
        partiMap={partiMap}
        name={name}
        room={room}
        messages={messages}
        joined={joined}
        joinRoom={joinRoom}
        handleDeletion={handleDeletion}
        sendMessage={sendMessage}
        handleEnter={handleEnter}
        handleEnterRoom={handleEnterRoom}
        setName={setName}
        setRoom={setRoom}
        setMessage={setMessage}
        middleMessageContainerRef={middleMessageContainerRef}
      />{" "}
      <div
        className={`h-screen ${!joined ? "hidden" : "block"} w-full md:w-2/3 `}
      >
        <div className="h-1/2 w-full ">
          <Canvas />
        </div>
        <div className={`h-1/2 bg-gradient-to-r from-purple-400 to-purple-900`}>
           {/* <VideoApp />  */}
          <div style={{padding: "20px", display: "flex", height: "50vh", width: "66%", margin: "auto", flexWrap: "wrap"}}>
            <video style={{height: "40%", width: "50%"}} muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
