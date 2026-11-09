# seachange.agency

Website for SeaChange, deployed on Vercel.

- `index.html` – home page (English); `es/index.html` – Spanish (`/es`)
- `thank-you.html` – shown after the contact form is sent (`/thank-you`)
- `/insights` and `/insights/<slug>` – the blog, rendered by `api/insights.js` from the HubSpot blog
  using the page designs in `templates/list.html` and `templates/post.html`
- `assets/` – styles, fonts, images and scripts

## Blog (HubSpot) – paused

The Insights section is switched off for now: `vercel.json` redirects `/insights` to the home page
and the menu links were removed. To switch it back on, replace the `redirects` in `vercel.json` with:

```json
"rewrites": [
  { "source": "/insights", "destination": "/api/insights" },
  { "source": "/insights/:slug", "destination": "/api/insights?slug=:slug" }
]
```

and add the "Insights" links back to the menus (home, thank-you) and the home footer.


Set these environment variables in Vercel (Settings → Environment Variables):

- `HUBSPOT_ACCESS_TOKEN` – HubSpot private app token with the `content` scope (required)
- `HUBSPOT_BLOG_ID` – only if the HubSpot account has more than one blog (optional)

Published posts show up within about 5 minutes. The first HubSpot tag of a post is its topic
(Data and dashboards, CRM, Marketing, AI). The featured image is used when set; otherwise a
brand illustration is shown. Without a token, or if HubSpot fails, the original design pages in
`templates/fallback-*.html` are served.

## Pulse demo (/demo-pulse)

`/demo-pulse` is proxied to the Pulse app (`m1000000q/pulse`, production at
https://pulse-sc-c201.vercel.app, built with base path `/demo-pulse`). It is reachable by direct link
only: nothing on this site links to it, and the app tells search engines not to index it.

## Spanish version

`/es` and `/es/gracias` are generated from the English pages: edit `index.html` / `thank-you.html`,
add any new text to `tools/es/dict.py`, then run `python3 tools/es/build.py`. The interactive parts of
the home page (services, example questions, chat) take their Spanish text from `assets/js/home-es.js`.
Neutral Spanish, informal "tú".

## Email assets

`email/` holds images used in email signatures and templates (for example
`https://www.seachange.agency/email/seachange-mark.png`). Keep these URLs stable: emails already
sent point at them.

## Forms

Contact and newsletter forms submit to HubSpot (portal 146401104).
