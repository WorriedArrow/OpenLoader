import { OpenLoader, WebpackModules } from "../main";
import { uploadPlugin } from "../utils/pluginUploading";
import addContent from "../utils/pluginUI";
import addDecorations from "../utils/windowDecorations";
import { settingsStrings, toggleFns } from "../api/settingsManager";
import { baseUrl, about } from "../data/assets.json";

let timesClicked = 0;

export default function initUI() {
    // Add window decorations
    addDecorations();
    // Set up "Plugins" button injection in the User Settings menu
    var pluginsDisplayed = false;
    // TODO: Add proper settings menu injection(!) with getPredicateSections!
    setInterval(() => {
        const whatsNewText = [...document.querySelectorAll('.item-2GWPIy')].find(x => x.textContent == WebpackModules.getProp("WHATS_NEW"));
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
        var pluginsClick = () => {
            sep.parentNode?.childNodes.forEach(node => (node as HTMLElement).classList.remove("selected-1sf9UK"));
            pluginsItem.classList.add("selected-1sf9UK");

            // Load plugins page
            document.querySelector(".contentColumn-1C7as6")?.childNodes.forEach(node => (node as HTMLElement).style.display = "none");
            document.querySelectorAll(".ol-page")?.forEach(node => node.remove());
            var wrapper = document.createElement("div");
            wrapper.classList.add("ol-page");
            var head = document.createElement("div");
            head.innerHTML = '<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%"><div class="sectionTitle-LdcnyP" style="flex-direction: column"><h3 class="h5-2feg8J title-lXcL8p marginBottom8-emkd0_">OpenLoader</h3><h2 class="h1-3iMExa title-lXcL8p defaultColor-3Olr-9 defaultMarginh1-1UYutH" id="uid_123">Plugins</h2></div><div style="fill: var(--text-normal); cursor: pointer" class="ol-add-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path></svg></div></div>';
            head.classList.add("sectionTitle-LdcnyP");
            (head.querySelector(".ol-add-btn") as HTMLElement).onclick = () => uploadPlugin(content);
            var content = document.createElement("div");
            content.style.display = "grid";
            content.style.gridTemplateColumns = "1fr 1fr 1fr";
            content.style.rowGap = "44px";
            content.classList.add("children-2C96Ex");
            wrapper.appendChild(head);
            wrapper.appendChild(content);
            document.querySelector(".contentColumn-1C7as6")?.appendChild(wrapper);
            addContent(content);
        }
        var settingsClick = () => {
            sep.parentNode?.childNodes.forEach(node => (node as HTMLElement).classList.remove("selected-1sf9UK"));
            settingsItem.classList.add("selected-1sf9UK");

            // Load settings page
            document.querySelector(".contentColumn-1C7as6")?.childNodes.forEach(node => (node as HTMLElement).style.display = "none");
            document.querySelectorAll(".ol-page")?.forEach(node => node.remove());
            var wrapper = document.createElement("div");
            wrapper.classList.add("ol-page");
            var head = document.createElement("div");
            head.innerHTML = '<div><div class="sectionTitle-LdcnyP" style="flex-direction: column"><h3 class="h5-2feg8J title-lXcL8p marginBottom8-emkd0_">OpenLoader</h3><h2 class="h1-3iMExa title-lXcL8p defaultColor-3Olr-9 defaultMarginh1-1UYutH" id="uid_123">Settings</h2></div></div>';
            head.classList.add("sectionTitle-LdcnyP");
            var content = document.createElement("div");
            content.classList.add("children-2C96Ex");
            content.appendChild(OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.settingsToggles, { toggles: OpenLoader.settings, toggleFns, settingsStrings }));
            wrapper.appendChild(head);
            wrapper.appendChild(content);
            document.querySelector(".contentColumn-1C7as6")?.appendChild(wrapper);
        }
        var aboutClick = async () => {
            timesClicked = 0;
            sep.parentNode?.childNodes.forEach(node => (node as HTMLElement).classList.remove("selected-1sf9UK"));
            aboutItem.classList.add("selected-1sf9UK");

            // Load about page
            document.querySelector(".contentColumn-1C7as6")?.childNodes.forEach(node => (node as HTMLElement).style.display = "none");
            document.querySelectorAll(".ol-page")?.forEach(node => node.remove());
            var wrapper = document.createElement("div");
            wrapper.classList.add("ol-page");
            var head = document.createElement("div");
            head.innerHTML = '<div><div class="sectionTitle-LdcnyP" style="flex-direction: column"><h3 class="h5-2feg8J title-lXcL8p marginBottom8-emkd0_">OpenLoader</h3><h2 class="h1-3iMExa title-lXcL8p defaultColor-3Olr-9 defaultMarginh1-1UYutH" id="uid_123">About</h2></div></div>';
            head.classList.add("sectionTitle-LdcnyP");
            var content = document.createElement("div");
            content.classList.add("children-2C96Ex");
            content.style.alignItems = "center";
            var img = document.createElement("img");
            img.src = baseUrl + about.OL_IMG;
            img.style.width = "128px";
            img.style.marginBottom = "16px";
            img.onclick = () => {
                if(++timesClicked == 16) content.insertBefore(codenameText, versionText);
            };
            var olText = OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.text, { text: "OpenLoader" });
            olText.style.fontSize = "32px";
            olText.style.fontWeight = "bold";
            olText.style.marginBottom = "12px";
            var codenameText = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.header, { text: OpenLoader.build.codename });
            codenameText.style.fontWeight = "500";
            var versionText = OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.text, { text: "version " + OpenLoader.build.version.asStr });
            var details = OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.text, { text: 
                `Created by WorriedArrow
                A plugin loader for Discord.` });
            details.style.whiteSpace = "pre-line";
            details.style.textAlign = "center";
            var svgs = [
                {
                    html: `<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 496 512" style="fill: var(--header-secondary);"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>`,
                    link: "https://github.com/WorriedArrow/OpenLoader",
                    tooltip: "GitHub"
                },
                {
                    html: `<svg xmlns="http://www.w3.org/2000/svg" height="1.25em" viewBox="0 0 512 512" style="fill: var(--header-secondary);"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg>`,
                    link: "https://github.com/sponsors/WorriedArrow",
                    tooltip: "Support the project ❤️"
                }
            ]
            var svgWrapper = document.createElement("div");
            svgWrapper.style.display = "flex";
            svgWrapper.style.flexDirection = "row";
            svgWrapper.style.marginTop = "8px";
            svgWrapper.style.gap = "12px";
            svgs.map(svg => {
                var elem = document.createElement("div");
                elem.innerHTML = svg.html;
                (elem.children[0] as HTMLElement).style.cursor = "pointer";
                (elem.children[0] as HTMLElement).onclick = () => open(svg.link);
                OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.tooltip, { node: elem, text: svg.tooltip, options: { style: "info" } });
                return elem;
            }).forEach(e => svgWrapper.appendChild(e));

            var glitchImg = document.createElement("img");
            glitchImg.src = baseUrl + about.GLITCH_IMG;
            glitchImg.style.paddingTop = "32px";
            glitchImg.style.paddingBottom = "12px";
            glitchImg.style.height = "96px";
            var glitchText = OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.text, { text: "© 2023 GL!TCH" });
            content.appendChild(img);
            content.appendChild(olText);
            content.appendChild(versionText);
            content.appendChild(details);
            content.appendChild(svgWrapper);
            content.appendChild(glitchImg);
            content.appendChild(glitchText);
            wrapper.appendChild(head);
            wrapper.appendChild(content);
            document.querySelector(".contentColumn-1C7as6")?.appendChild(wrapper);
        }
        
        var pluginsItem = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "Plugins", onclick: pluginsClick });
        pluginsItem.classList.add("ol-plugins-button");
        var settingsItem = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "Settings", onclick: settingsClick });
        var aboutItem = OpenLoader.componentBuilder.createComponent(OpenLoader.components.settingsMenu.item, { text: "About", onclick: aboutClick });
        sep.parentNode?.childNodes.forEach(node => {
            if((node as HTMLElement).classList.contains("info-3pQQBb") || (node as HTMLElement).classList.contains("socialLinks-3ywLUf") || (node as HTMLElement).classList.contains("separator-2N511j") || (node as HTMLElement).classList.contains("header-2F5_LB")) return;
            (node as HTMLElement).onclick = () => {
                pluginsItem.classList.remove("selected-1sf9UK");
                settingsItem.classList.remove("selected-1sf9UK");
                aboutItem.classList.remove("selected-1sf9UK");
                (node as HTMLElement).classList.add("selected-1sf9UK");
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
        sep.parentNode?.insertBefore(pluginsItem, sep);
        sep.parentNode?.insertBefore(settingsItem, sep);
        sep.parentNode?.insertBefore(aboutItem, sep);
        pluginsDisplayed = true;
    }, 500);
}