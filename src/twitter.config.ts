import { TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';

class TwitterClient {
  private client: TwitterApiReadOnly = new TwitterApi({
    appKey: process.env.API_KEY ?? '',
    appSecret: process.env.API_KEY_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  }).readOnly
  private validNicknames: any = [];
  private invalidNicknames: any = [];

  public readTweet = async (tweetId: string) => {
    // const searched = await roClient.v2.search("url:1502270088090685448");
    const searched = await this.client.v2.search(`conversation_id:${tweetId}`);

    while(!searched.done){
      await searched.fetchNext();
    }

    for(const tweet of searched.data.data){
      const regex = new RegExp('\n', 'g');

      const nicknames = tweet.text
        .replace(regex, ' ')
        .split(/\s/g)
        .filter(text => !text.match('@') && !text.match('https:'))
        .flat()

      if(nicknames.length === 1){
        this.validNicknames.push(...nicknames)
      }else {
        this.invalidNicknames.push(nicknames)
      }
    }

    return this.validNicknames;
  }
}

export default TwitterClient
