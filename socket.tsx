
const io = require('socket.io-client');
// const ss =  require('socket.io-stream');
// const fs = require('fs');
const SOCKET_URI = "https://api.fortisab.com/"

const socket = io(SOCKET_URI,{
  transports:["polling", "websocket"]
});

export function startSocket() {
  if (!socket.connected) {
    socket.connect();
  } else {
    console.log('socket connection status: ', socket.connected);
  }
}


export function stopSocket() {
  if (socket.connected) {
    socket.disconnect();
    console.log('socket connected: ', socket.connected);
  } else {
    console.log('no active socket connection found');
  }
}

export default socket;