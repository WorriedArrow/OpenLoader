export default function addDecorations() {
    if(document.querySelector(".wordmark-2u86JB")) {
        var e = document.createElement('span');
        e.textContent = "| OpenLoader 0.2.0";
        document.querySelector(".wordmark-2u86JB")?.appendChild(e);
        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.height = "32px";
        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.display = "flex";
        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.flexDirection = "row";
        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.gap = "3px";
        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.placeItems = "center";
        (document.querySelector(".wordmark-2u86JB") as HTMLElement).style.fontSize = "unset";
    
    
        // Modify the titlebar to fit OpenLoader text
        (document.querySelector(".winButtonClose-3Q8ZH5") as HTMLElement).style.marginRight = "6px";
        document.querySelectorAll(".winButton-3UMjdg").forEach(element => (element as HTMLElement).style.top = "-2px");
        (document.querySelector(".withFrame-2dL45i") as HTMLElement).style.height = "32px";
        (document.querySelector(".withFrame-2dL45i") as HTMLElement).style.display = "flex";
        (document.querySelector(".withFrame-2dL45i") as HTMLElement).style.placeItems = "center";
    }
}