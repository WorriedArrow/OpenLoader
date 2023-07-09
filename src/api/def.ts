import Client from "./client";
import ComponentBuilder from "./componentBuilder";
import DiscordWindow from "./discordWindow";
import Logger from "./logger"
import StyleInjector from "./styleInjector";

import components from "./components";
import settings from "./settingsManager";
import Assets from "./assets";

/**
 * Defines the OpenLoader API object.
 */
function define() {
    return window["OpenLoader"] = {
        client: new Client(),
        window: new DiscordWindow(),
        styleInjector: new StyleInjector(),
        componentBuilder: new ComponentBuilder(),
        logger: new Logger(),
        components: components,
        settings: settings,
        build: {
            version: {
                major: 0,
                minor: 3,
                patch: 1,
                get asStr() { return this.major + "." + this.minor + "." + this.patch; }
            },
            codename: "ValkyrieShadow"
        },
        assets: new Assets()
    };
}

export default define;