import { OpenLoader } from "../main";
import { fadeIn, fadeOut } from "../utils/animations";

export default function initMisc() {
    // Listen for Ctrl/Cmd + Shift + R for complete relaunch
    document.addEventListener("keydown", function(event) {
        if ((navigator.platform.toLowerCase().startsWith("mac") ? event.metaKey : event.ctrlKey) && event.shiftKey && event.code === "KeyR") {
            OpenLoader.client.relaunch();
        }
    });
    
    // Send a notification to the user saying that OpenLoader has loaded successfully.
    var notif = document.createElement("div");
    notif.style.position = "fixed";
    notif.style.top = "48px";
    notif.style.right = "16px";
    notif.style.zIndex = "99999";
    notif.style.setProperty("backdrop-filter", "blur(20px)");
    notif.style.padding = "24px";
    notif.style.color = "white";
    notif.innerText = "OpenLoader loaded successfully.";
    notif.style.boxShadow = "0px 0px 50px 0px rgba(0, 0, 0, 0.2)";
    notif.style.borderRadius = "8px";
    notif.classList.add("ol-notif")
    document.body.appendChild(notif);
    fadeIn(notif)
    setTimeout(() => {
        fadeOut(notif);
    }, 5500);

    // Print welcome message to the console after 20 seconds.
    setTimeout(() => console.log("%cWelcome to OpenLoader.", "font-size: 5rem; color: #5566ff"), 20000);
}