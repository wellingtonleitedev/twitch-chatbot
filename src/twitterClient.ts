import { TweetSearchRecentV2Paginator, TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';
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
  private invalidNicknames: string[] = [];

  public async readTweet (tweetId: string) {
    const quotes = await this.client.v2.search(`url:${tweetId}`);
    const replies = await this.client.v2.search(`conversation_id:${tweetId}`);

    while(!replies.done){
      await replies.fetchNext();
    }

    while(!quotes.done){
      await quotes.fetchNext();
    }

    await this.filterRepliesAndQuotes(replies);
    await this.filterRepliesAndQuotes(quotes);

    await this.saveInFile();

    return this.validNicknames;
  }

  private async filterRepliesAndQuotes(replies: TweetSearchRecentV2Paginator) {
    for (const tweet of replies.data.data) {
      const regex = new RegExp('\n', 'g');

      const nickname = tweet.text
        .replace(regex, ' ')
        .split(/\s/g)
        .filter(text => !text.match('@') && !text.match('https:') && text)
        .flat()

      const [nick] = nickname;
      const pushedNick = this.validNicknames
        .find(validNick =>  validNick?.toLowerCase() === nick?.toLowerCase());

      if (nickname.length === 1 && !pushedNick) {
        this.validNicknames.push(nick)
      } else {
        this.invalidNicknames.push(nickname.join(' '))
      }
    }
  }

  private async saveInFile(){
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
