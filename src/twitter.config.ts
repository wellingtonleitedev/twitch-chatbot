import { TwitterApi, TwitterApiReadOnly } from 'twitter-api-v2';

class TwitterClient {
  private client: TwitterApiReadOnly = new TwitterApi({
    appKey: process.env.API_KEY ?? '',
    appSecret: process.env.API_KEY_SECRET ?? '',
    accessToken: process.env.ACCESS_TOKEN ?? '',
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? '',
  }).readOnly
  private nicknames: any = []; // it will be string[] after filter the nicknames correctly

  public readTweet = async (tweetId: string) => {

    // const searched = await roClient.v2.search("url:1502270088090685448");
    const searched = await this.client.v2.search(`conversation_id:${tweetId}`);

    while(!searched.done){
      await searched.fetchNext();
    }

    for(const tweet of searched.data.data){
      /**
       * TODO filter only the nicknames and return them so that the twitch bot
       * can send a message on chat and give points
       */

      const nicknames = tweet.text
        .split(' ')
        .filter(text => !text.match('@'))

      this.nicknames.push(nicknames)
    }

    return this.nicknames;
  }
}

export default TwitterClient
