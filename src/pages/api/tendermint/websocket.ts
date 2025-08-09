import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { Server } from 'http';
import { WebSocket } from 'ws';
import { parse } from 'url';

export default function handler(req: any, res: any) {
  // This is a WebSocket route, so we'll handle the upgrade manually
  if (req.headers.upgrade !== 'websocket') {
    res.status(400).send('Expected WebSocket upgrade');
    return;
  }

  // Get the WebSocket server instance or create a new one
  const wss = (res.socket as any).server.wss as WebSocketServer;
  
  if (!wss) {
    res.status(500).send('WebSocket server not initialized');
    return;
  }

  // Handle the WebSocket upgrade
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
    // Create a WebSocket connection to the Tendermint node
    const targetUrl = 'ws://localhost:26657/websocket';
    const tmWs = new WebSocket(targetUrl);

    // Forward messages from client to Tendermint
    ws.on('message', (data) => {
      if (tmWs.readyState === WebSocket.OPEN) {
        tmWs.send(data);
      }
    });

    // Forward messages from Tendermint to client
    tmWs.on('message', (data) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });

    // Handle connection close
    const closeConnection = () => {
      if (tmWs.readyState === WebSocket.OPEN) {
        tmWs.close();
      }
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };

    ws.on('close', closeConnection);
    tmWs.on('close', closeConnection);
    ws.on('error', closeConnection);
    tmWs.on('error', closeConnection);
  });
}

// Create WebSocket server if it doesn't exist
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize WebSocket server
const server = createServer();
const wss = new WebSocketServer({ noServer: true });

// Store the WebSocket server instance on the HTTP server
(server as any).wss = wss;

// Handle HTTP server upgrade requests
server.on('upgrade', (request, socket, head) => {
  const { pathname } = parse(request.url || '');
  
  if (pathname === '/api/tendermint/websocket') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Start the HTTP server
if (!process.env.WEBSOCKET_SERVER_STARTED) {
  server.listen(3005, () => {
    console.log('WebSocket proxy server running on port 3005');
  });
  process.env.WEBSOCKET_SERVER_STARTED = 'true';
}
