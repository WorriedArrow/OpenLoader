const { readFileSync, writeFileSync, existsSync } = require("fs");
const { homedir, platform } = require("os");
const { join } = require("path");
const { buildSync } = require("esbuild");

module.exports = () => {
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

    let data = JSON.parse(readFileSync(settingsJson).toString());
    console.time("build");

    buildSync({
        entryPoints: [ join(require.main.path, "src", "entrypoint.ts") ],
        bundle: true,
        minify: false,
        treeShaking: false,
        platform: "neutral",
        format: "esm",
        target: "es2022",
        outfile: join(require.main.path, "dist", "openloader.js"),
    })

    buildSync({
        entryPoints: [ join(require.main.path, "src", "entrypoint.ts") ],
        bundle: true,
        minifyWhitespace: true,
        minifySyntax: true,
        minifyIdentifiers: false,
        treeShaking: false,
        platform: "neutral",
        format: "esm",
        target: "es2022",
        sourcemap: "external",
        outfile: join(require.main.path, "dist", "openloader.min.js"),
    })

    var minified = readFileSync(join(require.main.path, "dist", "openloader.min.js")).toString();
    console.timeEnd("build");
    // if(!data.openasar) {
    //     console.log("Error: No OpenAsar or OLNative found in your settings.json. Please install OpenAsar (https://openasar.dev, legacy) before attempting to install OpenLoader.");
    //     process.exit(1);
    // }
    if(data.olNative) data.olNative.code = minified; // New OLNative version
    else console.error("[WARN] No OLNative found. OL build was not added.");
    writeFileSync(settingsJson, JSON.stringify(data, undefined, "\t"));
    console.log("Done! You can now restart your Discord client.\nFully restart it by right clicking it in the system tray and clicking Quit.\n\n\nPress any key to exit the installer...");
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.setRawMode(true);
    process.stdin.on('data', () => process.exit(0));
}