# seachange.agency

Website for SeaChange, deployed on Vercel.

- `index.html` – home page
- `thank-you.html` – shown after the contact form is sent (`/thank-you`)
- `/insights` and `/insights/<slug>` – the blog, rendered by `api/insights.js` from the HubSpot blog
  using the page designs in `templates/list.html` and `templates/post.html`
- `assets/` – styles, fonts, images and scripts

## Blog (HubSpot)

Set these environment variables in Vercel (Settings → Environment Variables):

- `HUBSPOT_ACCESS_TOKEN` – HubSpot private app token with the `content` scope (required)
- `HUBSPOT_BLOG_ID` – only if the HubSpot account has more than one blog (optional)

Published posts show up within about 5 minutes. The first HubSpot tag of a post is its topic
(Data and dashboards, CRM, Marketing, AI). The featured image is used when set; otherwise a
brand illustration is shown. Without a token, or if HubSpot fails, the original design pages in
`templates/fallback-*.html` are served.

## Forms

Contact and newsletter forms submit to HubSpot (portal 146401104).
