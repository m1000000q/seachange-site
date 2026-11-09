/* HubSpot form submissions (public Forms API, no key needed) + newsletter sign-up. */
(function () {
  var HS = {
    portal: "146401104",
    contact: "b47feebf-77d4-4fd5-a076-d73c4ef792f9",
    news: "c5b3a6a0-9144-4543-b330-7ed581f9e524"
  };

  function hsSubmit(guid, fields) {
    var hutk = (document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/) || [])[1];
    var context = { pageUri: window.location.href, pageName: document.title };
    if (hutk) context.hutk = hutk;
    return fetch("https://api-eu1.hsforms.com/submissions/v3/integration/submit/" + HS.portal + "/" + guid, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: fields, context: context })
    }).then(function (r) {
      if (!r.ok) throw new Error("HubSpot " + r.status);
      return r.json();
    });
  }

  window.SeaChangeForms = { HS: HS, submit: hsSubmit };

  // Newsletter forms (footer on home, briefing box on Insights)
  document.querySelectorAll("form.sub-form").forEach(function (form) {
    var wrap = form.parentNode;
    var label = form.querySelector(".sub-label");
    var err = form.querySelector(".sub-err");
    var sent = wrap.querySelector(".sub-sent");
    var busy = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      busy = true;
      var original = label.textContent;
      label.textContent = document.documentElement.lang === "es" ? "Suscribiendo…" : "Signing up…";
      if (err) err.hidden = true;
      var email = new FormData(form).get("email") || "";
      hsSubmit(HS.news, [{ name: "email", value: email }])
        .then(function () {
          form.hidden = true;
          if (sent) sent.hidden = false;
        })
        .catch(function () {
          if (err) err.hidden = false;
        })
        .then(function () {
          busy = false;
          label.textContent = original;
        });
    });
  });
})();
