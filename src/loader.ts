import { defaultSettings } from "./api/settingsManager";
import { OpenLoader } from "./main";

// LocalStorage fix - THANK YOU SO MUCH DUCKO!
function getLocalStoragePropertyDescriptor() {
    const e = document.createElement("frame");
    e.src = "about:blank",
    document.body.appendChild(e);
    let t = Object.getOwnPropertyDescriptor(e.contentWindow, "localStorage");
    return e.remove(),
    t
}

export function fixLocalStorage() {
    if(window.localStorage) return;
    Object.defineProperty(window, "localStorage", getLocalStoragePropertyDescriptor() ?? new Storage());
    if(!window.localStorage) fixLocalStorage();
}

export default function load() {
    fixLocalStorage();
    if(!localStorage.getItem("openloader")) localStorage.setItem("openloader", JSON.stringify({ plugins: [], settings: defaultSettings }));
    if(!JSON.parse(localStorage.getItem("openloader") || "").settings) localStorage.setItem("openloader", JSON.stringify({ ...JSON.parse(localStorage.getItem("openloader") || ""), settings: defaultSettings }));
    for(var plugin of JSON.parse(localStorage.getItem("openloader") || "").plugins) {
        OpenLoader.logger.logSpecial("Plugin Loader", "Loading plugin: " + plugin.name + " by " + plugin.author);
        new Function(plugin.code)()
    }
}