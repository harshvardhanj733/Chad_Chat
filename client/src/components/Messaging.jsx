import React from "react";
import {
  FaRegWindowClose,
  FaTelegramPlane,
  FaWindowClose,
} from "react-icons/fa";

function Messaging({
  participants,
  name,
  room,
  // message,
  messages,
  // myId,
  joined,
  joinRoom,
  handleDeletion,
  sendMessage,
  // scrollToBottom,
  handleEnter,
  handleEnterRoom,
  setName,
  setRoom,
  setMessage,
  middleMessageContainerRef,
}) {
  // const middleMessageContainerRef = useRef();

  return (
    <>
      <div
        className={`flex flex-col overflow-x-hidden justify-start w-screen ${
          !joined ? "lg:w-full" : "lg:w-1/3"
        }  items-center h-screen`}
      >
        <div
          id="HeadRoomElement"
          className={`flex justify-around ${
            joined ? "hidden" : "block"
          } w-full gap-0 items-center h-[10vh] bg-purple-900`}
        >
          {" "}
          <p className="font-bold text-white text-xl">pH</p>
          <div className="">
            {" "}
            <input
              className="p-2 outline-none w-28 sm:w-64"
              placeholder="Your name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              onKeyDown={handleEnterRoom}
            />
            <input
              className="p-2 outline-none w-24 mx-4"
              placeholder="Room No."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
              onKeyDown={handleEnterRoom}
            />
            <button
              className="bg-purple-100 px-6 rounded-md py-2 hover:bg-green-500"
              onClick={joinRoom}
            >
              {" "}
              Join
            </button>
          </div>
        </div>
        <div
          id="HeadRoomElement"
          className={`flex font-semibold justify-around ${
            !joined ? "hidden" : "block"
          } w-full gap-0 items-center h-[10vh] bg-purple-900 text-white`}
        >
          Hey {name}, welcome to Room {room} !
          <button
            className="text-3xl text-white rounded-md hover:text-red-500 pr-3"
            // onClick={() => {
            //   window.location.reload();
            // }}

            onClick={handleDeletion}
          >
            {" "}
            <FaRegWindowClose />
          </button>
        </div>
        <div
          className={`w-full h-full bg-purple-200 border-8 border-white flex justify-center ${
            joined ? "hidden" : "block"
          } items-center px-12 text-2xl sm:px-24 text-purple-900 sm:text-4xl font-mono`}
        >
          Join the room to unlock a world full of fun !
        </div>
        <div
          className={`w-full overflow-x-auto ${
            !joined ? "hidden" : "block"
          } bg-purple-300 h-[8vh] text-purple-950 pt-2 flex`}
        >
          {participants.map((participant) => {
            return <p>{participant.name},&nbsp;</p>;
          })}
        </div>

        <div
          ref={middleMessageContainerRef}
          id="MiddleMessageContainer"
          className={`flex flex-col text-gray-500 justify-start ${
            !joined ? "hidden" : "block"
          } w-full h-[72vh] overflow-x-auto overflow-y-scroll bg-white`}
        >
          {" "}
          {/* {participants.map((participant)=>(
          <p>{participant.name}   {participant.id}</p>
        ))} */}
          {messages.map((messageDeet) => (
            <div className="flex flex-col px-2 pt-2 gap-3">
              <div
                className={` flex flex-col ${
                  messageDeet.sent ? "items-end" : "items-start"
                }`}
              >
                {" "}
                <p className={`${messageDeet.sent ? "hidden" : "inline"}`}>
                  {/* {messageDeet.messengerId} */}
                  {messageDeet.name}
                </p>
                <h2
                  className={`font-bold text-xl font-mono ${
                    messageDeet.sent ? "text-red-800" : "text-blue-500"
                  }`}
                >
                  {messageDeet.message}
                </h2>
                <p className="text-xs">{messageDeet.messageTime}</p>
              </div>
            </div>
          ))}
        </div>
        {
          <div
            id="FooterSendElement"
            className={`w-full px-1  border-2 items-center ${
              !joined ? "hidden" : "block"
            }  bg-purple-50 py-4 flex justify-between h-[10vh]`}
          >
            <input
              className="w-full px-3 border-none outline-none bg-purple-50"
              placeholder="Message..."
              onChange={(a) => {
                setMessage(a.target.value);
              }}
              onKeyDown={handleEnter}
            />
            <button
              className="text-purple-900 hover:text-purple-400 text-3xl pr-3"
              onClick={sendMessage}
            >
              {" "}
              <FaTelegramPlane />
            </button>
          </div>
        }
      </div>
    </>
  );
}

export default Messaging;
