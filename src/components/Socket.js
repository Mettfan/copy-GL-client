import io from 'socket.io-client';

let socketServer = io(process.env.PORT || "http://localhost:3001");

export default socketServer;

