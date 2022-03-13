import 'dotenv/config'
import express from 'express';
import routes from './routes';
import TwitchClient from './twitch.config';

const twitchClient = new TwitchClient();
const app = express();

app.use(express.json());
app.use(routes);

twitchClient.initialize();

app.listen('3333')
