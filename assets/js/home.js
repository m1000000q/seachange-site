/* Home page interactions: hero example answers, services explorer, contact form, chat widget. */
(function () {
  // Language pack: the Spanish page loads home-es.js first, which sets window.SC_HOME.
  var L = window.SC_HOME || {};
  var UI = L.ui || {};
  function t(key, en) { return UI[key] || en; }
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function srcChips(list) {
    return list.map(function (s) { return '<span style="padding: 3px 8px; background: var(--surface-sunken); border-radius: 999px; color: var(--text-body);">' + esc(s) + "</span>"; }).join("");
  }

  // Ask bars: enable the arrow button only when there is text; call onAsk for suggestions and submits.
  function wireAskBar(form, onAsk) {
    var input = form.querySelector("input");
    var go = form.querySelector(".askbar-go");
    input.addEventListener("input", function () { go.disabled = !input.value.trim(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      onAsk(v);
      input.value = "";
      go.disabled = true;
    });
    form.querySelectorAll(".askbar-sugs button").forEach(function (b) {
      b.addEventListener("click", function () { onAsk(b.getAttribute("data-q")); });
    });
  }

  /* ---------- Hero example answers ---------- */
  var QA = L.QA || [
    { q: "Where's my pipeline stuck?", a: "Most of it is sitting at Proposal. 14 deals worth £212k haven't moved in over 30 days. Next step: review the 9 stalled deals with Sam and Priya.", s: ["Zoho CRM", "Pipeline report"] },
    { q: "What's driving growth this quarter?", a: "Repeat customers. Revenue from existing accounts is up on last quarter while new-customer revenue is flat. Next step: look at which accounts expanded and why.", s: ["Finance system", "Zoho CRM"] },
    { q: "Which customers are most valuable?", a: "Your top 20 accounts bring in over half of revenue, and most came through referrals. Next step: build a referral ask into your account reviews.", s: ["Finance system", "Zoho CRM"] }
  ];
  wireAskBar(document.getElementById("hero-ask"), function (text) {
    var x = QA.filter(function (x) { return x.q === text; })[0];
    if (!x) return;
    document.getElementById("hero-q").textContent = x.q;
    document.getElementById("hero-a").textContent = x.a;
    document.getElementById("hero-src").innerHTML = srcChips(x.s);
  });

  /* ---------- Services explorer ---------- */
    var S = L.S || [
      { num: "01", name: "Foundations", icon: "layout-grid", kicker: "Foundations", title: "Giving every number a meaning.", body: "We start by understanding how your business really works, so every dashboard answers the questions that matter.",
        groups: [{ h: "What we map", items: [
          { t: "ICP", d: "The customers worth winning, defined with your own data" },
          { t: "Buyers", d: "Who signs, who influences and what each one needs" },
          { t: "Customer journey", d: "Every step from first touch to renewal, mapped to your systems" },
          { t: "Market analysis", d: "Where demand is, who you compete with and where to focus" }] }] },
      { num: "02", name: "CRM audit & maintenance", icon: "database", kicker: "CRM", title: "A CRM your team can trust.", body: "We find what is broken, agree what your records mean and set up routines that keep them clean.",
        groups: [
          { h: "Diagnosis", items: [
            { t: "Audit", d: "Fields, stages, duplicates and integrations" },
            { t: "Licences", d: "Check which licences and modules you actually use" },
            { t: "Definitions", d: "Agree what a lead and a deal mean in your business" }] },
          { h: "Hygiene routines", items: [
            { t: "Clean up", d: "Clean and de-duplicate existing records" },
            { t: "Validation", d: "Rules so bad data can't get in" },
            { t: "Regular checks", d: "Routines your team can keep up" }] }] },
      { num: "03", name: "Revenue dashboard", icon: "gauge", kicker: "Revenue dashboard", title: "One dashboard from lead to recurring revenue.", body: "We integrate your CRM, finance and marketing systems so the whole funnel sits in one place.",
        groups: [{ h: "The whole funnel", items: [
          { t: "Leads", d: "Volume and source, against last quarter" },
          { t: "Opportunities", d: "What is in the pipeline and where it is moving" },
          { t: "New customers", d: "Who converted and what brought them in" },
          { t: "Recurring revenue", d: "Revenue that keeps coming, tracked over time" }] }] },
      { num: "04", name: "Talk to your data", icon: "sparkles", kicker: "Talk to your data", title: "Dashboards you can talk to.", body: "You talk to your data in plain English. It talks back, with briefings on what has changed.",
        groups: [
          { h: "You ask", items: [
            { t: "Plain English", d: "Ask the way you would ask a colleague" },
            { t: "Sources cited", d: "Every answer shows where its numbers came from" }] },
          { h: "Your data tells you", items: [
            { t: "The answer", d: "The finding, the number behind it and the next step" },
            { t: "Weekly briefings", d: "What changed this week, without asking" }] }] },
      { num: "05", name: "Automation & custom tools", icon: "zap", kicker: "Automation", title: "Tools built around how you work.", body: "We automate the repetitive work and build custom tools where generic software falls short.",
        groups: [{ h: "Examples", items: [
          { t: "Inbound triage", d: "Every enquiry is read, classified and routed to the right person, with nothing left in a shared inbox" },
          { t: "RFP draft and review", d: "Built around your own answer library and approval steps, so drafts are faster and more accurate than generic software" },
          { t: "Branded templates", d: "One-pagers and decks built on your brand template in minutes. No designing from scratch or sending out to an agency" }] }] },
      { num: "06", name: "Marketing engine", icon: "settings", kicker: "Marketing", title: "Marketing engine and martech stack.", body: "Built for small marketing teams: plan, create and track every campaign in one place, on a stack that fits.",
        groups: [
          { h: "Marketing engine", items: [
            { t: "Campaign calendar", d: "Every campaign planned in one place" },
            { t: "Campaign feedback", d: "Input from sales, built in" },
            { t: "Shared assets", d: "One home for the content your team uses" },
            { t: "Results by campaign", d: "See what each campaign delivered" }] },
          { h: "Martech consultation", items: [
            { t: "Review", d: "The tools you pay for, what each one does and where they overlap" },
            { t: "Plan", d: "What to keep, connect, resize or retire" }] }] },
      { num: "07", name: "Custom projects", icon: "git-merge", kicker: "Custom projects", title: "Beyond sales and marketing.", body: "The same discovery works anywhere you have data and questions. If it has data and a question behind it, we can help you join it up.",
        groups: [{ h: "Where it applies", items: [
          { t: "Sales and marketing", d: "Where most clients start" },
          { t: "Finance", d: "Revenue, spend and forecasts joined up" },
          { t: "Operations", d: "Delivery, capacity and process data" },
          { t: "People and client service", d: "Teams, service levels and client health" }] }] },
      { num: "08", name: "Fractional marketing", icon: "users", kicker: "Fractional marketing", title: "Marketing support, when you need it.", body: "Experienced marketing and sales people who work alongside your team. Flexible: scale up for a launch, and back down when things are steady. Grounded in the insight from your dashboards.",
        groups: [
          { h: "Plan and run", items: [
            { t: "Marketing campaigns", d: "Plan, run and measure campaigns that reach the right people" },
            { t: "Go-to-market strategy", d: "Who to target, what to say and where to show up" },
            { t: "LinkedIn and content", d: "Content that works for your buyers, and better use of Sales Navigator" }] },
          { h: "Sales alignment", items: [
            { t: "Sales enablement", d: "The content, tools and processes your sales team needs" },
            { t: "Aligned teams", d: "Sales and marketing working to shared goals, with feedback both ways" },
            { t: "Outreach and discovery", d: "Choosing outreach tools and shaping better discovery calls" }] }] }
    ];
    var POP = L.POP || {
      "Foundations": { sub: "Strategy · Where every engagement starts", chips: ["Sales", "Marketing", "Leadership"], steps: [1, 0, 0, 0], rows: [["Best for", "Teams that want every number to mean something"], ["You get", "ICP, buyers, customer journey and market analysis"], ["Built from", "Your own CRM and finance data"]] },
      "CRM audit & maintenance": { sub: "CRM · Diagnosis and hygiene", chips: ["Audit", "Clean-up", "Validation"], steps: [1, 1, 0, 0], rows: [["Best for", "CRMs nobody fully trusts"], ["You get", "Clean records, agreed definitions, routines your team keeps up"], ["Result", "Leaner: CRM requirements and costs resized"]] },
      "Revenue dashboard": { sub: "Dashboards · Lead to recurring revenue", chips: ["CRM", "Finance", "Marketing"], steps: [0, 1, 1, 0], rows: [["Best for", "Leaders who want the whole funnel in one place"], ["Tracks", "Leads, opportunities, new customers, recurring revenue"], ["Joins up", "CRM, finance and marketing systems"]] },
      "Talk to your data": { sub: "AI · Dashboards you can talk to", chips: ["Plain English", "Sources cited", "Weekly briefings"], steps: [0, 0, 1, 1], rows: [["Best for", "Teams who need answers, not more reports"], ["You ask", "Where's my pipeline stuck?"], ["You get", "The answer, the number and the next step"], ["Security", "The assistant only sees data if switched on"]] },
      "Automation & custom tools": { sub: "Automation · Built around how you work", chips: ["Inbound triage", "RFP drafts", "Templates"], steps: [0, 1, 0, 1], rows: [["Best for", "Repetitive work that eats your team's week"], ["Examples", "Enquiry routing, RFP drafts, branded one-pagers"], ["Result", "Sharper: RFP software replaced with a custom tool"]] },
      "Marketing engine": { sub: "Marketing · Engine and martech stack", chips: ["Campaigns", "Shared assets", "Martech review"], steps: [1, 1, 0, 1], rows: [["Best for", "Small marketing teams"], ["You get", "Plan, create and track every campaign in one place"], ["Result", "Faster: less time spent creating campaigns"]] },
      "Custom projects": { sub: "Beyond sales and marketing", chips: ["Finance", "Operations", "People", "Client service"], steps: [1, 1, 1, 1], rows: [["Best for", "Any team with data and a question behind it"], ["Starts with", "The same discovery: how your business really works"]] },
      "Fractional marketing": { sub: "People · Marketing support when you need it", chips: ["Flexible", "Grounded in your data"], steps: [1, 0, 0, 1], rows: [["Best for", "Launches, busy periods and teams between hires"], ["You get", "Campaigns, go-to-market, sales enablement, content"], ["How", "Scale up for a launch, back down when steady"]] }
    };
  var STEP_NAMES = L.STEP_NAMES || ["Understand", "Connect", "Ask", "Decide"];
  var INTMAP = L.INTMAP || { "Foundations": "Foundations", "CRM audit & maintenance": "CRM audit", "Revenue dashboard": "Revenue dashboard", "Talk to your data": "Talk to your data", "Automation & custom tools": "Automation", "Marketing engine": "Marketing engine", "Custom projects": "Not sure yet", "Fractional marketing": "Fractional marketing" };
  var cur = 3;
  var grid = document.getElementById("svc-grid");
  var tiles = [];

  S.forEach(function (s, i) {
    var p = POP[s.name];
    var popId = "svc-pop-" + i;
    var wrap = el("div", { "class": "svc" });
    var tile = el("div", { "class": "svc-tile" });
    var btn = el("button", { "class": "svc-btn", type: "button", "aria-pressed": "false", "aria-describedby": popId },
      '<img alt="" style="width: 28px; height: 28px; object-fit: contain;"><span class="svc-name">' + esc(s.name) + "</span>");
    tile.appendChild(btn);
    tile.appendChild(el("span", { "class": "svc-more" }, t("more", "What's included →")));
    btn.addEventListener("click", function () { select(i); });

    var side = (i % 4 === 3 ? "l4" : "r4") + " " + (i % 2 === 1 ? "l2" : "r2");
    var steps = p.steps.map(function (on, j) {
      return '<div style="display: flex; flex-direction: column; gap: 5px;"><span style="display: block; height: 6px; border-radius: 999px; background: ' + (on ? "var(--purple-500)" : "rgba(87,64,146,0.15)") + ';"></span><span style="font-size: 11px; color: ' + (on ? "var(--text-strong)" : "var(--text-muted)") + ';">' + STEP_NAMES[j] + "</span></div>";
    }).join("");
    var rows = p.rows.map(function (r) {
      return '<div style="display: flex; justify-content: space-between; gap: 16px; padding: 6px 0; font-size: 13px; line-height: 1.4;"><span style="flex: none; color: var(--text-muted);">' + esc(r[0]) + '</span><span style="text-align: right; color: var(--text-strong);">' + esc(r[1]) + "</span></div>";
    }).join("");
    var chips = p.chips.map(function (c) { return '<span style="padding: 4px 10px; border-radius: 999px; background: rgba(87,64,146,0.10); color: var(--purple-700); font-size: 12px;">' + esc(c) + "</span>"; }).join("");
    var pop = el("div", { "class": "svc-pop " + side, role: "tooltip", id: popId },
      '<div style="display: flex; flex-direction: column; gap: 2px;"><span style="font-size: 18px; line-height: 1.25; color: var(--text-strong);">' + esc(s.name) + '</span><span style="font-size: 13px; color: var(--text-muted);">' + esc(p.sub) + "</span></div>" +
      '<div style="display: flex; flex-wrap: wrap; gap: 6px;">' + chips + "</div>" +
      '<div style="display: flex; flex-direction: column; gap: 8px;"><span style="font-size: 12px; color: var(--text-muted);">' + t("where", "Where it sits in how we work") + '</span><div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4px;">' + steps + "</div></div>" +
      '<div style="display: flex; flex-direction: column; border-top: 1px solid rgba(34,30,27,0.10); padding-top: 10px;">' + rows + "</div>" +
      '<a class="cta" href="#contact" style="position: relative; display: inline-flex; align-self: flex-start; margin: 4px 0 2px;"><span aria-hidden="true" style="position: absolute; inset: -4px 3px 3px -3px; border: 1.5px solid var(--purple-300); border-radius: 12px; transform: rotate(-0.6deg); pointer-events: none;"></span><span class="cta-face" style="position: relative; display: inline-flex; align-items: center; min-height: 44px; padding: 0 20px; background: var(--purple-500); color: #FFFFFF; border-radius: 10px; font-size: 15px;">' + t("startWith", "Start with this →") + '</span></a>');
    pop.querySelector("a").addEventListener("click", function () { preselect(s.name); });
    wrap.appendChild(tile);
    wrap.appendChild(pop);
    grid.appendChild(wrap);
    tiles.push({ tile: tile, btn: btn, img: btn.querySelector("img"), icon: s.icon });
  });

  function select(i) {
    cur = i;
    tiles.forEach(function (t, j) {
      var on = j === i;
      t.tile.classList.toggle("on", on);
      t.btn.setAttribute("aria-pressed", on ? "true" : "false");
      t.img.src = "/assets/img/icons/" + t.icon + (on ? "-on" : "") + ".png";
    });
    var s = S[i];
    document.getElementById("svc-kicker").textContent = s.kicker;
    document.getElementById("svc-title").textContent = s.title;
    document.getElementById("svc-body").textContent = s.body;
    document.getElementById("svc-groups").innerHTML = s.groups.map(function (g) {
      return '<div style="background: var(--surface-sunken); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 14px;"><h4 style="margin: 0; font-size: 20px; font-weight: 400; color: var(--text-accent);">' + esc(g.h) + '</h4><ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 12px;">' +
        g.items.map(function (it) {
          return '<li style="display: flex; gap: 10px; align-items: flex-start;"><img src="/assets/img/icons/check.png" alt="" style="margin-top: 4px; width: 16px; height: 16px; flex: none; object-fit: contain;"><span style="display: flex; flex-direction: column; gap: 2px;"><span style="font-size: 16px; color: var(--text-strong);">' + esc(it.t) + '</span><span style="font-size: 14px; line-height: 1.45; color: var(--text-muted);">' + esc(it.d) + "</span></span></li>";
        }).join("") + "</ul></div>";
    }).join("");
  }
  select(cur);
  document.getElementById("svc-go").addEventListener("click", function () { preselect(S[cur].name); });

  /* ---------- Contact form ---------- */
  var interestBtns = document.querySelectorAll("[data-interest]");
  interestBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });
  function preselect(name) {
    var label = INTMAP[name];
    interestBtns.forEach(function (b) { if (b.getAttribute("data-interest") === label) b.setAttribute("aria-pressed", "true"); });
  }

  var form = document.getElementById("contact-form");
  var sendLabel = document.getElementById("send-label");
  var sendErr = document.getElementById("send-err");
  var sending = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (sending) return;
    var fd = new FormData(form);
    var picked = [];
    interestBtns.forEach(function (b) { if (b.getAttribute("aria-pressed") === "true") picked.push(b.getAttribute("data-interest")); });
    var msg = (L.lang ? "Site language: " + L.lang + "\n\n" : "") + (picked.length ? "Interested in: " + picked.join(", ") + "\n\n" : "") + "Question: " + (fd.get("question") || "");
    var fields = ["firstname", "lastname", "email", "company", "phone"].map(function (n) { return { name: n, value: fd.get(n) || "" }; })
      .concat([{ name: "message", value: msg }])
      .filter(function (f) { return f.value !== ""; });
    sending = true;
    sendErr.hidden = true;
    sendLabel.textContent = t("sending", "Sending…");
    window.SeaChangeForms.submit(window.SeaChangeForms.HS.contact, fields)
      .then(function () { window.location.href = t("thanksUrl", "/thank-you"); })
      .catch(function () {
        sending = false;
        sendLabel.textContent = t("send", "Send →");
        sendErr.hidden = false;
      });
  });

  /* ---------- Chat widget ---------- */
  var panel = document.getElementById("chat-panel");
  var toggle = document.getElementById("chat-toggle");
  var chatLabel = document.getElementById("chat-label");
  var log = document.getElementById("chat-log");
  function setChat(open) {
    panel.hidden = !open;
    panel.style.display = open ? "flex" : "";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    chatLabel.textContent = open ? t("close", "Close") : t("ask", "Ask SeaChange");
    if (open) panel.querySelector("input").focus();
  }
  toggle.addEventListener("click", function () { setChat(panel.hidden); });
  document.getElementById("chat-close").addEventListener("click", function () { setChat(false); toggle.focus(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setChat(false); toggle.focus(); } });

  function reply(text) {
    if (L.reply) return L.reply(text);
    var t = (text || "").toLowerCase();
    if (/price|cost|how much|fee/.test(t)) return { text: "It depends on the size of the pilot. Tell us your question in the form at the bottom of the page and we'll send you a proposal.", sources: ["Starting a pilot"] };
    if (/pilot|start|begin/.test(t)) return { text: "A pilot has three steps: pick the one question your team can't answer quickly today, we connect the data behind it, then we review the answer together and decide what to build next.", sources: ["Starting a pilot"] };
    if (/secur|safe|privacy|claude|gdpr/.test(t)) return { text: "Dashboards, syncs and permissions run on our server and in the browser. Keys and tokens stay with us, encrypted at rest. The AI assistant only sees data if it's switched on, and it can be limited to aggregates or named people.", sources: ["Security"] };
    if (/service|offer|crm|dashboard|automat|marketing|rfp/.test(t)) return { text: "We offer Foundations, CRM audit and maintenance, a revenue dashboard, talk to your data, automation and custom tools, and a marketing engine. Plus custom projects and fractional marketing.", sources: ["Services"] };
    return { text: "Good question. The best next step is a short conversation: leave your details in the form at the bottom and we'll come back to you.", sources: [] };
  }
  wireAskBar(document.getElementById("chat-ask"), function (text) {
    var r = reply(text);
    log.appendChild(el("div", { "class": "msg-user" }, "<div>" + esc(text) + "</div>"));
    log.appendChild(el("div", { "class": "msg-bot" },
      '<div class="msg-avatar"><img src="/assets/img/mark.png" alt=""></div><div class="msg-body" style="font-size: 15px;"><span>' + esc(r.text) + "</span>" +
      (r.sources.length ? '<div class="sources">' + t("sources", "Sources:") + r.sources.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + "</div>" : "") + "</div>"));
    log.scrollTop = log.scrollHeight;
  });
})();
