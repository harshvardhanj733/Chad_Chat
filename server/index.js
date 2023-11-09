const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let participantMap = {};

io.on("connection", (socket) => {
  socket.emit("getId", socket.id);
  socket.on("join_room", ({ room, name }) => {
    // console.log(`${socket.id} joined room no. ${room}`);
    socket.join(room);
    socket.name = name;
    socket.room = room;
    socket.to(room).emit("newJoinee", {
      name,
      id: socket.id,
    });
    if (participantMap[room] === undefined) {
      participantMap[room] = [];
    }
    participantMap[room].push({
      name,
      id: socket.id,
    });
    io.to(room).emit("participantMap", participantMap);
    const peerMap = participantMap[room].filter((participant) => participant.id !== socket.id);
    socket.emit('peerMap', peerMap);
  });
 
  socket.on('sending_signal', payload => {
    console.log("Jisne signal bheja: "+payload.callerID+"\nKisko bhejna hai: "+payload.userToSignal)
    io.to(payload.userToSignal).emit('peer_joined', { signal: payload.signal, callerID: payload.callerID });
  })

  socket.on('returning_signal', payload => {
    console.log("Jisne Return Kiya: "+payload.id+"\nJisne Accept Kiya: "+payload.callerID)
    io.to(payload.callerID).emit('receiving_returned_signal', { signal: payload.signal, id: payload.id });
  })

  socket.on("wannaDisconnect", () => {
    const room = socket.room;
    const name = socket.name;
    let tempArr = participantMap[room];
    participantMap[room] = [];
    for (let i = 0; tempArr && i < tempArr.length; i++) {
      if (tempArr[i].id !== socket.id) {
        participantMap[room].push(tempArr[i]);
      }
    }
    let disconnectObj = {
      participantMap,
      id: socket.id,
      name,
    };
    socket.leave(room);
    io.to(room).emit("disconnectJoinee", disconnectObj);
  });

  socket.on("disconnect", () => {
    // Handle disconnection similar to 'wannaDisconnect' logic
    const room = socket.room;
    const name = socket.name;
    if (room !== undefined) {
      let tempArr = participantMap[room].filter(
        (participant) => participant.id !== socket.id
      );
      participantMap[room] = [];
      participantMap[room] = tempArr;
      let disconnectObj = {
        participantMap,
        id: socket.id,
        name
      };

      // Broadcast the disconnection event to all clients in the room
      socket.leave(room);
      io.to(room).emit("disconnectJoinee", disconnectObj);
    }
  });

  socket.on("send_message", (messageDetails) => {
    const { room, messageDeet } = messageDetails;
    socket.to(messageDetails.room).emit("receive_message", messageDetails);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
