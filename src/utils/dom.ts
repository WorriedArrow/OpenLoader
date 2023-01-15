export function removeAllChildren(element: Node): void {
    if(element.childNodes.length == 0) return;
    element.childNodes.forEach(node => node.remove());
    if(element.childNodes.length > 0) removeAllChildren(element); // fix for some weird behavior that makes it so sometimes elements aren't removed
}