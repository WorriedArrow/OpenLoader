import { App, DesktopCapturerSource, SourcesOptions } from "electron";

export default interface DiscordNative {
    isRenderer: boolean,
    setUncaughtExceptionHandler: (handler) => void,
    nativeModules: NativeModules,
    process: Process,
    os: OS,
    app: App,
    clipboard: Clipboard,
    ipc: IPC,
    gpuSettings: GPUSettings,
    window: Window,
    powerMonitor: PowerMonitor,
    spellCheck: SpellCheck,
    crashReporter: CrashReporter,
    desktopCapture: DesktopCapture,
    fileManager: FileManager,
    clips: Clips,
    processUtils: ProcessUtils,
    powerSaveBlocker: PowerSaveBlocker,
    http: HTTP,
    accessibility: Accessibility,
    features: Features,
    settings: Settings,
    userDataCache: UserDataCache,
    thumbar: Thumbar,
    safeStorage: SafeStorage,
    globalOverlay: GlobalOverlay,
    remoteApp: App,
    remotePowerMonitor: PowerMonitor
}

interface NativeModules {
    ensureModule(name: string): boolean,
    requireModule(name: string): any,
    canBootstrapNewUpdater: boolean
}

type Platform = 'aix' | 'android' | 'darwin' | 'freebsd' | 'haiku' | 'linux' | 'openbsd' | 'sunos' | 'win32' | 'cygwin' | 'netbsd';
type Architecture = 'arm' | 'arm64' | 'ia32' | 'mips' | 'mipsel' | 'ppc' | 'ppc64' | 's390' | 's390x' | 'x64';

interface DiscordEnv {
    DISCORD_TEST?: any,
    DISCORD_GATEWAY_PLAINTEXT?: string,
    DISCORD_DISALLOW_POPUPS?: boolean,
    LOCALAPPDATA?: string,
    'PROGRAMFILES(X86)'?: string,
    PROGRAMFILES?: string,
    PROGRAMW6432?: string,
    PROGRAMDATA?: string
}

interface Process {
    platform: Platform,
    arch: Architecture,
    env: DiscordEnv
}

interface OS {
    release: string,
    arch: Architecture
}

interface Clipboard {
    copy(text: string): void;
    copyImage(imageArrayBuffer: ArrayBuffer, imageSrc: string): void;
    cut(): void;
    paste(): void;
    read(): string;
}

interface IPC {
    send(ev: string, ...args: any[]): void;
    on(ev: string, callback: (...args: any[]) => void): void;
    invoke(ev: string, ...args: any[]): any;
}

interface GPUSettings {
    getEnableHardwareAcceleration(): boolean;
    setEnableHardwareAcceleration(enable: boolean): void;
}

interface Window {
    flashFrame(flag: boolean): void;
    minimize(key: any): void;
    restore(key: any): void;
    maximize(key: any): void;
    focus(_hack: any, key: any): void;
    setAlwaysOnTop(key: any, enabled: boolean): void;
    isAlwaysOnTop(key: any): boolean;
    blur(key: any): void;
    setProgressBar(progress: number, key: any): void;
    fullscreen(key: any): void;
    close(key: any): void;
    setZoomFactor(factor: number): void;
    setBackgroundThrottling(enabled: boolean): void;
    setDevtoolsCallbacks(onOpened: () => void, onClosed: () => void): void;
    USE_OSX_NATIVE_TRAFFIC_LIGHTS: boolean;
}

interface PowerMonitor {
    on(...args: any[]): void;
    removeListener(...args: any[]): void;
    removeAllListeners(...args: any[]): void;
    getSystemIdleTimeMs(): number
}

interface SpellCheck {
    on(...args: any[]): void;
    removeListener(...args: any[]): void;
    getAvailableDictionaries(): string[];
    setLocale(locale: string): boolean;
    setLearnedWords(learnedWords: string[]): void;
    replaceMisspelling(correction: string): void;
}

interface CrashReporter {
    updateCrashReporter(additionalMetadata: any): void;
    getMetadata(): any;
    getFlattenedMetadata(): any;
    triggerJSException(exceptionLocation: 0 | 1 | 2): void;
}

interface DesktopCapture {
    getDesktopCaptureSources(options: SourcesOptions): DesktopCapturerSource[];
}

type HookMinidumpUploadResult = Promise<{
    response: Response;
    minidump: Minidump;
}>

type Minidump = {
    exceptionString: string;
    processName: string;
    exceptionModuleName: string;
    exceptionModuleVersion: string;
    relativeCrashAddress: string;
    exceptionModuleCodeId: any;
} | null;

type DialogOptions = { filters: string[], properties: string[] }

interface FileManager {
    extname(path: string): string;
    basename(path: string): string;
    dirname(path: string): string;
    join(parts: string[]): string;
    saveWithDialog(fileContents: string | ArrayBufferView): void;
    showOpenDialog(options: DialogOptions): void;
    readLogFiles(maxSize: number): Promise<any[]>;
    combineWebRtcLogs(path1: string, path2: string, destinationPath: string): void;
    getCallscopeLogFiles(blindChannelId: string): Promise<any[]>;
    cleanupTempFiles(): Promise<any[]>;
    getCallscopeLogFileResult(filenames: string[]): Promise<any[]>;
    uploadHookMinidumpFile(filename: string, fullpath: string, metadata: any): HookMinidumpUploadResult;
    uploadDiscordHookCrashes(): Minidump[];
    showItemInFolder(path: string): void;
    openFiles(dialogOptions: DialogOptions): Promise<any[]>;
    getModulePath(): Promise<string>
    getModuleDataPathSync(): string;
}

interface Clips {
    loadClip(path: string): Promise<any>
    loadClipsDirectory(path: string): Promise<any[]>;
    deleteClip(path: string): void;
}

type CrashData = {
    date: any;
    id: any;
    rendererCrashReason: string;
    rendererCrashExitCode: number;
    minidumpInformation: Minidump;
    storedInformation: any;
}

type SystemInfo = {
    cpus: { model: string, speed: number }[];
    gpus: { model: string, vendor: string, memory: number }[];
    totalMemory: number;
}

interface ProcessUtils {
    getCurrentMemoryUsageKB(): number;
    flushDNSCache(): Promise<void>;
    getLastCrash(): Promise<CrashData>;
    flushCookies(callback: (...args: any[]) => void): Promise<void>;
    getSystemInfo(): Promise<SystemInfo>;
    flushStorageData(callback: (...args: any[]) => void): Promise<void>;
    purgeMemory(): void;
    getCurrentCPUUsagePercent(): number;
    getCPUCoreCount(): number;
    getMainArgvSync(): any;
    setCrashInformation(crashInformation: any, state: any): void;
}

interface PowerSaveBlocker {
    blockDisplaySleep(): Promise<number>;
    unblockDisplaySleep(id: number): Promise<void>;
    cleanupDisplaySleep(): Promise<void>;
}

interface HTTP {
    getAPIEndpoint(): Promise<string>;
    makeChunkedRequest(route: string, chunks: string[], options: { method: string, chunkInterval: number, token: string, contentType: string }): Promise<any>;
}

interface Accessibility {
    isAccessibilitySupportEnabled(): Promise<boolean>;
}

interface Features {
    supports(feature: any): boolean;
    declareSupported(feature: any): void;
}

interface Settings {
    get(name: string, defaultValue: any): Promise<any>;
    set(name: string, value: any): Promise<void>;
    getSync(name: string, defaultValue: any): any;
}

interface UserDataCache {
    getCached(): Promise<any>;
    cacheUserData(userData: any): void;
    deleteCache(): void;
}

interface Thumbar {
    setThumbarButtons(buttons: any[], isSystemDarkMode: boolean): Promise<void>;
}

interface SafeStorage {
    isEncryptionAvailable(): boolean;
    decryptString(encrypted: string): string;
    encryptString(plainText: string): string;
}

interface GlobalOverlay {
    openOverlay(url: string): Promise<void>;
}