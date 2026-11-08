/*
 * /insights and /insights/<slug>, rendered from the HubSpot blog.
 *
 * Needs the Vercel environment variable HUBSPOT_ACCESS_TOKEN (a HubSpot private app token
 * with the "content" scope). Optional: HUBSPOT_BLOG_ID to use only one blog.
 * If the token is missing, HubSpot fails or there are no published posts yet,
 * the original static pages in templates/fallback-*.html are served instead.
 */
const fs = require("fs");
const path = require("path");

const SITE = "https://seachange.agency";
const API = "https://api.hubapi.com/cms/v3/blogs";
const TPL = path.join(process.cwd(), "templates");
const read = (f) => fs.readFileSync(path.join(TPL, f), "utf8");

// Look of each topic (HubSpot tag name -> illustration + background). Unknown tags use DEFAULT_ART.
const ART = {
  "Data and dashboards": { img: "/assets/img/data-source.png", bg: "var(--purple-100)" },
  "CRM": { img: "/assets/img/process.png", bg: "var(--purple-50)" },
  "Marketing": { img: "/assets/img/insight.png", bg: "var(--red-50)" },
  "AI": { img: "/assets/img/insight.png", bg: "var(--sand-200)" }
};
const DEFAULT_ART = { img: "/assets/img/decision.png", bg: "var(--sand-300)" };
const TOPIC_ORDER = ["Data and dashboards", "CRM", "Marketing", "AI"];

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const stripTags = (h) => String(h || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "");

async function hs(pathname) {
  const r = await fetch(API + pathname, { headers: { Authorization: "Bearer " + process.env.HUBSPOT_ACCESS_TOKEN } });
  if (!r.ok) throw new Error("HubSpot " + r.status + " on " + pathname);
  return r.json();
}

async function loadPosts() {
  const [posts, tags, authors] = await Promise.all([
    hs("/posts?state=PUBLISHED&archived=false&sort=-publishDate&limit=100"),
    hs("/tags?limit=100").catch(() => ({ results: [] })),
    hs("/authors?limit=100").catch(() => ({ results: [] }))
  ]);
  const tagName = {};
  (tags.results || []).forEach((t) => { tagName[t.id] = t.name; });
  const author = {};
  (authors.results || []).forEach((a) => { author[a.id] = a; });
  const blogId = process.env.HUBSPOT_BLOG_ID;
  const now = Date.now();
  return (posts.results || [])
    .filter((p) => !blogId || String(p.contentGroupId) === String(blogId))
    .filter((p) => !p.publishDate || new Date(p.publishDate).getTime() <= now)
    .map((p) => {
      const a = author[p.blogAuthorId] || {};
      const cat = (p.tagIds || []).map((id) => tagName[id]).filter(Boolean)[0] || "";
      const slug = String(p.slug || p.id).split("/").filter(Boolean).pop();
      const summary = stripTags(p.postSummary) || p.metaDescription || "";
      return {
        slug,
        title: p.htmlTitle || p.name || "Untitled",
        summary,
        description: p.metaDescription || summary.slice(0, 160),
        body: p.postBody || "",
        image: p.useFeaturedImage !== false && p.featuredImage ? p.featuredImage : "",
        imageAlt: p.featuredImageAltText || "",
        date: fmtDate(p.publishDate),
        minutes: Math.max(1, Math.round(stripTags(p.postBody).split(" ").length / 200)),
        cat,
        art: ART[cat] || DEFAULT_ART,
        author: a.displayName || a.fullName || a.name || "",
        avatar: a.avatar || "",
        bio: a.bio ? stripTags(a.bio) : ""
      };
    });
}

/* ---------- pieces ---------- */
const avatar = (p, size) =>
  p.avatar
    ? `<img src="${esc(p.avatar)}" alt="" style="width: ${size}px; height: ${size}px; border-radius: 999px; object-fit: cover; background: var(--purple-50);">`
    : "";

function artBlock(p, height) {
  if (p.image) return `<div style="height: ${height}px; background: ${p.art.bg};"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" style="width: 100%; height: 100%; object-fit: cover; display: block;"></div>`;
  return `<div style="height: ${height}px; display: flex; align-items: center; justify-content: center; background: ${p.art.bg};"><img src="${p.art.img}" alt="" style="width: 96px; height: 80px; object-fit: contain;"></div>`;
}

function gridCard(p, featured) {
  return `<a class="post-card" href="/insights/${esc(p.slug)}" data-cat="${esc(p.cat)}"${featured ? " data-featured hidden" : ""} style="background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; color: var(--text-body);">
${artBlock(p, 168)}
<div style="padding: 24px; display: flex; flex-direction: column; gap: 10px; flex: 1;">
${p.cat ? `<span style="font-size: 13px; color: var(--text-accent);">${esc(p.cat)}</span>` : ""}
<span class="post-title" style="font-size: 22px; line-height: 1.25; color: var(--text-strong);">${esc(p.title)}</span>
<span style="font-size: 15px; line-height: 1.5; color: var(--text-muted);">${esc(p.summary)}</span>
<span style="margin-top: auto; padding-top: 12px; font-size: 13px; color: var(--text-muted);">${esc([p.author, p.date].filter(Boolean).join(" · "))}</span>
</div>
</a>`;
}

function relatedCard(p) {
  return `<a class="post-card" href="/insights/${esc(p.slug)}" style="background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; color: var(--text-body);">
${artBlock(p, 160)}
<div style="padding: 24px; display: flex; flex-direction: column; gap: 10px;">
${p.cat ? `<span style="font-size: 13px; color: var(--text-accent);">${esc(p.cat)}</span>` : ""}
<span class="post-title" style="font-size: 22px; line-height: 1.25; color: var(--text-strong);">${esc(p.title)}</span>
</div>
</a>`;
}

function featuredSection(p) {
  const art = p.image
    ? `<div style="flex: 1 1 420px; min-height: 340px; background: var(--sand-300);"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" style="width: 100%; height: 100%; min-height: 340px; object-fit: cover; display: block;"></div>`
    : `<div style="flex: 1 1 420px; min-height: 340px; background: var(--sand-300); display: flex; align-items: center; justify-content: center; gap: 12px; padding: 40px;">
<img src="/assets/img/data-source.png" alt="" style="width: 22%; max-width: 120px; height: auto;">
<img src="/assets/img/decision.png" alt="" style="width: 30%; max-width: 160px; height: auto;">
<img src="/assets/img/insight.png" alt="" style="width: 22%; max-width: 120px; height: auto;">
</div>`;
  return `<!-- FEATURED -->
<section id="featured" style="padding: 40px 32px 0;">
<a class="post-card" href="/insights/${esc(p.slug)}" style="max-width: 1280px; margin: 0 auto; background: var(--surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-signature); overflow: hidden; display: flex; flex-wrap: wrap; color: var(--text-body);">
${art}
<div style="flex: 1 1 420px; padding: clamp(28px, 4vw, 56px); display: flex; flex-direction: column; gap: 18px; justify-content: center;">
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px;">
<span class="badge badge-change">Featured</span>
${p.cat ? `<span style="font-size: 14px; color: var(--text-accent);">${esc(p.cat)}</span>` : ""}
</div>
<span class="post-title" style="font-size: clamp(30px, 3.4vw, 44px); line-height: 1.1; letter-spacing: -0.02em; color: var(--text-strong);">${esc(p.title)}</span>
<span style="font-size: 17px; line-height: 1.5;">${esc(p.summary)}</span>
<div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
${avatar(p, 40)}
<span style="display: flex; flex-direction: column; font-size: 14px;"><span style="color: var(--text-strong);">${esc(p.author)}</span><span style="color: var(--text-muted);">${esc(p.date)}</span></span>
</div>
</div>
</a>
</section>`;
}

/* ---------- pages ---------- */
function renderList(posts) {
  const cats = [...new Set(posts.map((p) => p.cat).filter(Boolean))]
    .sort((a, b) => (TOPIC_ORDER.indexOf(a) + 1 || 99) - (TOPIC_ORDER.indexOf(b) + 1 || 99));
  const filters = ["All"].concat(cats).map((c) =>
    `<button type="button" class="tag" aria-pressed="${c === "All"}" data-filter="${esc(c)}">${esc(c)}</button>`).join("\n");
  const grid = posts.map((p, i) => gridCard(p, i === 0)).join("\n");
  return read("list.html")
    .replace("%%FILTERS%%", filters)
    .replace("%%FEATURED%%", featuredSection(posts[0]))
    .replace("%%GRID%%", grid);
}

function renderPost(p, posts) {
  const header = `${p.cat ? `<span style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-change);">${esc(p.cat)}</span>\n` : ""}<h1 style="margin: 0; font-size: clamp(40px, 6vw, 72px); line-height: 1.04; letter-spacing: -0.03em; font-weight: 400; color: var(--text-strong);">${esc(p.title)}</h1>
${p.summary ? `<p style="margin: 0; font-size: 21px; line-height: 1.5; color: var(--text-body);">${esc(p.summary)}</p>` : ""}
<div style="display: flex; align-items: center; gap: 14px;">
${avatar(p, 48)}
<span style="display: flex; flex-direction: column; font-size: 15px;"><span style="color: var(--text-strong);">${esc(p.author)}</span><span style="color: var(--text-muted);">${esc([p.date, p.minutes + " min read"].filter(Boolean).join(" · "))}</span></span>
</div>`;
  const hero = p.image
    ? `<div style="padding: 48px 32px 0;"><div style="max-width: 1120px; margin: 0 auto; border-radius: var(--radius-signature); overflow: hidden; background: var(--sand-300);"><img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" style="display: block; width: 100%; max-height: 560px; object-fit: cover;"></div></div>`
    : `<div style="padding: 48px 32px 0;">
<div style="max-width: 1120px; margin: 0 auto; min-height: 320px; background: var(--sand-300); border-radius: var(--radius-signature); display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 48px 24px;">
<img src="/assets/img/process.png" alt="" style="width: 140px; height: auto;">
<span aria-hidden="true" style="width: 56px; border-top: 2px dashed var(--sand-600);"></span>
<img src="/assets/img/data-source.png" alt="" style="width: 110px; height: auto;">
<span aria-hidden="true" style="width: 56px; border-top: 2px dashed var(--sand-600);"></span>
<img src="/assets/img/decision.png" alt="" style="width: 150px; height: auto;">
<span aria-hidden="true" style="width: 56px; border-top: 2px dashed var(--sand-600);"></span>
<img src="/assets/img/insight.png" alt="" style="width: 120px; height: auto;">
</div>
</div>`;
  const author = p.author
    ? `<section style="padding: 48px 32px 0;">
<div style="max-width: 880px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 20px; align-items: center; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 28px 0;">
${avatar(p, 72)}
<div style="flex: 1 1 360px; display: flex; flex-direction: column; gap: 4px;">
<span style="font-size: 18px; color: var(--text-strong);">${esc(p.author)}</span>
${p.bio ? `<span style="font-size: 15px; color: var(--text-muted);">${esc(p.bio)}</span>` : ""}
</div>
</div>
</section>`
    : "";
  const others = posts.filter((x) => x.slug !== p.slug);
  const sameCat = others.filter((x) => x.cat && x.cat === p.cat);
  const related = sameCat.concat(others.filter((x) => sameCat.indexOf(x) < 0)).slice(0, 3);
  const relatedHtml = related.length
    ? `<section style="padding: 72px 32px 120px;">
<div style="max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 28px;">
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px;">
<h2 style="margin: 0; font-size: clamp(28px, 3.5vw, 40px); line-height: 1.1; letter-spacing: -0.02em; font-weight: 400; color: var(--text-strong);">Keep reading</h2>
<a href="/insights" style="font-size: 16px;">All insights →</a>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
${related.map(relatedCard).join("\n")}
</div>
</div>
</section>`
    : `<div style="height: 120px;"></div>`;
  const fill = { TITLE: esc(p.title), DESC: esc(p.description), OGIMAGE: esc(p.image || SITE + "/assets/img/logo-seachange.png"), CANONICAL: SITE + "/insights/" + esc(p.slug), HEADER: header, HERO: hero, BODY: p.body, AUTHOR: author, RELATED: relatedHtml };
  return read("post.html").replace(/%%([A-Z]+)%%/g, (m, k) => (k in fill ? fill[k] : m));
}

function send(res, status, html, cache) {
  res.statusCode = status;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", cache);
  res.end(html);
}

// /insights?debug=1 : shows what HubSpot answers (never shows the token).
async function debug(res) {
  const out = { tokenSet: !!process.env.HUBSPOT_ACCESS_TOKEN, blogIdFilter: process.env.HUBSPOT_BLOG_ID || null, calls: {} };
  if (out.tokenSet) {
    for (const [name, p] of [["posts (all states)", "/posts?limit=20&sort=-updated"], ["tags", "/tags?limit=20"], ["authors", "/authors?limit=20"]]) {
      try {
        const r = await fetch(API + p, { headers: { Authorization: "Bearer " + process.env.HUBSPOT_ACCESS_TOKEN } });
        const text = await r.text();
        let info = { status: r.status };
        if (r.ok) {
          const j = JSON.parse(text);
          info.count = (j.results || []).length;
          if (name.startsWith("posts")) info.posts = (j.results || []).map((x) => ({ title: x.htmlTitle || x.name, state: x.state, currentState: x.currentState, publishDate: x.publishDate, slug: x.slug, blogId: x.contentGroupId }));
          if (name === "tags") info.names = (j.results || []).map((x) => x.name);
        } else {
          info.error = text.slice(0, 400);
        }
        out.calls[name] = info;
      } catch (e) {
        out.calls[name] = { error: String(e && e.message) };
      }
    }
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(out, null, 2));
}

module.exports = async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.searchParams.get("debug") === "1") return debug(res);
  const slug = (url.searchParams.get("slug") || "").replace(/[^a-z0-9_-]/gi, "");
  const FRESH = "public, s-maxage=300, stale-while-revalidate=60";

  let posts = [];
  if (process.env.HUBSPOT_ACCESS_TOKEN) {
    try {
      posts = await loadPosts();
    } catch (e) {
      console.error(e);
    }
  }

  if (posts.length) {
    if (!slug) return send(res, 200, renderList(posts), FRESH);
    const p = posts.find((x) => x.slug === slug);
    if (p) return send(res, 200, renderPost(p, posts), FRESH);
  }

  // Fallback: the original static pages from the design.
  if (!slug) return send(res, 200, read("fallback-list.html"), "public, s-maxage=60");
  const file = "fallback-" + slug + ".html";
  if (fs.existsSync(path.join(TPL, file))) return send(res, 200, read(file), "public, s-maxage=60");
  res.statusCode = 302;
  res.setHeader("Location", "/insights");
  res.end();
};
