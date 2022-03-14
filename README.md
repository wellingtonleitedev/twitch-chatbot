# Twitch Chat bot ![visitors](https://visitor-badge.laobi.icu/badge?page_id=wellingtonleitedev.twitch-chatbot)

### This bot is to help a streamer give points for users that retweeted his publications on Twitter so that they can participate in a giveaway. Is just a MVP, new features will come up soon.

These features will be develop live on Twitch: https://www.twitch.tv/wellios

## :information_source: How To Use

### First of all

You need to copy the `.env-example` into a `.env` and pass the API Keys

To get your Twitch Chat Password is easy

- Access this URL: https://twitchapps.com/tmi/
- Connect with your account
- Copy the OAuth Password generated and paste as your password in `.env`

To get you Twitter API Keys

- Access: https://developer.twitter.com/en
- Apply for a Developer Account (your twitter account should has phone number as Two Factor Authentication)
- After that you need to confirm trought the email that you received
- Create a new Project
- Then you should see this screen below
- Then copy your keys and paste in `.env` in its respective variables

<!-- ![image](https://user-images.githubusercontent.com/42186618/158093930-9306a0bb-649d-4d9c-ac61-80f17c18d47c.png) -->
<img align="center" width="50%" src="https://user-images.githubusercontent.com/42186618/158093930-9306a0bb-649d-4d9c-ac61-80f17c18d47c.png" />

To clone and run this application, you can use [Git](https://git-scm.com), [Node.js v14.15.4][nodejs] or higher + [Yarn v1.22.5][yarn] or higher installed on your computer.

On your command line:

```bash
# Clone this repository
$ git clone https://github.com/wellingtonleitedev/twitch-chatbot

# Go into the repository
$ cd twitch-chatbot

# if you have docker-compose install
# Run the application
$ docker-compose up -d --build

# if you don't have
# Install dependencies
$ yarn install

# Run the application
$ yarn start:dev
```

The bot is identifing only one command yet, but you can add as many as you want and change the response.

The bot receive a command `!givepoints ${tweet-id}` you need to change `${tweet-id}` for the id of the publication (a tweet id example below)

![image](https://user-images.githubusercontent.com/42186618/158092500-86420643-9f74-405e-8a57-187eac83ed0d.png)

## :bug: Issues

If you find any problems, feel free to report us with the respective title and description in the [issues][repo-issues] section. If you already know a solution to this problem, fork it and contribute, it will be a pleasure to review your pull request!

---------------------------------------------------------------------------------------

Made by Wellington Leite 👨‍💻 [Take a look!](https://www.linkedin.com/in/wellington-leite/)

[nodejs]: https://nodejs.org/
[yarn]: https://yarnpkg.com/
[vc]: https://code.visualstudio.com/
[repo-issues]: https://github.com/wellingtonleitedev/twitch-chatbot/issues
