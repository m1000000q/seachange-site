/* Phone menu: the ☰ button opens and closes the top menu. */
(function () {
  var btn = document.querySelector(".menu-btn");
  if (!btn) return;
  var nav = btn.closest("nav");
  function set(open) {
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Menu");
  }
  btn.addEventListener("click", function () { set(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { set(false); btn.focus(); }
  });
  window.matchMedia("(min-width: 641px)").addEventListener("change", function () { set(false); });
})();
