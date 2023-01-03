export default class StyleInjector {
    /**
     * Injects `css` into the Discord client.
     * @param css the CSS to be injected. 
     */
    inject(css: string) {
        var element = document.createElement("style");
        element.textContent = css;
        document.head.appendChild(element);
    }
}