# Contributing and Git workflow

Start with the [README](README.md) and [setup guide](docs/SETUP.md). Commands below assume you are in the repository root. Contributors need write access to push here; otherwise, use a fork and submit a pull request.

## Start a change

Check for unfinished local work before switching branches. Commit or otherwise preserve it first.

```powershell
git status
git switch main
git pull --ff-only
git switch -c docs/update-guide
```

Use a descriptive branch name, such as `feat/portfolio-layout`, `fix/resume-download` or `docs/update-guide`. If a fast-forward pull fails, inspect the divergence and resolve it before continuing; do not force-push to make the error disappear.

## Review and save

Keep each change focused. Update relevant documentation and the [project log](docs/PROJECT_LOG.md) in the same change. Run the checks appropriate to the change in the [development guide](docs/DEVELOPMENT.md).

For a README-only change, for example:

```powershell
git diff
git add README.md
git diff --cached
git diff --cached --check
git commit -m "docs: clarify project setup"
git push -u origin docs/update-guide
```

Replace the staged filename and branch with those you actually changed. `git add -A` is an alternative after reviewing `git status`, but it also stages untracked files and deletions, including the local Word resume if present. Check the staged list before committing.

Open a pull request against `main` on GitHub. Explain what changed, why, and which checks ran. The reviewer should be able to reproduce the result from the written instructions. Once merged, update your local `main` with `git pull --ff-only` while on that branch.

The repository owner can also commit small reviewed updates directly to `main` and run `git push`; feature branches are recommended for substantial website changes. Once deployment is configured, changes merged or pushed to `main` will be eligible to update the public site.

## Documentation standard

- Give commands a working directory and prerequisites.
- Mark future files, commands and features as planned until they exist.
- Record the result of checks, including failures and checks not run.
- Record dependency/configuration changes and any new setup steps.
- Keep actual dependency versions in the manifest and lockfile once created; keep the original research dated in the plan.
- Use relative Markdown links so documentation works in a clone and on GitHub.
- Update dates and facts from the resume source; preserve the meaning of evaluation metrics.

Never include credentials in commits. Environment files are ignored, but ignore rules do not remove files that were already tracked.
