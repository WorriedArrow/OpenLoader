const { execSync } = require("child_process");
const { readFileSync, writeFileSync, existsSync, readdirSync, createWriteStream } = require("fs");
const { homedir } = require("os");
const { platform } = require("process");
const { join } = require("path");
const kpbn = require("kill-process-by-name");

let channel = "";

if(process.argv.length > 2) {
    if(process.argv[2] == "ptb") channel = "ptb";
    else if(process.argv[2] == "canary") channel = "canary";
    else if(process.argv[2] == "dev" || process.argv[2] == "development") channel = "development";
    else channel = "";
}

let settingsJson;
if(platform == 'win32') {
    settingsJson = join(homedir(), 'AppData', 'Roaming', `discord${channel}`, 'settings.json');
} else if(platform == 'linux') {
    settingsJson = join(homedir(), '.config', `discord${channel}`, 'settings.json');
} else if(platform == 'darwin') {
    settingsJson = join(homedir(), 'Library', 'Application Support', `discord${channel}`, 'settings.json');
}

console.log(settingsJson);

if(!existsSync(settingsJson)) {
    console.log("Error: No settings.json found. Please check that the client you selected is installed.");
    process.exit(1);
}

var minified = readFileSync(join(__dirname, "dist", "openloader.min.js")).toString();
// if(!data.openasar) {
//     console.log("Error: No OpenAsar found in your settings.json. Please install OpenAsar (https://openasar.dev) before attempting to install OpenLoader.");
//     process.exit(1);
// }
// data.openasar.js = minified;

let script;
let file;

if(platform == "win32") {
    const degradePath = (path, amount = 1) => {
        let segments = path.split('\\');
        segments[segments.length - 2] = segments[segments.length - 2].split('.').map((x, i) => i === 2 ? (parseInt(x) - amount) : x).join('.');
        return segments.join('\\');
    };
    const path = (process.env.LOCALAPPDATA + `\\Discord${channel}\\`) + readdirSync(process.env.LOCALAPPDATA + `\\Discord${channel}`).filter(m => m.startsWith("app-"))[0] + "\\resources"
    const oldPath = degradePath(path);
    script = `@echo off
    echo Closing Discord... (wait around 5 seconds)

    C:\\Windows\\System32\\TASKKILL.exe /f /im Discord${channel}.exe
    C:\\Windows\\System32\\TASKKILL.exe /f /im Discord${channel}.exe
    C:\\Windows\\System32\\TASKKILL.exe /f /im Discord${channel}.exe

    C:\\Windows\\System32\\TIMEOUT.exe /t 5 /nobreak

    echo Installing OpenLoader Native... (ignore any blue output flashes)
    copy /y "${path}\\app.asar" "${path}\\app.asar.backup"
    if exist "${path}\\_app.asar" copy /y "${path}\\_app.asar" "${path}\\app.asar.backup"
    if exist "${path}\\app.asar.orig" copy /y "${path}\\app.asar.orig" "${path}\\app.asar.backup"

    powershell -Command "Invoke-WebRequest https://github.com/WorriedArrow/OpenLoaderNative/releases/download/nightly/app.asar -OutFile \\"${path.replace('%localappdata%', '$Env:LOCALAPPDATA')}\\app.asar\\""

    if exist "${oldPath}\\app.asar" powershell -Command "Invoke-WebRequest https://github.com/WorriedArrow/OpenLoaderNative/releases/download/nightly/app.asar -OutFile \\"${oldPath.replace('%localappdata%', '$Env:LOCALAPPDATA')}\\app.asar\\""

    if exist "${path}\\_app.asar" powershell -Command "Invoke-WebRequest https://github.com/WorriedArrow/OpenLoaderNative/releases/download/nightly/app.asar -OutFile \\"${path.replace('%localappdata%', '$Env:LOCALAPPDATA')}\\_app.asar\\""
    if exist "${path}\\app.asar.orig" powershell -Command "Invoke-WebRequest https://github.com/WorriedArrow/OpenLoaderNative/releases/download/nightly/app.asar -OutFile \\"${path.replace('%localappdata%', '$Env:LOCALAPPDATA')}\\app.asar.orig\\""

    echo Opening Discord...
    start "" "%localappdata%\\Discord${channel}\\Update.exe" --processStart Discord${channel}.exe

    C:\\Windows\\System32\\TIMEOUT.exe /t 1 /nobreak

    echo.
    echo.
    echo OpenLoader Native should be installed!
    echo Not installed? Try restarting Discord, running the installer again, or if still not join our Discord server.
    echo.
    echo openloader.dev

    echo.
    pause
    `

    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    const filename = `ol-script-${genRanHex(12)}.bat`
    const scriptPath = join(process.env.TEMP, filename);

    writeFileSync(scriptPath, script);
    execSync("C:\\WINDOWS\\system32\\cmd.exe /c " + scriptPath);
} else if (platform == "linux") {
    const linuxSuffix = channel !== '' ? ('-' + channel) : '';
    for (const p of [ `/opt/discord${linuxSuffix}/resources/app.asar`, `/usr/lib/discord${linuxSuffix}/resources/app.asar`, `/usr/lib64/discord${linuxSuffix}/resources/app.asar`, `/usr/share/discord${linuxSuffix}/resources/app.asar`, `/var/lib/flatpak/app/com.discordapp.Discord${channel}/current/active/files/discord${linuxSuffix}/resources/app.asar`, `~/.local/share/flatpak/app/com.discordapp.Discord${channel}/current/active/files/discord${channel}/resources/app.asar` ]) {
        if(existsSync(p)) file = createWriteStream(p);
    }
} else if (platform == "darwin") {
    file = createWriteStream(`/Applications/Discord${channel}.app/Contents/Resources/app.asar`);
}

const finish = () => {
    let data = JSON.parse(readFileSync(settingsJson).toString());
    kpbn("discord");
    kpbn("discordptb");
    kpbn("discordcanary");
    kpbn("discorddevelopment");

    data.olNative = { code: minified, installed: true, preload: true };
    writeFileSync(settingsJson, JSON.stringify(data, undefined, "\t"));
    console.log("Done!");
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.setRawMode(true);
    process.stdin.on('data', () => process.exit(0));
}

if(platform !== "win32") {
    const https = require('https');
    https.get("https://github.com/WorriedArrow/OpenLoaderNative/releases/download/nightly/app.asar", res => {
        res.pipe(file);
        file.on("finish", () => {
            finish();
        });
    });
} else {
    finish();
}