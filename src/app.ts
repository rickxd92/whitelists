import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(`/whitelists`, routes);

export default app;
