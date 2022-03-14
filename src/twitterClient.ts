import { TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';
import fs from 'fs';
import path from 'path';

class TwitterClient {
  private client: TwitterApiReadOnly = new TwitterApi({
    appKey: process.env.API_KEY ?? '',
    appSecret: process.env.API_KEY_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  }).readOnly
  private validNicknames: string[] = [];
  private invalidNicknames: any = [];

  public readTweet = async (tweetId: string) => {
    // const searched = await roClient.v2.search("url:1502270088090685448");
    const searched = await this.client.v2.search(`conversation_id:${tweetId}`);

    while(!searched.done){
      await searched.fetchNext();
    }

    for (const tweet of searched.data.data) {
      const regex = new RegExp('\n', 'g');

      const nickname = tweet.text
        .replace(regex, ' ')
        .split(/\s/g)
        .filter(text => !text.match('@') && !text.match('https:') && text)
        .flat()

      const [nick] = nickname;
      const pushedNick = this.validNicknames.find(validNick => validNick === nick);

      if (nickname.length === 1 && !pushedNick) {
        this.validNicknames.push(nick)
      } else {
        this.invalidNicknames.push(nickname.join(' '))
      }
    }

    this.saveInFile();

    return this.validNicknames;
  }

  private saveInFile(){
    const fetchedNicknames = {
      valid: {
        nicks: this.validNicknames,
        length: this.validNicknames.length,
      },
      invalid: {
        nicks: this.invalidNicknames,
        length: this.invalidNicknames.length,
      }
    }

    fs.writeFile(path.resolve(__dirname, '..', 'tmp', 'replies.json'),
      JSON.stringify(fetchedNicknames), err => {
        if(err) console.error({ err });
      });
  }
}

export default TwitterClient
