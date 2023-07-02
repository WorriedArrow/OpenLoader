import { fixLocalStorage } from "../loader";
import { OpenLoader, OpenLoaderNative } from "../main"
import { ButtonClasses } from "../modules";
import addDecorations from "../utils/windowDecorations";

fixLocalStorage();

const baseToggleFn = (category: string, setting: string, toggled: boolean) => {
    var patched = {...OpenLoader.settings};
    patched[category].toggles[setting] = toggled;
    OpenLoader.settings[category] = patched[category];
}

export const defaultSettings = {
    main: {
        toggles: {
            showTitleWatermark: true,
        }
    },
    experimental: {
        toggles: {
            disableDiscordPreload: false,
        }
    }
}

export const settingsStrings = {
    main: {
        name: "Main Settings",
        toggles: {
            showTitleWatermark: {
                name: "Show Title Watermark",
                description: "Toggles whether the title watermark is shown.",
            },
        }
    },
    experimental: {
        name: "Experimental Settings",
        toggles: {
            disableDiscordPreload: {
                name: "Disable Discord Preload",
                description: "This setting will disable the Discord native preload script. This will result in loss of functionality and will essentially turn your desktop client into a web client."
            }
        }
    }
}

export const toggleFns = {
    main: {
        toggles: {
            showTitleWatermark: {
                toggleFn: function(toggled) {
                    baseToggleFn("main", "showTitleWatermark", toggled);
                    if(toggled) addDecorations();
                    else {
                        document.querySelectorAll(".ol-watermark")?.forEach(element => element.remove());
                        (document.querySelector(".winButtonClose-3Q8ZH5") as HTMLElement).style.marginRight = "";
                        document.querySelectorAll(".winButton-3UMjdg").forEach(element => (element as HTMLElement).style.top = "");
                        (document.querySelector(".withFrame-2dL45i") as HTMLElement).style.height = "";
                        (document.querySelector(".withFrame-2dL45i") as HTMLElement).style.display = "";
                        (document.querySelector(".withFrame-2dL45i") as HTMLElement).style.placeItems = "";
                        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.height = "32px";
                        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.display = "";
                        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.flexDirection = "";
                        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.gap = "";
                        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.placeItems = "";
                        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.fontSize = "";
                    }
                }
            },
        }
    },
    experimental: {
        toggles: {
            disableDiscordPreload: {
                toggleFn: function(toggled, toggleSwitch) {
                    if(toggled) {
                        OpenLoader.components.generic.modal.open({
                            title: "Disable Discord Preload",
                            contents: "This is a dangerous setting to enable. It will break some aspects of your client until disabled. Are you sure you want to enable it?",
                            buttons: [
                                { content: "Okay", color: ButtonClasses.Colors.RED, onclick: () => {
                                    OpenLoaderNative.ipc.send("ol-update-preload", false);
                                    toggleSwitch();
                                    baseToggleFn("experimental", "disableDiscordPreload", toggled);
                                } },
                                { content: "Cancel" }
                            ],
                            cancelButton: true
                        });
                    } else {
                        OpenLoaderNative.ipc.send("ol-update-preload", true);
                        baseToggleFn("experimental", "disableDiscordPreload", toggled);
                    }
                    return !toggled;
                }
            }
        }
    }
}

export default new Proxy((JSON.parse(localStorage.getItem("openloader") || "{}").settings || defaultSettings) as typeof defaultSettings, {
    get(_, prop) {
        var ls = JSON.parse(localStorage.getItem("openloader") || "{}").settings;
        if(Object.keys(ls[prop]?.toggles ?? {}) !== Object.keys(defaultSettings[prop]?.toggles ?? {})) {
            ls[prop].toggles = {
                ...defaultSettings[prop].toggles,
                ...ls[prop].toggles
            }
        }
        return ls[prop];
    },
    set(_, prop, val) {
        var patched = JSON.parse(localStorage.getItem("openloader") || "{}");
        patched.settings[prop] = val;
        localStorage.setItem("openloader", JSON.stringify(patched));
        return true;
    }
})