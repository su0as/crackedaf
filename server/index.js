import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './db/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ 
  server,
  path: '/ws'
});

app.use(cors());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  
  // Handle SPA routing
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
}

// Broadcast to all clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

// Listen for database changes
db.on('change', () => {
  broadcast({
    type: 'UPDATE',
    data: db.getState()
  });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial data to new client
  ws.send(JSON.stringify({
    type: 'INIT',
    data: db.getState()
  }));

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received:', data.type);

      switch (data.type) {
        case 'REQUEST_DATA':
          ws.send(JSON.stringify({
            type: 'INIT',
            data: db.getState()
          }));
          break;

        case 'ADD_STORY':
          await db.addPendingStory(data.story);
          break;

        case 'APPROVE_STORY':
          await db.approveStory(data.id, data.isSiliconValley);
          break;

        case 'REJECT_STORY':
          await db.rejectStory(data.id);
          break;

        case 'REMOVE_STORY':
          await db.removeStory(data.id);
          break;

        case 'UPVOTE_STORY':
          await db.upvoteStory(data.id, data.userId);
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});