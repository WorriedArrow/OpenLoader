import components from "../src/api/components";

type HTMLParseResult = NodeListOf<ChildNode> | ChildNode;

interface Client {
    /**
     * Completely relaunches the client.
     */
    relaunch(): void;
    /**
     * The current zoom level as a percentage.
     */
    get zoom(): number;
    set zoom(value);
}

interface DiscordWindow {
    /**
     * Minimizes the window.
     */
    minimize(): void;
    /**
     * Restores the window, reopening the window if it is closed.
     */
    restore(): void;
    /**
     * Maximizes the window, restoring if it is minimized and reopening the window if it is closed.
     */
    maximize(): void;
    /**
     * Closes the window, remains in system tray.
     */
    close(): void;
}

interface StyleInjector {
    /**
     * Injects `css` into the Discord client.
     * @param css The CSS to be injected. 
     */
    inject(css: string): void;
}

interface ComponentBuilder {
    /**
     * Creates a component.
     * 
     * @param component The component to create.
     * @param options The options to pass to the component function.
     * @returns the output element of the component function.
     */
    createComponent(component: Function, options: any): HTMLElement | void;
    /**
     * 
     * @param category The category, which can be something like "hello.world" to have hello as the category and world as the subcategory.
     * @param methodName The name of the method or component.
     * @param method 
     * @param createCategory 
     */
    createMethod(category: string, methodName: string, method: Function, createCategory: boolean): void;
    parseHTML(html: string, fragment: boolean): HTMLParseResult;
}

type NativeComponents = typeof components;

export default interface OpenLoader {
    client: Client;
    window: DiscordWindow,
    styleInjector: StyleInjector,
    componentBuilder: ComponentBuilder,
    components: NativeComponents;
}