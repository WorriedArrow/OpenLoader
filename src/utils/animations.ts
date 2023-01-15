export function fadeIn(element: HTMLElement) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op.toString();
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.2;
    }, 10);
}

export function fadeOut(element: HTMLElement) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op.toString();
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.2;
    }, 50);
}