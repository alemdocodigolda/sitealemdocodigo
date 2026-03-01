# GitHub Pages + Cloudflare (SEO-safe)

## 1) GitHub Pages deployment

This repository already includes a workflow for Pages deployment:

- `.github/workflows/deploy-pages.yml`
- `.nojekyll`

In GitHub:

1. Go to `Settings > Pages`.
2. In `Build and deployment`, choose `Source: GitHub Actions`.
3. Ensure your default branch is `main` (or update the workflow branch trigger if needed).
4. Push to `main` and confirm the workflow "Deploy GitHub Pages" succeeds.

## 2) Configure custom domain in GitHub

In `Settings > Pages > Custom domain`:

1. Set `alemdocodigo.pt`.
2. Save and enable `Enforce HTTPS` when available.

Reference: GitHub notes that custom domain is configured in repository settings (not automatically by a `CNAME` file when using custom workflows).

## 3) Cloudflare DNS (zone: `alemdocodigo.pt`)

Create/confirm these records (Proxy status: **Proxied**):

- `A` `@` -> `185.199.108.153`
- `A` `@` -> `185.199.109.153`
- `A` `@` -> `185.199.110.153`
- `A` `@` -> `185.199.111.153`
- `AAAA` `@` -> `2606:50c0:8000::153`
- `AAAA` `@` -> `2606:50c0:8001::153`
- `AAAA` `@` -> `2606:50c0:8002::153`
- `AAAA` `@` -> `2606:50c0:8003::153`
- `CNAME` `www` -> `<SEU_USER>.github.io`

## 4) Cloudflare Bulk Redirects (301)

CSV already prepared:

- `cloudflare/bulk-redirects.csv`

In Cloudflare:

1. Go to `Rules > Bulk Redirects`.
2. Create a new list and import `cloudflare/bulk-redirects.csv`.
3. Create a Bulk Redirect Rule and attach that list.
4. Deploy the rule.

The CSV includes:

- `www.alemdocodigo.pt/*` -> `https://alemdocodigo.pt/*` (301)
- all legacy WordPress slugs -> `https://alemdocodigo.pt/` (301)
- legacy sitemap endpoints -> `https://alemdocodigo.pt/sitemap.xml` (301)

## 5) Recommended Cloudflare SSL settings

In `SSL/TLS`:

- Encryption mode: `Full`
- Enable `Always Use HTTPS`

## 6) Quick verification after deploy

```bash
curl -I https://alemdocodigo.pt/
curl -I https://www.alemdocodigo.pt/
curl -I https://alemdocodigo.pt/creditocasa-pt/
curl -I https://alemdocodigo.pt/wp-sitemap.xml
```

Expected:

- `www` -> `301` to apex
- old slugs -> `301` to `/`
- `/wp-sitemap.xml` -> `301` to `/sitemap.xml`
- homepage and `/sitemap.xml` returning `200`

## Official references

- GitHub Pages custom workflows: <https://docs.github.com/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages>
- GitHub Pages publishing source and custom domain note: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
- GitHub custom domain DNS values: <https://docs.github.com/articles/setting-up-an-apex-domain-and-www-subdomain>
- Cloudflare Bulk Redirects CSV format: <https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/>
- Cloudflare Bulk Redirect matching and parameters: <https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/how-it-works/>
