import Client from "./client";
import DiscordWindow from "./discordWindow";
import StyleInjector from "./styleInjector";
import ComponentBuilder from "./componentBuilder";

import components from "./components";

/**
 * Defines the OpenLoader API object.
 */
function define() {
    return window["OpenLoader"] = {
        client: new Client(),
        window: new DiscordWindow(),
        styleInjector: new StyleInjector(),
        componentBuilder: new ComponentBuilder(),
        components: components
    };
}

export default define;