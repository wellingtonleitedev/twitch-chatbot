import 'dotenv/config'
import path from 'path';
import express from 'express';
import routes from './routes';
import TwitchClient from './twitchClient';

const repliesFile = path.resolve(__dirname, '..', 'tmp', 'replies.json');

const twitchClient = new TwitchClient();
const app = express();

app.use(express.json());
app.use('/files', express.static(repliesFile));
app.use(routes);

twitchClient.initialize();

app.listen('3333')
