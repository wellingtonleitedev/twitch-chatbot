import dotenv from 'dotenv'
import TwitchClient from './twitch.config';

dotenv.config();

const twitchClient = new TwitchClient();

twitchClient.initialize();
