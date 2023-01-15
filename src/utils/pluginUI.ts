import { removeAllChildren } from "./dom";
import { OpenLoader } from "../main";

function addContent(content: HTMLElement) {
    var plugins = JSON.parse(localStorage.getItem("openloader") ?? "").plugins;
    removeAllChildren(content);
    if(plugins.length == 0) {
        var component = OpenLoader.componentBuilder.createComponent(OpenLoader.components.generic.text, { text: "Oh no, looks like you don't have any plugins! Add one using the + button." })
        content.style.display = "block";
        content.appendChild(component);
        return;
    }
    content.style.display = "grid";
    for(var i = 0; i < plugins.length; i++) {
        var plugin = plugins[i];
        var elem = document.createElement("div");
        elem.style.borderRadius = "8px";
        elem.style.backgroundColor = "var(--primary-dark-700)";
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
        elem.dataset.plugin = i.toString();
        let svgWrapper = document.createElement("div");
        svgWrapper.style.position = "absolute";
        svgWrapper.style.top = "8px";
        svgWrapper.style.right = "-32px";
        svgWrapper.style.color = "var(--button-danger-background)";
        svgWrapper.style.cursor = "pointer";
        svgWrapper.style.transition = "right 0.35s ease-in-out, color 0.35s ease-in-out";
        svgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd"></path></svg>';
        svgWrapper.onclick = () => {
            var patched = JSON.parse(localStorage.getItem('openloader') ?? "");
            patched.plugins.splice(elem.dataset.plugin, 1);
            localStorage.setItem("openloader", JSON.stringify(patched));
            addContent(content);
        }
        (svgWrapper.querySelector('svg') as SVGElement).onmouseenter = () => svgWrapper.style.color = "var(--status-red-600)";
        (svgWrapper.querySelector('svg') as SVGElement).onmouseleave = () => svgWrapper.style.color = "var(--button-danger-background)";
        elem.onmouseenter = () => svgWrapper.style.right = "8px";
        elem.onmouseleave = () => svgWrapper.style.right = "-32px";
        var bgImage = document.createElement("div");
        bgImage.style.width = "100%";
        bgImage.style.height = "40%";
        bgImage.style.backgroundImage = "url(" + (plugin.bannerUrl ?? "https://assets.worriedarrow.xyz/plug.png") + ")";
        bgImage.style.backgroundPositionX = "center";
        bgImage.style.backgroundPositionY = "center";
        var name = document.createElement("div");
        name.style.color = "var(--text-normal)";
        name.style.paddingTop = "16px";
        name.style.textAlign = "center";
        name.textContent = plugin.name;
        var author = document.createElement("div");
        author.style.marginTop = "12px";
        author.style.color = "var(--text-muted)";
        author.style.textAlign = "center";
        author.classList.add("h5-2RwDNl");
        author.classList.add("title-3hptVQ");
        author.textContent = "by " + plugin.author;
        var version = document.createElement("div");
        version.style.color = "var(--text-muted)";
        version.style.padding = "16px";
        version.style.textAlign = "center";
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

export default addContent;