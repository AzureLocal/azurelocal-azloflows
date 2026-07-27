# Technical Architecture Audit: AzureLocal AzLoFlows

## Executive Overview

This document presents a comprehensive technical audit of the **AzureLocal AzLoFlows** codebase. The audit evaluates the system architecture, state management, rendering pipeline, component hierarchy, and data schemas to establish the foundation for extending the platform into an Enterprise Infrastructure & Network Layout Builder.

---

## Codebase Structure & Key Components

```
src/
├── app/                  # Application container and top-level layout
│   └── App.tsx           # Main application entry point & Toolbar integrations
├── components/           # Reusable UI controls, modals, and input fields
├── features/
│   ├── canvas/           # Core HTML5 Canvas rendering & interaction system
│   │   ├── CanvasViewport.tsx  # Main Canvas component, pan/zoom, event dispatcher
│   │   ├── CanvasOverlay.tsx   # Floating UI controls, HUD, zoom controls
│   │   ├── ContextMenu.tsx     # Contextual operations menu
│   │   └── renderers/          # 29 custom isometric shape & entity renderers
│   ├── export/           # Document export (JSON, PNG, SVG)
│   ├── inspector/        # Entity property editor sidebar
│   ├── layers/           # Layer management & z-index reordering
│   ├── palette/          # Component drag-and-drop palette
│   ├── scenarios/        # Traffic flow scenario & source filtering controls
│   └── templates/        # Diagram templates gallery & starter document
├── lib/                  # Utility functions, geometry helpers, URL parameter parser
├── state/                # Zustand global editor store & undo/redo history stack
├── styles/               # CSS Design system tokens & global styling
└── types/
    └── document.ts       # Core TypeScript schemas for DiagramDocument & entities
```

---

## Component Architecture & System Capabilities

### 1. Rendering Pipeline (`src/features/canvas/renderers`)
- **Technology:** Pure HTML5 2D Canvas context rendering (`CanvasRenderingContext2D`) optimized for 60fps interaction.
- **Isometric Grid:** Custom isometric transformation renderer (`renderIsoGrid.ts`) projecting 2D coordinate space into 3D isometric perspective.
- **Shape Modularization:** 29 discrete modular renderers handling entity types:
  - **Node Shapes:** `renderServerRack.ts`, `renderStorage.ts`, `renderPlatform.ts`, `renderCard.ts`, `renderBrowser.ts`, `renderStandingNode.ts`, `renderCloud.ts`, etc.
  - **Containers:** `renderArea.ts` for boundary grouping with customizable borders, fills, and glow effects.
  - **Connectors:** `renderConnector.ts` rendering solid, dashed, and animated flow paths with custom waypoint routing and tunneling effects.
  - **Structures & Decorators:** `renderPipe.ts`, `renderText.ts`, `renderBackground.ts`.

### 2. State Management (`src/state/useEditorStore.ts`)
- **Library:** `Zustand` with persistent storage integration (`localStorage`).
- **State Scope:**
  - `document`: Active `DiagramDocument` holding all entity arrays (`areas`, `nodes`, `connectors`, `texts`, `pipes`) and flow metadata.
  - `camera`: Viewport offset (`x`, `y`) and `zoom` scale factor.
  - `selection`: Active selection set (`ids`, `type`).
  - `filter`: Active scenario ID, selected traffic sources, and selected traffic types.
  - `history`: Full undo/redo snapshot stack (`history.ts`).

### 3. Traffic Scenario & Flow Filtering Engine
- **Data Model:** `scenarios`, `flowSources`, `flowTypes`, and exclusion rules (`SCENARIO_FLOW_TYPE_EXCLUSIONS`, `SOURCE_FLOW_TYPE_EXCLUSIONS`).
- **Tag-Based Routing:** Connectors and nodes carry string `tags` associated with traffic categories (e.g. `hosts`, `arb`, `aks`, `azure-public-endpoint`).
- **Dynamic Animation:** Connectors toggle visibility and marching-ant animations based on active scenario filter selections.

### 4. Import/Export & URL Parameter Engine
- **JSON Serialization:** Full versioned schema (`DOCUMENT_VERSION = 1`) for loading and saving `.json` diagram files.
- **Image Export:** High-res PNG rendering with optional transparent background.
- **Deep Linking (`src/lib/urlParams.ts`):** Supports URL query parameters (`scenario`, `config`, `sources`, `types`) allowing embedders to pre-configure active filters inside `iframe` containers.

---

## Architectural Evaluation & Transformation Readiness

| Capability Domain | Current State | Target State for Network Builder | Architectural Gap / Action Required |
|---|---|---|---|
| **Node Hierarchy** | Single-level `NodeEntity` with optional parent area ID. | Multi-tier hierarchy: Rack -> Chassis -> Switch/Server -> NIC -> Port. | Extend `NodeEntity` schema to support sub-components (ports, interfaces, modules). |
| **Connector Routing** | Node-to-Node anchor points (top, right, bottom, left). | Port-to-Port pin-level routing (e.g. `Server01:Port1` -> `ToR-A:Port24`). | Introduce `PortAnchorId` schema and sub-element coordinate calculations. |
| **Network Metadata** | Basic string tags for scenario filtering. | Structured IP/Subnet, VLAN ID, MTU, LACP/SET Team, and QoS metadata. | Define `NetworkInterface` and `VlanSubnet` TypeScript interfaces. |
| **Layer Toggling** | Z-index sorting within single canvas view. | Multi-Layer Toggling: Physical View (Cabling/Racks) vs Logical View (VLANs/vSwitches). | Add Layer Visibility state to store and renderer filters. |
| **Validation Engine** | None (Visual placement only). | Automated Rule Engine (Redundancy check, MTU mismatch, VLAN trunk validation). | Implement `ValidationRulesEngine` feature module. |
| **BOM / Schedule Export** | JSON & PNG image exports. | Cabling Matrix CSV, Switch Port Map, Rack Elevation Spec, VLAN Schedule. | Build structured CSV/PDF reporting module in `src/features/export`. |

---

## Key Extensibility Points

1. **Schema Extension (`src/types/document.ts`):** Backward-compatible schema extension adding `ports`, `interfaces`, `vlans`, and `physicalLinks`.
2. **New Renderer Plugins (`src/features/canvas/renderers`):** Adding dedicated renderers:
   - `renderSwitchToR.ts` (24/48 port switch front/rear isometric view)
   - `renderPatchPanel.ts` (Patch panel cabling interface)
   - `renderNicTeam.ts` (Logical SET/LACP team boundary)
   - `renderLogicalSubnet.ts` (Overlaid VLAN/Subnet logical boundary)
3. **Inspector Enhancements (`src/features/inspector`):** Extending property inspectors to edit IP addresses, subnet masks, VLAN tags, MAC addresses, and cabling specs.
