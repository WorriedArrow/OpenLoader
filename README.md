<h1 align="center">OpenLoader</h1>
A plugin loader for Discord made possible by OpenAsar.<br><br>

> **Warning** OpenLoader is in **alpha**, and as such, it is unstable.

> **Note** Proper documentation coming soon.

## Builds
There are nightly builds that you can download available [here](https://github.com/WorriedArrow/OpenLoader/releases/nightly).
As well as this, there are stable builds that you can download available [here](https://github.com/WorriedArrow/OpenLoader/releases/stable).

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
