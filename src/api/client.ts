import { DiscordNative, OpenLoaderNative } from "../main";

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
        return OpenLoaderNative.app.getZoomFactor();
    }
    set zoom(value) {
        OpenLoaderNative.app.setZoomFactor(value);
    }
}
