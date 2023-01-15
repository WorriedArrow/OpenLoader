// LocalStorage fix - THANK YOU SO MUCH DUCKO!
function getLocalStoragePropertyDescriptor() {
    const e = document.createElement("frame");
    e.src = "about:blank",
    document.body.appendChild(e);
    let t = Object.getOwnPropertyDescriptor(e.contentWindow, "localStorage");
    return e.remove(),
    t
}
export default function load() {
    Object.defineProperty(window, "localStorage", getLocalStoragePropertyDescriptor() ?? new Storage());

    if(!localStorage.getItem("openloader")) localStorage.setItem("openloader", JSON.stringify({ plugins: [] }));

    for(var plugin of JSON.parse(localStorage.getItem("openloader") ?? "").plugins) {
        console.log("[OpenLoader] Loading plugin: " + plugin.name + " by " + plugin.author);
        new Function(plugin.code)()
    }
}