import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path'; // Import path module for file system operations
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Check if the public directory exists, if not create it
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Your existing routes
app.use(`/whitelists`, routes);

export default app;
