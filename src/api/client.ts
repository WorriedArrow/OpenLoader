import { DiscordNative } from "../main";

export default class Client {
    /**
     * Completely relaunches the client.
     */
    relaunch() {
        DiscordNative.remoteApp.relaunch();
    }
}
