import { OpenLoader } from "../main";
import { uploadPlugin } from "../utils/pluginUploading";
import addContent from "../utils/pluginUI";
import addDecorations from "../utils/windowDecorations";

export default function initUI() {
    // Add window decorations
    addDecorations();
    // Set up "Plugins" button injection in the User Settings menu
    var pluginsDisplayed = false;
    setInterval(() => {
        const whatsNewText = [...document.querySelectorAll('.item-3XjbnG')].find(x => x.textContent == ("What's New"));
        if(!whatsNewText) return;
        if(!document.querySelector(".ol-plugins-button")) pluginsDisplayed = false;
        // The separator right above the What's New button in the settings menu.
        const sep = document.querySelector('.sidebarRegion-1VBisG nav div div:nth-child(' + Array.from(whatsNewText.parentNode?.children ?? []).indexOf(whatsNewText) + ')');
        if(!sep) {
            pluginsDisplayed = false;
            return;
        }
        if(pluginsDisplayed) return;
        var separator = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.separator);
        var header = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.header, { text: "OpenLoader" });
        var itemClick = () => {
            sep.parentNode?.childNodes.forEach(node => (node as HTMLElement).classList.remove("selected-g-kMVV"));
            item.classList.add("selected-g-kMVV");

            // Load plugins page
            document.querySelector(".contentColumn-1C7as6")?.childNodes.forEach(node => (node as HTMLElement).style.display = "none");
            var wrapper = document.createElement("div");
            wrapper.classList.add("ol-page");
            var head = document.createElement("div");
            head.innerHTML = '<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%"><div class="sectionTitle-3j2YI1" style="flex-direction: column"><h3 class="h5-2RwDNl title-3hptVQ marginBottom8-emkd0_">OpenLoader</h3><h2 class="h1-34Txb0 title-3hptVQ defaultColor-2cKwKo defaultMarginh1-EURXsm" id="uid_123">Plugins</h2></div><div style="fill: var(--text-normal); cursor: pointer" class="ol-add-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg></div></div>';
            head.classList.add("sectionTitle-3j2YI1");
            (head.querySelector(".ol-add-btn") as HTMLElement).onclick = () => uploadPlugin(content);
            var content = document.createElement("div");
            content.style.display = "grid";
            content.style.gridTemplateColumns = "1fr 1fr 1fr";
            content.style.rowGap = "44px";
            content.classList.add("children-1xdcWE");
            wrapper.appendChild(head);
            wrapper.appendChild(content);
            document.querySelector(".contentColumn-1C7as6")?.appendChild(wrapper);
            addContent(content);
        }
        var item = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "Plugins", onclick: itemClick });
        item.classList.add("ol-plugins-button");
        var reloadItem = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "Reload", onclick: () => location.reload() });
        sep.parentNode?.childNodes.forEach(node => {
            if((node as HTMLElement).classList.contains("info-3pQQBb") || (node as HTMLElement).classList.contains("socialLinks-3ywLUf") || (node as HTMLElement).classList.contains("separator-2wx7h6") || (node as HTMLElement).classList.contains("header-2Kx1US")) return;
            (node as HTMLElement).onclick = () => {
                item.classList.remove("selected-g-kMVV");
                (node as HTMLElement).classList.add("selected-g-kMVV");
                document.querySelectorAll(".ol-page").forEach(elem => elem.remove());
                // Fix for going from x menu item to plugins back to x menu item, therefore
                // reloading the content of x menu item since OL does not fully reload the
                // content, rather sets the native content to be invisible and adds its own
                // content.
                document.querySelector(".contentColumn-1C7as6")?.childNodes.forEach(e2 => (e2 as HTMLElement).style.display = "block");
            }
        });
        sep.parentNode?.insertBefore(separator, sep);
        sep.parentNode?.insertBefore(header, sep);
        sep.parentNode?.insertBefore(item, sep);
        sep.parentNode?.insertBefore(reloadItem, sep);
        pluginsDisplayed = true;
    }, 500);
}