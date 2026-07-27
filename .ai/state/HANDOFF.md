# Handoff

## Last session

- **What changed and why:**
  - **Global Application Rebrand**: Renamed project from `AzLoFlows` to **`Azure Local Draftsman`** (`Draftsman`).
    - **Display Name**: `Azure Local Draftsman`
    - **Short Form**: `Draftsman`
    - **Repo Name & URL**: `azurelocal-draftsman` (`https://github.com/AzureLocal/azurelocal-draftsman.git`)
    - **npm Package Name**: `azurelocal-draftsman` in [`package.json`](file:///d:/git/azurelocal/azurelocal-azloflows/package.json)
    - **Vite Base**: `/azurelocal-draftsman/` in [`vite.config.ts`](file:///d:/git/azurelocal/azurelocal-azloflows/vite.config.ts)
  - **Backward Compatibility for LocalStorage**:
    - [`src/lib/serialization/storage.ts`](file:///d:/git/azurelocal/azurelocal-azloflows/src/lib/serialization/storage.ts): Uses `draftsman.diagram.document` and `draftsman.recent` with automatic fallback reads from legacy keys (`isoflows.diagram.document`, `azloflows.diagram.document`, `isoflows.recent`, `azloflows.recent`).
    - [`src/lib/serialization/snapshots.ts`](file:///d:/git/azurelocal/azurelocal-azloflows/src/lib/serialization/snapshots.ts): Uses `draftsman.snapshots` with automatic fallback reads from `isoflows.snapshots` and `azloflows.snapshots`.
    - [`src/state/useEditorStore.ts`](file:///d:/git/azurelocal/azurelocal-azloflows/src/state/useEditorStore.ts): Reads `draftsman_theme` with fallback to `azloflows_theme` and `isoflows_theme`.
  - **All Updated Entry Points & Docs**:
    - `index.html` (title, meta description, og: and twitter: tags)
    - `public/404.html`
    - `README.md`, `CHANGELOG.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`
    - `docs/README.md`, `docs/cabling-standards.md`, `docs/schedule-exporters.md`
    - `pmo/VISION_AND_STRATEGY.md`, `pmo/README.md`, `pmo/PRODUCT_ROADMAP.md`, `pmo/COMPREHENSIVE_SITE_AUDIT.md`, `pmo/BACKLOG.md`, `pmo/ARCHITECTURE_AUDIT.md`
    - `.github/workflows/deploy.yml`, `.github/workflows/validate.yml`
    - `.ai/mcp/mcp-servers.md`, `.claude/agents/azurelocal-draftsman-engineer.md`, `.codex/config.toml`
    - `src/main.tsx`, `src/components/ui/ErrorBoundary.tsx`, `src/app/layout/TopToolbar.tsx`, `src/features/landing/LandingHeader.tsx`, `src/features/export/fileActions.ts`, `scripts/record-demo.mjs`
- **Files touched:** 33 files modified across repo.
- **Commands run & results:**
  - `npm run build` (**Passed — 0 errors, built bundle in 2.22s**)
  - `npm test -- --run` (**Passed — 18 unit tests passed in 963ms**)
  - `npx eslint src/` (**Passed — 0 errors**)
  - `git remote set-url origin https://github.com/AzureLocal/azurelocal-draftsman.git` (**Updated**)
- **Branch:** `main` (commit `c4ee64b`).
- **Blockers:** None.
