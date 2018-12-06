(function () {
  document.addEventListener("DOMContentLoaded", setFontSize);
  window.addEventListener("resize", setFontSize);
  function setFontSize() {
    const html = document.querySelector("html");
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + "px";
  }
})();
