import tmi from 'tmi.js'
import TwitterClient from './twitterClient';

class TwitchClient {
  private channel: string = process.env.TWITCH_CHANNEL ?? '';
  private client = tmi.Client({
    options: {debug: true},
    connection: {
      reconnect: true,
      secure: true,
    },
    identity:{
      username: process.env.TWITCH_USERNAME ?? '',
      password: process.env.TWITCH_PASSWORD ?? '',
    },
    channels: [this.channel]
  });


  constructor(){
    this.client.connect().catch(console.error);

    this.client.on('connected', () => {
      this.client.say(this.channel, "Estou pronto para distribuir os pontos")
    })
  }

  public initialize(){
    this.client.on('message', async (channel, user, message, self) => {
      if(message.match("!givepoints")){
        const [, tweetId] = message.split(' ');

        if(self) return;

        if(user?.username !== this.channel){
          this.client.say(channel, "Você não tem permissão");
          return;
        }

        if(!tweetId){
          this.client.say(channel, "Você precisa informar o ID do Tweet");
        }else {
          const twitterClient = new TwitterClient();
          const nicknames = await twitterClient.readTweet(tweetId);
          this.givePoints(nicknames)
        }
      }
    })
  }

  private givePoints(nicknames: string[]) {
    for(const nickname of nicknames) {
      this.client.say(this.channel, `!addpoints ${nickname} 20`)
    }
  }
}

export default TwitchClient
