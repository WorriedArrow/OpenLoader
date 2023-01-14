<div align="center"><img width="96" height="96" src="https://user-images.githubusercontent.com/81983357/205460116-462ec6c5-3954-41d2-9782-373ec5aa4a01.png" /><h1>OpenLoader</h1></div>

<div align="center">A plugin loader for Discord made possible by OpenAsar.</div><br><br>

> **Warning** OpenLoader is in **alpha**, and as such, you should not fully rely on it.

> **Note** Proper documentation coming soon.

## Installation
First, ensure you have [OpenAsar](https://openasar.dev) installed.

We recommend stable builds available [here](https://github.com/WorriedArrow/OpenLoader/releases/stable). These have been tested thoroughly and have been confirmed to work.<br>
If you want to use fresh, potentially buggy builds, they are available [here](https://github.com/WorriedArrow/OpenLoader/releases/nightly).
> **Warning** Nightly builds are **not** recommended for normal users, but they are generally fairly safe.


To install OpenLoader, follow these steps.

If you are on Windows, simply run the executable you downloaded.

If you are on Mac or Linux, however, you go to a terminal and navigate to where you downloaded OpenLoader. Then, run:
```
$ chmod +x openloader-mac
(mac)

$ chmod +x openloader-linux
(linux)
```
Then, you can run it by typing:
```
$ ./openloader-mac
(mac)

$ ./openloader-linux
(linux)
```

### Non-stable Discord release channels
If you want to install to a Discord release channel other than stable, you can run the executable you downloaded for your platform, supplying the channel as an argument.

For example,
```
$ ./openloader-linux canary
```
would install OpenLoader to Discord Canary.

(all options [here](https://github.com/WorriedArrow/OpenLoader/blob/develop/index.js#L8-L13))

## Building
### Prerequisites
- [NodeJS](https://nodejs.org) and [NPM](https://npmjs.org)
- the [pkg](https://npmjs.org/package/pkg) NPM package (installed globally with `npm install -g pkg`)

To build the OpenLoader installer, first go to the root of where you cloned this repo and install all packages by running:
```
$ npm install
```
Then, simply run:
```
$ npm run build
```
Then, the executables should be in `/dist`. Run your platform's executable to test your code out!

Alternatively, for quick testing, you can run `node .` in the root of where you cloned this repo.
This doesn't build executables, but it applies your modified OpenLoader code to Discord.

## Plugins
To make a plugin, you can put it in a `.plugin` file which holds a simple JSON format. Example plugin is below.
```json
{
    "author": "Arrow",
    "name": "My Plugin",
    "code": "console.log(\"Hello World!\")",
    "version": "1.0.0",
    "bannerUrl": "https://images.pexels.com/photos/5800782/pexels-photo-5800782.jpeg"
}
```
> **Note** You must transpile your code into a one-liner. I will make a script to do this soon, but for now, you can use any code minifier. Make sure, though, that you escape all backslashes and quotes.

### Plugin Structure

|Field|Type|Description|
|-|-|-|
|`author`|[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|The author of the plugin. Can have spaces/uppercase letters.|
|`bannerUrl`|[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|A URL to the banner image. Must use either HTTPS or a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs).|
|`code`|[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|The code of the plugin. Must be valid JavaScript code.|
|`name`|[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|The name of the plugin. Can have spaces/uppercase letters.|
|`version`|[`string`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|The version of the plugin. Can use any format, but [semver](https://semver.org) is strongly recommended and is used officially.|
