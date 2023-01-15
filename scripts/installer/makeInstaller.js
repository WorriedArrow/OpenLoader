const { buildSync } = require("esbuild");
const { execSync } = require("child_process");
const { join } = require("path");
const { writeFileSync, readFileSync } = require("fs");

module.exports = () => {
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

    console.timeEnd("build");

    writeFileSync(join(require.main.path, "index.js"), readFileSync(join(__dirname, "base.js")));

    console.time("package");

    execSync("cd \"" + require.main.path + "\" && npx pkg .");

    console.timeEnd("package");
}