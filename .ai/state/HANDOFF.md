# Handoff

## Last session

- **What changed and why:**
  - **Fixed GitHub Pages Deployment Asset Pathing**:
    - Changed Vite base in [`vite.config.ts`](file:///d:/git/azurelocal/azurelocal-azloflows/vite.config.ts) from static `/azurelocal-draftsman/` to relative `./` (`base: './'`).
    - This ensures that assets (`./assets/index-*.js`, `./assets/index-*.css`) load correctly on any GitHub Pages domain or custom subpath without 404/MIME errors.
- **Files touched:**
  - `vite.config.ts`
  - `package.json`
  - `.ai/state/HANDOFF.md`
- **Commands run & results:**
  - `npm run build` (**Passed — built dist in 5.21s**)
  - `git push origin main` (**Pushed commit d17f9dd to AzureLocal/azurelocal-draftsman**).
- **Branch:** `main` (commit `d17f9dd`).
- **GitHub Actions Status:** Triggered run `30233215686` for `Deploy to GitHub Pages`.
- **Blockers:** None.
