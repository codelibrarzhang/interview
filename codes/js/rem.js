var documentElement = document.documentElement
function callback () {
    var clientWidth = documentElement.clientWidth
    clientWidth = clientWidth > 750 ? 750 : clientWidth
    documentElement.style.fontSize = 100 * clientWidth / 750 + 'px'
}
document.addEventListener('DOMContentLoaded', callback)
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', callback)
