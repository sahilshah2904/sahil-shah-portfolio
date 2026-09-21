# Setup and reproduction

Status: the Astro application and lockfile are present. These instructions reproduce the implemented site; the original Git setup is retained as history below.

## Prerequisites

Use Git, a text editor, Node.js and npm. The implementation environment uses Node.js `24.13.0` and npm `11.6.2` on Windows PowerShell. `.nvmrc` records the Node version used by the deployment workflow.

```powershell
git --version
node --version
npm --version
```

GitHub CLI is optional. GitHub account access is required to push to the original repository or configure its Pages settings; read access is enough to clone a public repository.

## Clone on another machine

Run from the parent directory in which you want the project folder:

```powershell
git clone https://github.com/sahilshah2904/sahil-shah-portfolio.git
cd sahil-shah-portfolio
git remote -v
git status --short --branch
git log -3 --oneline
```

Expected: `origin` points to the repository, the branch is `main`, and a fresh clone has no local changes. Continue from the repository root:

```powershell
npm ci
npm run dev
```

Open the terminal's URL, including `/sahil-shah-portfolio/` (normally `http://localhost:4321/sahil-shah-portfolio/`). Stop the server with Ctrl+C. For a production preview run `npm run build`, then `npm run preview`. The build refreshes the public PDF from the source file.

The author's existing checkout is `S:\AI_Engineer_Journey\Projects\Resume_Profile`. Its local directory name does not need to match the GitHub repository name. Do not initialise it again or add a second `origin`.

## How the original repository was connected

Historical procedure only: these commands were used for the existing resume folder when it was not yet a Git repository and the remote had no commits.

```powershell
git init -b main
git remote add origin https://github.com/sahilshah2904/sahil-shah-portfolio.git
```

The owner created `.gitignore` in the repository root, with each pattern starting at the first column:

```gitignore
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
playwright-report/
test-results/
```

The initial files were committed and pushed:

```powershell
git add .gitignore WEBSITE_PLAN.md Sahil_Shah_Resume.pdf
git commit -m "Add resume and portfolio website plan"
git push -u origin main
```

Leading spaces in the first ignore file prevented matches. They were removed and committed separately. See the [project log](PROJECT_LOG.md) for the observed commit IDs.

## Verify ignore rules

These commands test hypothetical paths; the files do not need to exist:

```powershell
git check-ignore -v --no-index node_modules/example.js dist/index.html .astro/example .env .env.local playwright-report/index.html test-results/example
git check-ignore -v --no-index .env.example
```

The first command should report the matching exclusion rules. The second should display `!.env.example`, an exception allowing an example environment file to be tracked. No environment variables are currently required or defined for the planned static site.

## First-time commit identity

If Git asks for your identity, set it for this repository using your own details:

```powershell
git config user.name "Your Name"
git config user.email "YOUR_GITHUB_EMAIL"
```

Use the verified email or GitHub-provided no-reply address you intend to associate with commits. Authenticate through the Git credential manager/browser when requested.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| `npm.ps1` blocked by PowerShell | Try the Windows launcher `npm.cmd`; use `npx.cmd` for npx. |
| npm reports missing `package.json` | Confirm you are in the repository root containing the manifest. |
| `remote origin already exists` | Run `git remote -v`; an existing correct remote requires no change. |
| Push denied or authentication failed | Confirm the signed-in account has repository write access. |
| Push rejected because remote has new commits | Preserve local work, fetch and review the changes, then integrate them. |
| Generated files appear in Git | Check ignore spelling/indentation and whether those files are already tracked. |
| Git reports dubious ownership | Use your normal account. For a known, trusted checkout inspected by a separate automation account, a command-scoped `git -c safe.directory=ABSOLUTE_REPOSITORY_PATH status` can be used; do not trust all directories globally. |
| Astro cannot create its Windows config folder | Run from your normal user terminal. Restricted automation may need access to Astro's per-user configuration directory. CI disables optional telemetry. |

Continue with the [development guide](DEVELOPMENT.md) and [contribution workflow](../CONTRIBUTING.md).
