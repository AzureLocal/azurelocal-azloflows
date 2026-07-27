/**
 * URL parameter integration for embedded / iframe usage.
 *
 * Supported query parameters (all optional, comma-separated lists allowed):
 *   ?scenario=<slug>     Loads a predefined scenario file from PredefinedScenarios/manifest.json.
 *                        Matches against the filename (without .json) or a slugified label.
 *   &config=<slug>       Activates a scenario tag (entry in document.scenarios).
 *   &sources=a,b,c       Activates flow sources (entries in document.flowSources).
 *   &types=a,b,c         Activates flow types (entries in document.flowTypes).
 *
 * All slug matching is fuzzy (slugified id or label). Unknown values are ignored silently.
 */

import { useEditorStore } from '@/state/useEditorStore';
import { normalizeDocument } from '@/lib/serialization/storage';
import {
  getDocScenarios,
  getDocFlowSources,
  getDocFlowTypes,
  type PickerDef,
  type FlowSource,
  type FlowType,
} from '@/types/document';

interface ScenarioManifestEntry {
  file: string;
  label: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

/** Find a picker entry whose id or slugified label matches the requested slug. */
function matchPicker(defs: PickerDef[], slug: string): PickerDef | undefined {
  const target = slugify(slug);
  return defs.find((d) => slugify(d.id) === target || slugify(d.label) === target);
}

function matchScenarioFile(entries: ScenarioManifestEntry[], slug: string): ScenarioManifestEntry | undefined {
  const target = slugify(slug);
  return entries.find((e) => {
    const fileSlug = slugify(e.file.replace(/\.json$/i, ''));
    const labelSlug = slugify(e.label);
    return fileSlug === target || labelSlug === target;
  });
}

/**
 * Read URL params and apply them to the editor store. Returns a promise that
 * resolves once the optional scenario file has been loaded and selections applied.
 * Safe to call multiple times; subsequent calls re-apply if params change.
 */
export async function applyUrlParams(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const viewParam = params.get('view');
  const wizardParam = params.get('wizard');
  const scenarioParam = params.get('scenario');
  const configParam = params.get('config');
  const sourcesParam = parseList(params.get('sources'));
  const typesParam = parseList(params.get('types'));

  if (viewParam === 'designer' || viewParam === 'canvas' || scenarioParam || configParam) {
    useEditorStore.getState().setActiveView('designer');
  } else if (viewParam === 'landing' || viewParam === 'home') {
    useEditorStore.getState().setActiveView('landing');
  }

  if (wizardParam === 'true' || wizardParam === '1') {
    useEditorStore.getState().setWizardOpen(true);
  }

  if (!scenarioParam && !configParam && sourcesParam.length === 0 && typesParam.length === 0) {
    return false;
  }

  // Step 1: optionally load a scenario file from manifest.
  if (scenarioParam) {
    try {
      const manifestUrl = `${import.meta.env.BASE_URL}PredefinedScenarios/manifest.json`;
      const manifestRes = await fetch(manifestUrl);
      if (manifestRes.ok) {
        const entries: ScenarioManifestEntry[] = await manifestRes.json();
        const match = matchScenarioFile(entries, scenarioParam);
        if (match) {
          const fileUrl = `${import.meta.env.BASE_URL}PredefinedScenarios/${encodeURIComponent(match.file)}`;
          const docRes = await fetch(fileUrl);
          if (docRes.ok) {
            const json = await docRes.json();
            const doc = normalizeDocument(json);
            useEditorStore.getState().importDocument(doc);
          }
        }
      }
    } catch {
      // Silent fallback — keep existing document.
    }
  }

  // Step 2: apply config / sources / types against the (possibly newly imported) document.
  const state = useEditorStore.getState();
  const doc = state.document;
  const scenarioDefs = getDocScenarios(doc);
  const sourceDefs = getDocFlowSources(doc);
  const typeDefs = getDocFlowTypes(doc);

  const patch: {
    activeScenario?: string | null;
    activeFlowSources?: Set<FlowSource>;
    activeFlowTypes?: Set<FlowType>;
  } = {};

  if (configParam) {
    const matched = matchPicker(scenarioDefs, configParam);
    if (matched) patch.activeScenario = matched.id;
  }

  if (sourcesParam.length > 0) {
    const matchedSources = sourcesParam
      .map((slug) => matchPicker(sourceDefs, slug)?.id)
      .filter((id): id is string => Boolean(id));
    if (matchedSources.length > 0) patch.activeFlowSources = new Set(matchedSources);
  }

  if (typesParam.length > 0) {
    const matchedTypes = typesParam
      .map((slug) => matchPicker(typeDefs, slug)?.id)
      .filter((id): id is string => Boolean(id));
    if (matchedTypes.length > 0) patch.activeFlowTypes = new Set(matchedTypes);
  }

  if (Object.keys(patch).length > 0) {
    useEditorStore.setState(patch);
  }

  // Fit the imported scenario to screen if a scenario was loaded.
  if (scenarioParam) {
    requestAnimationFrame(() => {
      const canvas = window.document.querySelector('canvas');
      if (canvas) {
        useEditorStore.getState().fitToScreen(canvas.clientWidth, canvas.clientHeight);
      }
    });
  }

  return true;
}
