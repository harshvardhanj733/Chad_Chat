import React from "react";
import {
  FaRegWindowClose,
  FaTelegramPlane,
  FaWindowClose,
} from "react-icons/fa";
import heroImg from "../hero-imgg.png";
import heroImGG from "../home2.png";
import MovingComponent from "react-moving-text";
import MovingText from "react-moving-text";

// const options = {
//   particles: {
//     number: {
//       value: 100,
//       density: {
//         enable: true,
//         area: 800,
//       },
//     },
//     color: {
//       // value: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
//       value: ["#d2c2c2", "#8928a7", "#ffc107", "#9f35dc"],
//     },
//     shape: {
//       type: "circle",
//     },
//     size: {
//       value: 8,
//       random: {
//         enable: true,
//       },
//     },
//     links: {
//       color: "#ffffff",
//       distance: 150,
//       opacity: 0.5,
//     },
//     move: {
//       speed: 1,
//       outMode: "bounce",
//     },
//   },
//   interactivity: {
//     events: {
//       onHover: {
//         enable: true,
//         mode: "bubble",
//       },
//       onClick: {
//         enable: true,
//         mode: "push",
//       },
//       resize: true,
//     },
//   },
//   retina: {
//     detect: true,
//     pixelDensity: 10,
//   },
// };

const options = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        area: 8000,
      },
    },
    color: {
      value: "#2d1234",
    },
    shape: {
      type: "square",
    },
    size: {
      value: 2,
      random: {
        enable: true,
      },
    },
    move: {
      speed: 1,
      outMode: "bounce",
    },
    links: {
      color: "#2d1234",
      distance: 400,
      enable: true,
      opacity: 0.25,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  retina: {
    detect: true,
    pixelDensity: 2,
  },
};

const Letters = ["i", "c", "t", "i", "o", "n", "a", "r", "y"];
const Letters2 = ["a", "n", "g", "o", "u", "t"];
function Messaging({
  partiMap,
  name,
  room,
  messages,
  joined,
  joinRoom,
  handleDeletion,
  message,
  sendMessage,
  handleEnter,
  handleEnterRoom,
  setName,
  setRoom,
  setMessage,
  middleMessageContainerRef,
}) {
  return (
    <>
      <div
        className={`flex flex-col overflow-x-hidden justify-start ${
          !joined ? "lg:w-full" : "lg:w-1/3"
        }  items-center h-full`}
      >
        <div
          id="HeadRoomElement"
          className={`flex justify-start ${
            joined ? "hidden" : "z-10 block"
          } w-full gap-0 items-center h-[10vh] md:h-[10vh] bg-purple-50  px-2 sm:pl-6`}
        >
          {" "}
          <p className="font-bold  text-xl mr-10 md:mr-96">pH</p>
          <div className="py-1">
            {" "}
            <input
              className="p-2 bg-purple-100 placeholder-[#77009930] outline-[#770099] text-black border border-[#770099] w-28 sm:w-64"
              placeholder="Your name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              onKeyDown={handleEnterRoom}
            />
            <input
              className="p-2 bg-purple-100 placeholder-[#77009930] outline-[#770099] text-black border border-[#770099] w-24 mx-2"
              placeholder="Room No."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
              onKeyDown={handleEnterRoom}
            />
            <button
              className="border-2 border-[#770099] px-6 rounded-md py-2 hover:bg-[#770099] hover:text-white hover:border-white"
              onClick={joinRoom}
            >
              {" "}
              Join
            </button>
          </div>
          <p className="text-black ml-36 hidden md:block">
            Click anywhere to see magic !!
          </p>
        </div>

        <div
          id="HeadRoomElement"
          className={`flex relative font-semibold justify-around ${
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
          className={`w-full h-[92vh] bg-slate-950 flex flex-col sm:flex-row justify-center ${
            joined ? "hidden" : "block"
          } items-center pt-10 sm:pt-0 text-2xl  text-purple-50  font-mono text-center border-2 border-b-[#770099] border-l-slate-950`}
        >
          <div className="sm:w-3/4 text-4xl sm:text-6xl sm:px-4">
            <div className="z-0 absolute">
              {/* {!joined && (
                <Particles id="tsparticles" init={loadFull} options={options} />
              )} */}
            </div>
            <div className="z-20 relative flex font-mono justify-center">
              <strong>P</strong>
              {Letters.map((letter, index) => (
                <MovingComponent
                  type="rotateCW"
                  duration="200ms"
                  delay={`${index * 50}ms`}
                  direction="normal"
                  timing="linear"
                  iteration="2"
                  fillMode="none"
                >
                  {letter}
                </MovingComponent>
              ))}{" "}
              &nbsp; <strong>H</strong>{" "}
              {Letters2.map((letter, index) => (
                <MovingComponent
                  type="rotateCW"
                  duration="200ms"
                  delay={`${index * 50}ms`}
                  direction="normal"
                  timing="linear"
                  iteration="3"
                  fillMode="none"
                >
                  {letter}
                </MovingComponent>
              ))}
              <br />
            </div>

            <p className="text-sm mt-10 mx-12 text-purple-50 relative z-10">
              {" "}
              This is whimsical wonderland where art meets chatter and video
              calls get a twist! Ever wanted to chat, scribble, and connect with
              random friends? Get ready to unleash your creativity and chat up a
              storm while drawing your next masterpiece. Let's paint, prank, and
              have a blast together! Get set for a doodling adventure that'll
              make your imagination smile. Buckle up and let's get scribbling!
            </p>
          </div>
          <div className="sm:w-1/4 h-full sm:bg-[#770099] ">
            <img
              src={heroImGG}
              initial={{ y: -10 }}
              animate={{ y: 10 }}
              alt="someText"
              className="mx-auto h-96 mt-8 sm:h-5/8 sm:mt-28 scale-100 hover:scale-125 transition-transform sm:animate-bounce-slow 2s"
            />
          </div>
        </div>
        <div
          className={`w-full overflow-x-auto ${
            !joined ? "hidden" : "block"
          } bg-purple-300 h-[8vh] text-purple-950 pt-2 flex`}
        >
          {partiMap[room] &&
            partiMap[room].map((participant) => {
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
              value={message}
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
