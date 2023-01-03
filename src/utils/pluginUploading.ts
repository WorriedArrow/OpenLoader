import { fadeOut } from "./animations";
import addContent from "./pluginUI";
import { camelCase } from "./strings";

export function uploadPlugin(content: HTMLElement) {
    const element = document.createElement("input");
    element.type = "file";
    element.accept = ".plugin";
    element.click();
    element.onchange = async () => {
        const raw = await Array.from(element.files ?? [])[0].text();
        try {
            const parsed = JSON.parse(raw);
            definePlugin({ author: parsed.author, name: parsed.name, code: parsed.code, version: parsed.version, bannerUrl: parsed.bannerUrl });
        } catch(e) {
            console.error("[OpenLoader] Error parsing uploaded plugin.");
            console.log(e);
            let notif = document.querySelector(".ol-notif");
            (notif as HTMLElement).style.opacity = "1";
            (notif as HTMLElement).style.display = "block";
            (notif as HTMLElement).style.backgroundColor = "rgba(255, 0, 25, 0.35)";
            (notif as HTMLElement).style.boxShadow = "0px 0px 50px 0px rgba(255, 0, 25, 0.35)";
            (notif as HTMLElement).textContent = "Error: Incomplete plugin.";
            setTimeout(() => fadeOut((notif as HTMLElement)), 5500);
        }
        addContent(content);
    }
}

/**
 * 
 * @param plugin The plugin to define.
 * 
 * @example Defines a simple hello world plugin.
 * ```js
 * definePlugin({ author: 'Arrow', name: 'My Plugin', code: 'console.log("Hello World!")', version: '1.0.0' })
 * ```
 */
export function definePlugin(plugin: any) {
    if(!plugin.author || !plugin.name || !plugin.code || !plugin.version || !plugin) throw new Error("Incomplete plugin.");
    var id = camelCase(plugin.author.toLowerCase()) + "." + camelCase(plugin.name.toLowerCase());
    var modified = JSON.parse(localStorage.getItem("openloader") ?? "");
    modified.plugins.push({
        id: id,
        author: plugin.author,
        name: plugin.name,
        bannerUrl: plugin.bannerUrl ?? null,
        code: plugin.code,
        version: plugin.version,
    });
    localStorage.setItem("openloader", JSON.stringify(modified));
}