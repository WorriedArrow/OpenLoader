import def from "./api/def";
import initMisc from "./init/misc";
import initUI from "./init/ui";
import load from "./loader";
import defWP, { WebpackModules as WPMods } from "./utils/webpack";

defWP();
export const OpenLoader = def();
export const DiscordNative = window["DiscordNative"];
export const WebpackModules = WPMods;

// Initialize everything
initMisc();
initUI();
load();