/* Insights: filter posts by topic. */
(function () {
  var btns = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-cat]");
  var featured = document.getElementById("featured");
  var empty = document.getElementById("no-posts");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var cat = b.getAttribute("data-filter");
      btns.forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      var all = cat === "All";
      if (featured) featured.hidden = !all;
      var shown = 0;
      cards.forEach(function (c) {
        var show = all ? !c.hasAttribute("data-featured") : c.getAttribute("data-cat") === cat;
        c.hidden = !show;
        if (show) shown++;
      });
      empty.hidden = shown > 0;
    });
  });
})();
