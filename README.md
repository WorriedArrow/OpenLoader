<h1 align="center">OpenLoader</h1>
A plugin loader for Discord made possible by OpenAsar.<br><br>

> **Warning** OpenLoader is in **alpha**, and as such, you should not fully rely on it.

> **Note** Proper documentation coming soon.

## Installation
First, ensure you have [OpenAsar](https://openasar.dev) installed.

We recommend stable builds available [here](https://github.com/WorriedArrow/OpenLoader/releases/stable). These have been tested thoroughly and have been confirmed to work.<br>
If you want to use fresh, potentially buggy builds, they are available [here](https://github.com/WorriedArrow/OpenLoader/releases/nightly).
> **Warning** Nightly builds are **not** recommended for normal users, but they are generally fairly safe.

To install OpenLoader, simply run the executable you downloaded for your platform. It's fairly quick to set up.

## Building
### Prerequisites
- [NodeJS](https://nodejs.org) and [NPM](https://npmjs.org)
- the [pkg](https://npmjs.org/package/pkg) NPM package (installed globally with `npm install -g pkg`)

To build the OpenLoader installer, simply go to the root of where you cloned this repo and run:
```
$ pkg .
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
