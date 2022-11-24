# YT-Exam
This repository uses **YouTube API to get the contents of the playlist and render** it on the screen.
# IMPORTANT
### Before running, you must modify some of the contents of 'next.config.js'.
> Replace the value of the apiKey(json object's key) with your own YouTube API Key.
```js
// next.config.js
const nextConfig  = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		apiBaseUrl: "https://www.googleapis.com/youtube/v3/playlistItems",
		apiKey: ""  //PLEASE EDIT HERE
	}
}
module.exports = nextConfig;
```

# How to Use
### First, run this command in Command Prompt(cmd in windows10).
``
yarn dev
``

### Second, Check the results by accessing the URL below.
> http://localhost:3000/yt-html?listId=YOUR_VIDEOLIST_ID


# License
MIT License.