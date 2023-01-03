/**
 * OpenLoader 0.1.2
 * Copyright (c) 2022 WorriedArrow.
 *
 * Source: https://github.com/WorriedArrow/OpenLoader/
 */
var content; // weird fix

// Once-running things, checks in place in case it runs more than once
(function (){
var alreadyRun = false;

if(alreadyRun) return;

alreadyRun = true;

// Listen for Ctrl + Shift + R for complete relaunch
document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.shiftKey && event.code === "KeyR") {
        OpenLoader.client.relaunch();
    }
});

// LocalStorage fix - THANK YOU SO MUCH DUCKO!
function getLocalStoragePropertyDescriptor() {
    const frame = document.createElement('iframe');
    frame.src = 'about:blank';
  
    document.body.appendChild(frame);
  
    let r = Object.getOwnPropertyDescriptor(frame.contentWindow, 'localStorage');
  
    frame.remove();
  
    return r;
}

Object.defineProperty(window, 'localStorage', getLocalStoragePropertyDescriptor());

if(!localStorage.getItem("openloader")) localStorage.setItem("openloader", JSON.stringify({ plugins: [] }));

for(var plugin of JSON.parse(localStorage.getItem("openloader")).plugins) {
    console.log("[OpenLoader] Loading plugin: " + plugin.name + " by " + plugin.author);
    eval(plugin.code);
}

// Send a notification to the user saying that OpenLoader has loaded successfully.
var notif = document.createElement("div");
notif.style.position = "fixed";
notif.style.top = "48px";
notif.style.right = "16px";
notif.style.zIndex = "99999";
notif.style.setProperty("backdrop-filter", "blur(20px)");
notif.style.padding = "24px";
notif.style.color = "white";
notif.innerText = "OpenLoader loaded successfully.";
notif.style.boxShadow = "0px 0px 50px 0px rgba(0, 0, 0, 0.2)";
notif.style.borderRadius = "8px";
notif.classList.add("ol-notif")
document.body.appendChild(notif);
fadeIn(notif)
setTimeout(() => {
    fadeOut(notif);
}, 5500);


// Print welcome message to the console after 20 seconds.
setTimeout(() => console.log("%cWelcome to OpenLoader.", "font-size: 5rem; color: #5566ff"), 20000);

// Add OpenLoader version to the title bar
if(document.querySelector(".wordmark-2u86JB")) {
var e = document.createElement('span');
e.textContent = "| OpenLoader 0.1.2";
document.querySelector(".wordmark-2u86JB").appendChild(e);
document.querySelector(".wordmark-2u86JB").style.height = "32px";
document.querySelector(".wordmark-2u86JB").style.display = "flex";
document.querySelector(".wordmark-2u86JB").style.flexDirection = "row";
document.querySelector(".wordmark-2u86JB").style.gap = "3px";
document.querySelector(".wordmark-2u86JB").style.placeItems = "center";
document.querySelector(".wordmark-2u86JB").style.fontSize = "unset";


// Modify the titlebar to fit OpenLoader text
document.querySelector(".winButtonClose-3Q8ZH5").style.marginRight = "6px";
document.querySelectorAll(".winButton-3UMjdg").forEach(element => element.style.top = "-2px");
document.querySelector(".withFrame-2dL45i").style.height = "32px";
document.querySelector(".withFrame-2dL45i").style.display = "flex";
document.querySelector(".withFrame-2dL45i").style.placeItems = "center";
}

// Set up "Plugins" button injection in the User Settings menu
var pluginsDisplayed = false;
setInterval(() => {
    const whatsNewText = [...document.querySelectorAll('.item-3XjbnG')].find(x => x.textContent == ("What's New"));
    if(!whatsNewText) return;
    if(!document.querySelector(".ol-plugins-button")) pluginsDisplayed = false;
    // The separator right above the What's New button in the settings menu.
    const sep = document.querySelector('.sidebarRegion-1VBisG nav div div:nth-child(' + Array.from(whatsNewText.parentNode.children).indexOf(whatsNewText) + ')');
    if(!sep) {
        pluginsDisplayed = false;
        return;
    }
    if(pluginsDisplayed) return;
    var separator = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.separator);
    var header = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.header, { text: "OpenLoader" });
    var itemClick = () => {
        sep.parentNode.childNodes.forEach(node => node.classList.remove("selected-g-kMVV"));
        item.classList.add("selected-g-kMVV");

        // Load plugins page
        document.querySelector(".contentColumn-1C7as6").childNodes.forEach(e2 => e2.style.display = "none");
        var wrapper = document.createElement("div");
        wrapper.classList.add("ol-page");
        var head = document.createElement("div");
        head.innerHTML = '<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%"><div class="sectionTitle-3j2YI1" style="flex-direction: column"><h3 class="h5-2RwDNl title-3hptVQ marginBottom8-emkd0_">OpenLoader</h3><h2 class="h1-34Txb0 title-3hptVQ defaultColor-2cKwKo defaultMarginh1-EURXsm" id="uid_123">Plugins</h2></div><div style="fill: var(--text-normal); cursor: pointer" onclick="uploadPlugin()"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg></div></div>';
        head.classList.add("sectionTitle-3j2YI1");
        content = document.createElement("div");
        content.style.display = "grid";
        content.style.gridTemplateColumns = "1fr 1fr 1fr";
        content.style.rowGap = "44px";
        content.classList.add("children-1xdcWE");
        wrapper.appendChild(head);
        wrapper.appendChild(content);
        document.querySelector(".contentColumn-1C7as6").appendChild(wrapper);
        addContent();
    }
    var item = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "Plugins", onclick: itemClick });
    item.classList.add("ol-plugins-button");
    var reloadItem = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "Reload", onclick: () => location.reload() });
    sep.parentNode.childNodes.forEach(node => {
        if(node.classList.contains("info-3pQQBb") || node.classList.contains("socialLinks-3ywLUf") || node.classList.contains("separator-2wx7h6") || node.classList.contains("header-2Kx1US")) return;
        node.onclick = () => {
            item.classList.remove("selected-g-kMVV");
            node.classList.add("selected-g-kMVV");
            document.querySelectorAll(".ol-page").forEach(elem => elem.remove());
            // Fix for going from x menu item to plugins back to x menu item, therefore
            // reloading the content of x menu item since OL does not fully reload the
            // content, rather sets the native content to be invisible and adds its own
            // content.
            document.querySelector(".contentColumn-1C7as6").childNodes.forEach(e2 => e2.style.display = "block");
        }
    });
    sep.parentNode.insertBefore(separator, sep);
    sep.parentNode.insertBefore(header, sep);
    sep.parentNode.insertBefore(item, sep);
    sep.parentNode.insertBefore(reloadItem, sep);
    pluginsDisplayed = true;
}, 500)
})();

function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.2;
    }, 10);
}

function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.2;
    }, 50);
}

function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index)
    {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function removeAllChildren(element) {
    if(element.childNodes.length == 0) return;
    element.childNodes.forEach(node => node.remove());
    if(element.childNodes.length > 0) removeAllChildren(element); // fix for some weird behavior that makes it so sometimes elements aren't removed
}

function addContent(content) {
    var plugins = JSON.parse(localStorage.getItem("openloader")).plugins;
    removeAllChildren(content);
    if(plugins.length == 0) {
        var elem = OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.text, { text: "Oh no, looks like you don't have any plugins! Add one using the + button." })
        content.style.display = "block";
        content.appendChild(elem);
        return;
    }
    content.style.display = "grid";
    for(var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i];
        var elem = document.createElement("div");
        elem.style.borderRadius = "8px";
        elem.style.backgroundColor = "#222";
        elem.style.width = "10vw";
        elem.style.height = "25vh";
        elem.style.position = "relative";
        elem.style.display = "flex";
        elem.style.flexDirection = "column";
        elem.style.justifyContent = "space-between";
        elem.style.alignItems = "center";
        elem.style.overflow = "hidden";
        elem.style.maxWidth = "175px";
        elem.style.maxHeight = "235px";
        elem.style.minWidth = "150px";
        elem.style.minHeight = "210px";
        elem.dataset.plugin = i;
        let svgWrapper = document.createElement("div");
        svgWrapper.style.position = "absolute";
        svgWrapper.style.top = "8px";
        svgWrapper.style.right = "-32px";
        svgWrapper.style.color = "#c72d3b";
        svgWrapper.style.cursor = "pointer";
        svgWrapper.style.transition = "right 0.35s ease-in-out, color 0.35s ease-in-out";
        svgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"></path></svg>';
        svgWrapper.onclick = () => {
            var patched = JSON.parse(localStorage.getItem('openloader'));
            patched.plugins.splice(elem.dataset.plugin, 1);
            localStorage.setItem("openloader", JSON.stringify(patched));
            addContent();
        }
        svgWrapper.querySelector('svg').onmouseenter = () => svgWrapper.style.color = "#941f2a";
        svgWrapper.querySelector('svg').onmouseleave = () => svgWrapper.style.color = "#c72d3b";
        elem.onmouseenter = () => svgWrapper.style.right = "8px";
        elem.onmouseleave = () => svgWrapper.style.right = "-32px";
        var bgImage = document.createElement("div");
        bgImage.style.width = "100%";
        bgImage.style.height = "40%";
        bgImage.style.backgroundImage = "url(" + (plugin.bannerUrl ?? "https://assets.worriedarrow.xyz/plug.png") + ")";
        bgImage.style.backgroundPositionX = "center";
        bgImage.style.backgroundPositionY = "center";
        var name = document.createElement("div");
        name.style.color = "#eee";
        name.style.paddingTop = "16px";
        name.style.textAlign = "center";
        name.textContent = plugin.name;
        var author = document.createElement("div");
        author.style.marginTop = "12px";
        author.style.color = "#999";
        author.style.textAlign = "center";
        author.classList.add("h5-2RwDNl");
        author.classList.add("title-3hptVQ");
        author.textContent = "by " + plugin.author;
        var version = document.createElement("div");
        version.style.color = "#999";
        version.style.padding = "16px";
        version.style.textAlign = "center";
        version.style.fontFamily = "var(--font-headline)";
        version.style.textTransform = "uppercase";
        version.style.fontWeight = "bold";
        version.textContent = plugin.version;
        elem.appendChild(svgWrapper);
        elem.appendChild(bgImage);
        elem.appendChild(name);
        elem.appendChild(author);
        elem.appendChild(version);
        content.appendChild(elem);
    }
}

function uploadPlugin() {
    const element = document.createElement("input");
    element.type = "file";
    element.accept = ".plugin";
    element.click();
    element.onchange = async () => {
        const raw = await Array.from(element.files)[0].text();
        try {
            const parsed = JSON.parse(raw);
            definePlugin({ author: parsed.author, name: parsed.name, code: parsed.code, version: parsed.version, bannerUrl: parsed.bannerUrl });
        } catch(e) {
            console.error("[OpenLoader] Error parsing uploaded plugin.");
            console.log(e);
            let notif = document.querySelector(".ol-notif");
            notif.style.opacity = "1";
            notif.style.display = "block";
            notif.style.backgroundColor = "rgba(255, 0, 25, 0.35)";
            notif.style.boxShadow = "0px 0px 50px 0px rgba(255, 0, 25, 0.35)";
            notif.textContent = "Error: Incomplete plugin.";
            setTimeout(() => fadeOut(notif), 5500);
        }
        addContent();
    }
}

/**
 * 
 * @param {Object} plugin The plugin to define.
 * 
 * @example Defines a simple hello world plugin.
 * ```js
 * definePlugin({ author: 'Arrow', name: 'My Plugin', code: 'console.log("Hello World!")', version: '1.0.0' })
 * ```
 */
function definePlugin(plugin) {
    if(!plugin.author || !plugin.name || !plugin.code || !plugin.version || !plugin) throw new Error("Incomplete plugin.");
    var id = camelCase(plugin.author.toLowerCase()) + "." + camelCase(plugin.name.toLowerCase());
    var modified = JSON.parse(localStorage.getItem("openloader"));
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


class Client {
    /**
     * Completely relaunches the client.
     */
    relaunch() {
        DiscordNative.remoteApp.relaunch();
    }
}

class DiscordWindow {
    /**
     * Minimizes the window.
     */
    minimize() {
        DiscordNative.window.minimize();
    }
    /**
     * Restores the window, reopening the window if it is closed.
     */
    restore() {
        DiscordNative.window.restore();
    }
    /**
     * Maximizes the window, restoring if it is minimized and reopening the window if it is closed.
     */
    maximize() {
        DiscordNative.window.maximize();
    }
    /**
     * Closes the window, remains in system tray.
     */
    close() {
        DiscordNative.window.close();
    }
}

class StyleInjector {
    /**
     * Injects `css` into the Discord client.
     * @param {String} css the CSS to be injected. 
     */
    inject(css) {
        var element = document.createElement("style");
        element.textContent = css;
        document.head.appendChild(element);
    }
}


class ComponentBuilder {
    createComponent(component, options = {}) {
        if(!component) throw new Error("Unknown component: " + component);
        return component(options);
    }
    createMethod(category, methodName, method, createCategory = true) {
        if(!OpenLoader.components[category] && !createCategory) throw new Error("Category not found: " + category + ". Please use createCategory = true to automatically create the category.");
        if(!OpenLoader.components[category]) OpenLoader.components[category] = {};
        OpenLoader.components[category][methodName] = method;
    }
    parseHTML(html, fragment = false) {
        const template = document.createElement("template");
        template.innerHTML = html;
        const node = template.content.cloneNode(true);
        if (fragment) return node;
        return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
    }
}

/**
 * The OpenLoader API object.
 */
const OpenLoader = {
    client: new Client(),
    window: new DiscordWindow(),
    styleInjector: new StyleInjector(),
    componentBuilder: new ComponentBuilder(),
    components: {
        generic: {
            text: options => {
                var base = document.createElement("div");
                base.classList.add("description-30xx7u");
                base.textContent = options.text;
                return base;
            },
        },
        settingsMenu: {
            separator: () => {
                var base = document.createElement("div");
                base.classList.add("separator-2wx7h6");
                return base;
            },
            header: options => {
                var base = document.createElement("div");
                base.classList.add("header-2Kx1US");
                var headerContent = document.createElement("div");
                headerContent.classList.add("eyebrow-Ejf06y");
                headerContent.textContent = options.text;
                base.appendChild(headerContent);
                return base;
            },
            item: options => {
                var base = document.createElement("div");
                base.classList.add("item-3XjbnG");
                base.classList.add("themed-2-lozF");
                base.textContent = options.text;
                base.onclick = options.onclick;
                return base;
            }
        }
    },
    queries: {
        generic: {
            layerContainer: () => document.querySelector(".layerContainer-2v_Sit"),
        }
    }
}

// Require syntax
var imports = {}

function _reqInternal(id) {
    return imports[id]
}
/**
 * Requires the specified module.
 * @param {String} id 
 * @returns The module, or null if the module does not exist.
 */
function require(id) {
    return _reqInternal(id) ? _reqInternal(id).default ?? null : null
}

function _expInternal(id, content) {
    imports[id] = content
}

function exportRequire(id, def) {
    if(_reqInternal(id)) throw new Error("Already defined.")
    _expInternal(id, {
        default: def
    })
}

/**
 * The following code has been created by the wonderful team at BetterDiscord.
 * 
 * Check out their mod [here](https://betterdiscord.app)
 */
class Filters {
    static byProps(props, filter = m => m) {
        return module => {
            if (!module) return false;
            if (typeof(module) !== "object" && typeof(module) !== "function") return false;
            const component = filter(module);
            if (!component) return false;
            for (let p = 0; p < props.length; p++) {
                if (!(props[p] in component)) return false;
            }
            return true;
        };
    }

    static byPrototypeFields(fields, filter = m => m) {
        return module => {
            if (!module) return false;
            if (typeof(module) !== "object" && typeof(module) !== "function") return false;
            const component = filter(module);
            if (!component) return false;
            if (!component.prototype) return false;
            for (let f = 0; f < fields.length; f++) {
                if (!(fields[f] in component.prototype)) return false;
            }
            return true;
        };
    }

    static byRegex(search, filter = m => m) {
        return module => {
            const method = filter(module);
            if (!method) return false;
            let methodString = "";
            try {methodString = method.toString([]);}
            catch (err) {methodString = method.toString();}
            return methodString.search(search) !== -1;
        };
    }

    static byStrings(...strings) {
        return module => {
            if (!module?.toString || typeof(module?.toString) !== "function") return; 
            let moduleString = "";
            try {moduleString = module?.toString([]);}
            catch (err) {moduleString = module?.toString();}
            if (!moduleString) return false; 
            for (const s of strings) {
                if (!moduleString.includes(s)) return false;
            }
            return true;
        };
    }

    static byDisplayName(name) {
        return module => {
            return module && module.displayName === name;
        };
    }

    static combine(...filters) {
        return module => {
            return filters.every(filter => filter(module));
        };
    }
}


const hasThrown = new WeakSet();

const wrapFilter = filter => (exports, module, moduleId) => {
    try {
        if (exports?.default?.remove && exports?.default?.set && exports?.default?.clear && exports?.default?.get && !exports?.default?.sort) return false;
        if (exports.remove && exports.set && exports.clear && exports.get && !exports.sort) return false;
        if (exports?.default?.getToken || exports?.default?.getEmail || exports?.default?.showToken) return false;
        if (exports.getToken || exports.getEmail || exports.showToken) return false;
        return filter(exports, module, moduleId);
    }
    catch (err) {
        hasThrown.add(filter);
        return false;
    }
};

class WebpackModules {
    static find(filter, first = true) {return this.getModule(filter, {first});}
    static findAll(filter) {return this.getModule(filter, {first: false});}
    static findByUniqueProperties(props, first = true) {return first ? this.getByProps(...props) : this.getAllByProps(...props);}
    static findByDisplayName(name) {return this.getByDisplayName(name);}
    static getModule(filter, options = {}) {
        const {first = true, defaultExport = true, searchExports = false} = options;
        const wrappedFilter = wrapFilter(filter);
        const modules = this.getAllModules();
        const rm = [];
        const indices = Object.keys(modules);
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const {exports} = module;
            if (!exports || exports === window || exports === document.documentElement) continue;
            if (typeof(exports) === "object" && searchExports) {
                for (const key in exports) {
                    let foundModule = null;
                    const wrappedExport = exports[key];
                    if (!wrappedExport) continue;
                    if (wrappedFilter(wrappedExport, module, index)) foundModule = wrappedExport;
                    if (!foundModule) continue;
                    if (first) return foundModule;
                    rm.push(foundModule);
                }
            }
            else {
                let foundModule = null;
                if (exports.Z && wrappedFilter(exports.Z, module, index)) foundModule = defaultExport ? exports.Z : exports;
                if (exports.ZP && wrappedFilter(exports.ZP, module, index)) foundModule = defaultExport ? exports.ZP : exports;
                if (exports.__esModule && exports.default && wrappedFilter(exports.default, module, index)) foundModule = defaultExport ? exports.default : exports;
                if (wrappedFilter(exports, module, index)) foundModule = exports;
                if (!foundModule) continue;
                if (first) return foundModule;
                rm.push(foundModule);
            }
        }
        return first || rm.length == 0 ? undefined : rm;
    }

    static getBulk(...queries) {
        const modules = this.getAllModules();
        const returnedModules = Array(queries.length);
        const indices = Object.keys(modules);
        for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            if (!modules.hasOwnProperty(index)) continue;
            const module = modules[index];
            const {exports} = module;
            if (!exports || exports === window || exports === document.documentElement) continue;
            for (let q = 0; q < queries.length; q++) {
                const query = queries[q];
                const {filter, first = true, defaultExport = true, searchExports = false} = query;
                if (first && returnedModules[q]) continue; 
                if (!first && !returnedModules[q]) returnedModules[q] = []; 
                const wrappedFilter = wrapFilter(filter);
                if (typeof(exports) === "object" && searchExports) {
                    for (const key in exports) {
                        let foundModule = null;
                        const wrappedExport = exports[key];
                        if (!wrappedExport) continue;
                        if (wrappedFilter(wrappedExport, module, index)) foundModule = wrappedExport;
                        if (!foundModule) continue;
                        if (first) returnedModules[q] = foundModule;
                        else returnedModules[q].push(foundModule);
                    }
                }
                else {
                    let foundModule = null;
                    if (exports.Z && wrappedFilter(exports.Z, module, index)) foundModule = defaultExport ? exports.Z : exports;
                    if (exports.ZP && wrappedFilter(exports.ZP, module, index)) foundModule = defaultExport ? exports.ZP : exports;
                    if (exports.__esModule && exports.default && wrappedFilter(exports.default, module, index)) foundModule = defaultExport ? exports.default : exports;
                    if (wrappedFilter(exports, module, index)) foundModule = exports;
                    if (!foundModule) continue;
                    if (first) returnedModules[q] = foundModule;
                    else returnedModules[q].push(foundModule);
                }
            }
        }
        return returnedModules;
    }
    static getModules(filter) {return this.getModule(filter, {first: false});}
    static getByDisplayName(name) {
        return this.getModule(Filters.byDisplayName(name));
    }
    static getByRegex(regex, first = true) {
        return this.getModule(Filters.byRegex(regex), {first});
    }
    static getByPrototypes(...prototypes) {
        return this.getModule(Filters.byPrototypeFields(prototypes));
    }
    static getAllByPrototypes(...prototypes) {
        return this.getModule(Filters.byPrototypeFields(prototypes), {first: false});
    }
    static getByProps(...props) {
        return this.getModule(Filters.byProps(props));
    }
    static getAllByProps(...props) {
        return this.getModule(Filters.byProps(props), {first: false});
    }
    static getByString(...strings) {
        return this.getModule(Filters.byStrings(...strings));
    }
    static getAllByString(...strings) {
        return this.getModule(Filters.byStrings(...strings), {first: false});
    }
    static getLazy(filter, options = {}) {
        const {signal: abortSignal, defaultExport = true, searchExports = false} = options;
        const fromCache = this.getModule(filter, {defaultExport, searchExports});
        if (fromCache) return Promise.resolve(fromCache);
        const wrappedFilter = wrapFilter(filter);
        return new Promise((resolve) => {
            const cancel = () => this.removeListener(listener);
            const listener = function(exports) {
                if (!exports || exports === window || exports === document.documentElement) return;
                let foundModule = null;
                if (typeof(exports) === "object" && searchExports) {
                    for (const key in exports) {
                        foundModule = null;
                        const wrappedExport = exports[key];
                        if (!wrappedExport) continue;
                        if (wrappedFilter(wrappedExport)) foundModule = wrappedExport;
                    }
                }
                else {
                    if (exports.Z && wrappedFilter(exports.Z)) foundModule = defaultExport ? exports.Z : exports;
                    if (exports.ZP && wrappedFilter(exports.ZP)) foundModule = defaultExport ? exports.ZP : exports;
                    if (exports.__esModule && exports.default && wrappedFilter(exports.default)) foundModule = defaultExport ? exports.default : exports;
                    if (wrappedFilter(exports)) foundModule = exports;
                }
                if (!foundModule) return;
                cancel();
                resolve(foundModule);
            };
            this.addListener(listener);
            abortSignal?.addEventListener("abort", () => {
                cancel();
                resolve();
            });
        });
    }
    static get require() {
        if (this._require) return this._require;
        const id = "ol-webpackmodules";
        let __discord_webpack_require__;
        if (typeof(webpackJsonp) !== "undefined") {
            __discord_webpack_require__ = window.webpackJsonp.push([[], {
                [id]: (module, exports, __internal_require__) => module.exports = __internal_require__
            }, [[id]]]);
        }
        else if (typeof(window[this.chunkName]) !== "undefined") {
            window[this.chunkName].push([[id], 
                {},
                __internal_require__ => __discord_webpack_require__ = __internal_require__
            ]);
        }

        delete __discord_webpack_require__.m[id];
        delete __discord_webpack_require__.c[id];
        return this._require = __discord_webpack_require__;
    }
    static getAllModules() {
        return this.require.c;
    }
    static get chunkName() {return "webpackChunkdiscord_app";}
    static initialize() {
        this.handlePush = this.handlePush.bind(this);
        this.listeners = new Set();
        this.__ORIGINAL_PUSH__ = window[this.chunkName].push;
        Object.defineProperty(window[this.chunkName], "push", {
            configurable: true,
            get: () => this.handlePush,
            set: (newPush) => {
                this.__ORIGINAL_PUSH__ = newPush;
                Object.defineProperty(window[this.chunkName], "push", {
                    value: this.handlePush,
                    configurable: true,
                    writable: true
                });
            }
        });
    }    
    static addListener(listener) {
        this.listeners.add(listener);
        return this.removeListener.bind(this, listener);
    }
    static removeListener(listener) {return this.listeners.delete(listener);}
    static handlePush(chunk) {
        const [, modules] = chunk;
        for (const moduleId in modules) {
            const originalModule = modules[moduleId];
            modules[moduleId] = (module, exports, require) => {
                try {
                    Reflect.apply(originalModule, null, [module, exports, require]);
                    const listeners = [...this.listeners];
                    for (let i = 0; i < listeners.length; i++) {
                        try {listeners[i](exports);}
                        catch (error) {}
                    }
                }
                catch (error) {}
            };
            Object.assign(modules[moduleId], originalModule, {
                toString: () => originalModule.toString()
            });
        }
        return Reflect.apply(this.__ORIGINAL_PUSH__, window[this.chunkName], [chunk]);
    }
}

WebpackModules.initialize();

// BD code ends here.

exportRequire("react", WebpackModules.getByProps("createElement", "cloneElement"));