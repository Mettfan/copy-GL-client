import Socket from './Socket';

import React from 'react'
import socket from './Socket';

function Chat() {
    socket.emit('conectado', 'desde cliente');
  return (
    <div>Chat</div>
  )
}

export default Chat