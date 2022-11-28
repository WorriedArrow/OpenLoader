/**
 * OpenLoader 0.1.0
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
        DiscordNative.remoteApp.relaunch();
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
e.textContent = "| OpenLoader 0.1.0";
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
    // sep: The seperator right above the What's New button in the settings menu.
    const sep = document.querySelector('.sidebarRegion-1VBisG nav div div:nth-child(' + Array.from(whatsNewText.parentNode.children).indexOf(whatsNewText) + ')');
    //document.querySelector("#app-mount > div.appDevToolsWrapper-1QxdQf > div > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div:nth-child(2) > div >  > div > nav > div > div:nth-child(38)")
    if(!sep) {
        pluginsDisplayed = false;
        return;
    }
    if(pluginsDisplayed) return;
    var separator = document.createElement("div");
    separator.classList.add("separator-2wx7h6");
    var header = document.createElement("div");
    header.classList.add("header-2Kx1US");
    header.textContent = "OpenLoader";
    var item = document.createElement("div");
    item.classList.add("item-3XjbnG");
    item.classList.add("themed-2-lozF");
    item.classList.add("ol-plugins-button");
    item.textContent = "Plugins";
    var reloadItem = document.createElement("div");
    reloadItem.classList.add("item-3XjbnG");
    reloadItem.classList.add("themed-2-lozF");
    reloadItem.textContent = "Reload";
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
    item.onclick = () => {
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
        
        // html`
        // <div class="children-1xdcWE" style="display: grid;">
        //     <div style="border-radius: 8px;background-color: #222;width: 10vw;height: 25vh;position: relative;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
        //         <div style="fill: #c72d3b;position: absolute;z-index: 9999999999;top: 6px;right: 4px;color: #c72d3b; cursor: pointer">
        //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        //                 <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"></path>
        //             </svg>
        //         </div>
        //         <div style="width: 100%;height: 40%;background: url(https://images.pexels.com/photos/5800782/pexels-photo-5800782.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1260&amp;h=750&amp;dpr=1);border-top-left-radius: 8px;border-top-right-radius: 8px;background-position-x: center;background-position-y: 75%;"></div>
        //         <div style="color: #eee; padding: 8px; text-align: center">Hello World (Example Plugin)</div>
        //         <div></div>
        //         <div style="color: #999;padding: 16px;text-align: center;font-family: var(--font-headline);text-transform: uppercase;font-weight: bold;">by Arrow</div>
        //     </div>
        // </div>
        // `
        content.classList.add("children-1xdcWE");
        wrapper.appendChild(head);
        wrapper.appendChild(content);
        document.querySelector(".contentColumn-1C7as6").appendChild(wrapper);
        addContent();
    }
    // reloadItem.onclick = () => {
    //     sep.parentNode.childNodes.forEach(node => node.classList.remove("selected-g-kMVV"));
    //     reloadItem.classList.add("selected-g-kMVV");

    //     // Load plugins page
    //     document.querySelector(".contentColumn-1C7as6").childNodes.forEach(e2 => e2.style.display = "none");
    //     var wrapper = document.createElement("div");
    //     wrapper.classList.add("ol-page");
    //     var head = document.createElement("div");
    //     head.innerHTML = '<div class="sectionTitle-3j2YI1" style="flex-direction: column"><h3 class="h5-2RwDNl title-3hptVQ marginBottom8-emkd0_">OpenLoader</h3><h2 class="h1-34Txb0 title-3hptVQ defaultColor-2cKwKo defaultMarginh1-EURXsm" id="uid_123">Reload</h2></div>';
    //     head.classList.add("sectionTitle-3j2YI1");
    //     var content = document.createElement("div");
    //     content.innerHTML = '<div class="colorStandard-1Xxp1s size14-k_3Hy4 description-30xx7u formText-2ngGjI marginBottom20-315RVT modeDefault-2fEh7a">Reloading the client reloads OpenLoader itself along with any plugins you may have installed.</div><button onclick="location.reload()" style="min-width: fit-content" type="button" class="button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ sizeSmall-wU2dO-"><div class="contents-3ca1mk">Reload Client</div></button><div class="colorStandard-1Xxp1s size14-k_3Hy4 description-30xx7u formText-2ngGjI marginBottom20-315RVT modeDefault-2fEh7a">Pro tip: You can use Command/Control + R to quickly reload without accessing this menu.</div>'
    //     content.classList.add("children-1xdcWE");
    //     wrapper.appendChild(head);
    //     wrapper.appendChild(content);
    //     document.querySelector(".contentColumn-1C7as6").appendChild(wrapper);
    // }
    reloadItem.onclick = () => location.reload();
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

function addContent() {
    var plugins = JSON.parse(localStorage.getItem("openloader")).plugins;
    removeAllChildren(content);
    if(plugins.length == 0) {
        var elem = document.createElement("div");
        elem.classList.add("description-30xx7u");
        elem.textContent = "Oh no, looks like you don't have any plugins! Add one using the + button.";
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

async function uploadPlugin() {
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
