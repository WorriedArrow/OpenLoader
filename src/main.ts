import def from "./api/def";
import initMisc from "./init/misc";
import initUI from "./init/ui";
import load, { fixLocalStorage } from "./loader";
import defWP, { WebpackModules as WPMods } from "./utils/webpack";
import DiscordNative from "../types/discordNative";
import OpenLoaderNative from "../types/openLoaderNative";

// Initialize everything
fixLocalStorage();
export const OpenLoader = def();
load();
defWP();
initMisc();
initUI();

export const DiscordNative: DiscordNative = window["DiscordNative"];
export const WebpackModules = WPMods;
export const OpenLoaderNative: OpenLoaderNative = window["OpenLoaderNative"];