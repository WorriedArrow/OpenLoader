import { DiscordNative } from "../main";

export default class Client {
    /**
     * Completely relaunches the client.
     */
    relaunch() {
        DiscordNative.remoteApp.relaunch();
    }
    /**
     * The current zoom level as a percentage.
     */
    get zoom() {
        return Math.round((( window.outerWidth - 10 ) / window.innerWidth) * 100 + 0.6);
    }
    set zoom(value) {
        DiscordNative.window.setZoomFactor(value);
    }
}
