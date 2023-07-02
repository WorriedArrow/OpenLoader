import { DiscordNative } from "../main";

export default class DiscordWindow {
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

    get screenWidth() { return Math.max(document.documentElement.clientWidth, window.innerWidth || 0); }

    get screenHeight() { return Math.max(document.documentElement.clientHeight, window.innerHeight || 0); }
}