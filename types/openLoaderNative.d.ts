export default interface OpenLoaderNative {
    app: {
        /**
         * Gets the current zoom factor without using hacky renderer-based fixes.
         * @returns The current zoom factor.
         */
        getZoomFactor(): number;
        /**
         * Sets the current zoom factor.
         * @param factor The zoom factor to set.
         */
        setZoomFactor(factor: number): void;
    };
    ipc: Electron.IpcRenderer;
}