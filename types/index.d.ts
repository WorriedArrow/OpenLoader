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
    /**
     * Gets the client's current screen width.
     */
    get screenWidth(): number;
    /**
     * Gets the client's current screen height.
     */
    get screenHeight(): number;
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
     * Defines a component.
     * @param category The category, which can be something like "hello.world" to have hello as the category and world as the subcategory.
     * @param methodName The name of the method or component.
     * @param method The method to be run when the component is created.
     * @param createCategory Whether to create categories automatically, if false and a nonexistent category is provided, an error will be thrown.
     */
    createMethod(category: string, methodName: string, method: Function, createCategory: boolean): void;
    parseHTML(html: string, fragment: boolean): HTMLParseResult;
}

interface Logger {
    /**
     * Logs to the console with a special color.
     * @param origin Where the message was logged from.
     * @param message The message(s) to be displayed.
     */
    logSpecial(origin: string, ...message: any[]): void;
    /**
     * Logs to the console.
     * @param origin Where the message was logged from.
     * @param message The message(s) to be displayed.
     */
    log(origin: string, ...message: any[]): void;
}

type NativeComponents = typeof components;

interface Settings {
    [group: string]: {
        toggles: {
            [settingName: string]: boolean;
        }
    }
}

interface OLBuild {
    /**
     * The full object of the version.
     */
    version: {
        /**
         * The major version number.
         */
        major: number;
        /**
         * The minor version number.
         */
        minor: number;
        /**
         * The patch version number.
         */
        patch: number;
        /**
         * Gets the full version as a string.
         * @returns {String} the full version, e.g. "0.3.0"
         */
        get asStr(): string;
    }
    codename: string;
}
export default interface OpenLoader {
    client: Client;
    window: DiscordWindow,
    styleInjector: StyleInjector,
    componentBuilder: ComponentBuilder,
    logger: Logger,
    components: NativeComponents;
    settings: Settings,
    build: OLBuild
}