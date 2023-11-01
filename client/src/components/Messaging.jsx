import React from "react";
import {
  FaRegWindowClose,
  FaTelegramPlane,
  FaWindowClose,
} from "react-icons/fa";
import heroImg from "../hero-imgg.png";
function Messaging({
  partiMap,
  name,
  room,
  messages,
  joined,
  joinRoom,
  handleDeletion,
  sendMessage,
  handleEnter,
  handleEnterRoom,
  setName,
  setRoom,
  setMessage,
  middleMessageContainerRef,
}) 
{

  return (
    <>
      <div
        className={`flex flex-col overflow-x-hidden justify-start ${
          !joined ? "lg:w-full" : "lg:w-1/3"
        }  items-center h-screen`}
      >
        <div
          id="HeadRoomElement"
          className={`flex justify-start ${
            joined ? "hidden" : "block"
          } w-full gap-0 items-center h-[15vh] bg-purple-900 px-2`}
        >
          {" "}
          <p className="font-bold text-white text-xl mr-10 md:mr-96">pH</p>
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
              className="p-2 outline-none w-24 mx-2"
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
            onClick={handleDeletion}
          >
            {" "}
            <FaRegWindowClose />
          </button>
        </div>
        <div
          className={`w-full h-[90vh] bg-purple-50 border-8 border-white flex flex-col sm:flex-row justify-center ${
            joined ? "hidden" : "block"
          } items-center pt-10 sm:pt-0 text-2xl  text-purple-900  font-mono text-center`}
        >
          <div className="sm:w-1/2 text-4xl sm:px-4">
            <div>
              Welcome to <strong>P</strong>ictionary<strong>H</strong>angout{" "}
              <br />
            </div>
            <p className="text-sm mt-10">
              {" "}
              This is whimsical wonderland where art meets chatter and video
              calls get a twist! Ever wanted to chat, scribble, and connect with
              random friends? Get ready to unleash your creativity and chat up a
              storm while drawing your next masterpiece. Let's paint, prank, and
              have a blast together! Get set for a doodling adventure that'll
              make your imagination smile. Buckle up and let's get scribbling!
            </p>
          </div>
          <div className="sm:w-1/2 h-full ">
            <img
              src={heroImg}
              alt="someText"
              className="mx-auto h-96 sm:h-5/6 sm:mt-10 hover:scale-125 transition-transform 0.2s"
            />
          </div>
        </div>
        <div
          className={`w-full overflow-x-auto ${
            !joined ? "hidden" : "block"
          } bg-purple-300 h-[8vh] text-purple-950 pt-2 flex`}
        >
          {partiMap[room] && partiMap[room].map((participant) => {
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
