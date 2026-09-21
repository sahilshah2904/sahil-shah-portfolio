# GitHub Pages deployment

## Status and destination

Deployment is planned. No workflow or application build exists in this revision, and repository Pages settings have not been verified. A successful Git push currently publishes repository files only; it does not establish that a website has been deployed.

| Setting | Intended value |
| --- | --- |
| Repository | `sahilshah2904/sahil-shah-portfolio` |
| Production branch | `main` |
| Website URL | `https://sahilshah2904.github.io/sahil-shah-portfolio/` |
| Astro `site` | `https://sahilshah2904.github.io` |
| Astro `base` | `/sahil-shah-portfolio` |
| Build output | Static `dist/` artifact |
| Workflow file | `.github/workflows/deploy.yml` (to be created) |

## Application configuration

The eventual `astro.config.mjs` should include the following settings alongside the selected styling and sitemap integrations:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://sahilshah2904.github.io",
  base: "/sahil-shah-portfolio",
  output: "static",
});
```

All internal asset and download URLs must include the project base path. Test that the PDF resolves at `/sahil-shah-portfolio/Sahil_Shah_Resume.pdf`. [Astro deployment reference](https://docs.astro.build/en/guides/deploy/github/).

## First deployment procedure

Prerequisites: a committed application, lockfile, passing production build, configured checks and repository settings access.

1. Add the deployment workflow based on [Astro's maintained GitHub Pages workflow](https://docs.astro.build/en/guides/deploy/github/). Record the actual action versions and Node runtime when implemented.
2. Make checks and build succeed before publishing. Use lockfile-based dependency installation. Upload `dist/` as the Pages artifact.
3. Configure deployment for pushes to `main` and manual dispatch, with read access to contents and the Pages/OIDC permissions needed by the official workflow. Use the `github-pages` environment and prevent conflicting deployments.
4. In the repository, open Settings → Pages → Build and deployment → Source, and select GitHub Actions. [GitHub publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
5. Push the completed changes. In Actions, inspect the run for that commit and confirm deployment succeeds.
6. Open the deployed URL and perform the release checks below.

Do not treat this guide as an executable workflow. The actual YAML must be created and tested during the deployment milestone.

## Release checks

- Confirm the successful Actions run corresponds to the intended commit.
- Open the HTTPS website and reload it directly.
- Check CSS, scripts, SVGs and resume download under the repository path.
- Test navigation, email and verified external links on mobile and desktop.
- Confirm reduced-motion behaviour and readable keyboard focus.
- Check title, description, canonical URL, social metadata and sitemap against the production URL.
- Record the commit, workflow run URL, test outcomes and deployed URL in the project log.

For later releases, merge reviewed changes to `main` and repeat these checks after the deployment finishes.

## Failures and recovery

| Symptom | Investigation |
| --- | --- |
| Website 404 | Verify Pages source, successful deployment, repository path and artifact contents. |
| Page loads without assets | Inspect requested URLs and the Astro `base` setting. |
| PDF 404 | Check the public copy exists, filename case and base-aware link. |
| Build fails | Read the failed Actions step; reproduce it with the same Node version and lockfile. |
| Old content remains | Compare the deployment commit with the intended commit; inspect the workflow run and browser cache. |

For a bad deployed change, identify the specific offending commit, preserve local work, and create a reviewed revert commit on a branch. For an ordinary non-merge commit, `git revert COMMIT_SHA` creates the inverse change without rewriting history. Merge commits require separate review of the correct parent. Merge the fix into `main`, then verify the new deployment.

The previous site may remain available if a new build fails; confirm the actual deployment state instead of assuming it changed.
