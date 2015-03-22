 ///<reference path="lib/jquery.d.ts" />

// Find the right method, call on correct element
function launchFullScreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

window.onload = () => {
    document.getElementById("fullscreenButton").addEventListener('click',() => launchFullScreen(document.documentElement));
};