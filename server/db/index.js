import EventEmitter from 'events';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'data.json');

class Database extends EventEmitter {
  constructor() {
    super();
    this.stories = new Map();
    this.pendingStories = new Map();
    this.sequence = 1;
    this.loadData();
  }

  // Load data from file
  async loadData() {
    try {
      const data = await fs.readFile(DB_FILE, 'utf8');
      const { stories, pendingStories, sequence } = JSON.parse(data);
      
      this.stories = new Map(stories);
      this.pendingStories = new Map(pendingStories);
      this.sequence = sequence;
      
      this.emit('change');
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error loading data:', error);
      }
      // If file doesn't exist, use empty state
      await this.saveData();
    }
  }

  // Save data to file
  async saveData() {
    try {
      const data = {
        stories: Array.from(this.stories.entries()),
        pendingStories: Array.from(this.pendingStories.entries()),
        sequence: this.sequence
      };
      
      await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Generate unique IDs
  generateId() {
    return `${Date.now()}_${this.sequence++}`;
  }

  // Stories
  getAllStories() {
    return Array.from(this.stories.values());
  }

  getAllPendingStories() {
    return Array.from(this.pendingStories.values());
  }

  async addPendingStory(story) {
    const id = this.generateId();
    const newStory = {
      ...story,
      id,
      time: Date.now() / 1000,
      score: 1,
      approved: false,
      isSiliconValley: false,
      upvotedBy: new Set() // Track who upvoted
    };
    
    this.pendingStories.set(id, newStory);
    this.emit('change');
    await this.saveData();
    return newStory;
  }

  async approveStory(id, isSiliconValley) {
    const story = this.pendingStories.get(id);
    if (story) {
      const approvedStory = { ...story, approved: true, isSiliconValley };
      this.stories.set(id, approvedStory);
      this.pendingStories.delete(id);
      this.emit('change');
      await this.saveData();
      return approvedStory;
    }
    return null;
  }

  async rejectStory(id) {
    const result = this.pendingStories.delete(id);
    if (result) {
      this.emit('change');
      await this.saveData();
    }
    return result;
  }

  async removeStory(id) {
    const storyRemoved = this.stories.delete(id);
    const pendingRemoved = this.pendingStories.delete(id);
    if (storyRemoved || pendingRemoved) {
      this.emit('change');
      await this.saveData();
    }
    return storyRemoved || pendingRemoved;
  }

  async upvoteStory(id, userId) {
    const story = this.stories.get(id);
    if (story) {
      // Check if user already upvoted
      if (!story.upvotedBy.has(userId)) {
        story.upvotedBy.add(userId);
        story.score += 1;
        this.stories.set(id, story);
        this.emit('change');
        await this.saveData();
        return story;
      }
    }
    return null;
  }

  // Get current state
  getState() {
    return {
      stories: this.getAllStories(),
      pendingStories: this.getAllPendingStories()
    };
  }
}

// Create singleton instance
const db = new Database();
export default db;