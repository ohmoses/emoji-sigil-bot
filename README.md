# emoji-sigil-bot

Bot that tweets pretty emoji sigils every hour. Running at [@emojisigilbot](https://twitter.com/emojisigilbot).

## How can i repurpose this for my own post-once-every-\* bot?

In index.ts where it says `const status = generateSigil()`, substitute in your own function for generating the status (tweet).

Put the environment variables `API_KEY, API_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET` in a `.env` file in this folder or supply them when running the command. ([Here's how to get those](https://gist.github.com/ohmoses/d57dd3c530b8a7473da6c747d091015c) if your bot account is different than your dev account.)

`npm run build` to create an `out` folder with the transpiled JavaScript and then `npm run poast` to send tweet.

Then you can set up a cronjob (`crontab -e` in your terminal to open the jobs file). E.g. to poast every hour at half past, `30 * * * * cd <this folder> && npm run poast`.
