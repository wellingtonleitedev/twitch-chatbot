import tmi from 'tmi.js'
import TwitterClient from './twitter.config';

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
      this.client.say(this.channel, "Estou para distribuir os pontos")
    })
  }

  public initialize(){
    this.client.on('message', async (channel, user, message, self) => {
      console.log({ channel, user, message, self });

      if(message.match("!givepoints")){
        const [, tweetId] = message.split(' ');

        if(!tweetId){
          this.client.say(channel, "Você precisa informar o ID do Tweet");
        }else {
          const twitterClient = new TwitterClient();
          const nicknames = await twitterClient.readTweet(tweetId);
          console.log({ nicknames });
        }
      }
    })
  }

  public givePoints(nicknames: string[]) {
    for(const nickname of nicknames) {
      this.client.say(this.channel, `Olá ${nickname}`)
    }
  }
}

export default TwitchClient