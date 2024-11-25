import express from 'express';
import { WebSocketServer } from 'ws';
import http from 'http';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

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

// In-memory store
let stories = [];
let pendingStories = [];

// Broadcast to all clients
function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial data to new client
  ws.send(JSON.stringify({
    type: 'INIT',
    data: { stories, pendingStories }
  }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Received:', data.type);

    switch (data.type) {
      case 'ADD_STORY':
        pendingStories = [data.story, ...pendingStories];
        break;
      case 'APPROVE_STORY':
        const story = pendingStories.find(s => s.id === data.id);
        if (story) {
          const approvedStory = { ...story, approved: true, isSiliconValley: data.isSiliconValley };
          stories = [approvedStory, ...stories];
          pendingStories = pendingStories.filter(s => s.id !== data.id);
        }
        break;
      case 'REJECT_STORY':
        pendingStories = pendingStories.filter(s => s.id !== data.id);
        break;
      case 'REMOVE_STORY':
        stories = stories.filter(s => s.id !== data.id);
        pendingStories = pendingStories.filter(s => s.id !== data.id);
        break;
      case 'UPVOTE_STORY':
        stories = stories.map(story => {
          if (story.id === data.id) {
            return { ...story, score: story.score + 1 };
          }
          return story;
        });
        break;
    }

    // Broadcast updated data to all clients
    broadcast({
      type: 'UPDATE',
      data: { stories, pendingStories }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});