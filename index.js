const { readFileSync, writeFileSync } = require("fs");
const { homedir, platform } = require("os");
const { join } = require("path");
const terser = require("terser");

let channel = "";

if(process.argv.length > 2) {
    switch (process.argv[2]) {
        case "stable":
            channel = "";
        case "ptb":
            channel = "ptb";
        case "canary":
            channel = "canary";
        case "dev":
            channel = "development";
        case "development":
            channel = "development";
        default:
            channel = "";
    }
}

let settingsJson;
if(platform == 'win32') {
    settingsJson = join(homedir(), 'AppData', 'Roaming', `discord${channel}`, 'settings.json');
} else if(platform == 'linux') {
    settingsJson = join(homedir(), '.config', `discord${channel}`, 'settings.json');
} else if(platform == 'darwin') {
    settingsJson = join(homedir(), 'Library', 'Application Support', `discord${channel}`, 'settings.json');
}

let data = JSON.parse(readFileSync(settingsJson).toString());
console.time("minify");
terser.minify(readFileSync(join(__dirname, "openloader.js")).toString(), {
    keep_classnames: true,
    keep_fnames: true,
}).then(minified => {
    minified = minified.code;
    console.timeEnd("minify");
    data.openasar.js = minified;
    writeFileSync(settingsJson, JSON.stringify(data, undefined, "\t"));
    console.log("Done! You can now restart your Discord client.\nFully restart it by right clicking it in the system tray and clicking Quit.\n\n\nPress any key to exit the installer...");
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.setRawMode(true);
    process.stdin.on('data', () => process.exit(0));
});