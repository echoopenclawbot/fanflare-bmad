---
name: figma
description: Work with Figma for design, prototyping, diagram creation, and collaboration. Use when creating visual designs, wireframes, diagrams (including from Mermaid code), managing components, or collaborating on Figma projects. Includes guidance for plugins, APIs, components, and best practices.
---

# Figma

## Overview

This skill provides guidance for using Figma to create and manage designs, diagrams, prototypes, and collaborative projects. It covers basic operations, advanced features like plugins and APIs, and best practices for efficient design workflows.

## Quick Start

1. Open Figma in your browser or desktop app.
2. Create a new file: Click "New design file" or "New FigJam file" for whiteboarding.
3. Use the toolbar to add shapes, text, and frames.
4. Organize with layers, groups, and components for reusability.
5. Share and collaborate by inviting team members or generating share links.

## Creating Diagrams

### Using the Mermaid Plugin

For creating diagrams from code (like flowcharts or charts):

1. Install the "Mermaid Diagrams" plugin from the Figma Community.
2. In your Figma file, run the plugin.
3. Paste Mermaid code (e.g., flowchart TD A-->B) into the input field.
4. Click "Generate" to create the diagram as editable Figma elements.

Example Mermaid code for a flowchart:
```
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

### Manual Diagram Creation

For custom diagrams without code:
- Use shapes from the toolbar (rectangle, circle, line).
- Connect elements with arrows or lines.
- Add text labels and styling.
- Group related elements for organization.

## Design Best Practices

- Use frames for artboards and layouts.
- Create components for reusable elements (buttons, icons).
- Apply consistent colors and typography via shared libraries.
- Use auto-layout for responsive designs.
- Prototype interactions with the Prototype tab.

## Plugins and Integrations

- **Mermaid Diagrams**: Generate diagrams from code.
- **Anima**: Export designs to code or prototypes.
- **TeleportHQ**: Convert Figma to React/Vue code.
- **Content Reel**: Generate placeholder content.
- Browse more in Figma's Community tab.

## API and Automation

Figma's REST API allows programmatic access:
- Export files as JSON or images.
- Create and modify files via API calls.
- Integrate with tools like Zapier or custom scripts.

Example API endpoint: `GET /v1/files/{file_key}` to retrieve file data.

## Collaboration Features

- Real-time editing with team members.
- Comments and feedback on specific elements.
- Version history for tracking changes.
- Shared libraries for design systems.

## Troubleshooting

- Diagrams not rendering: Check plugin installation and Mermaid syntax.
- Performance issues: Simplify complex files or use FigJam for brainstorming.
- Sharing problems: Ensure proper permissions and link settings.

This skill focuses on practical usage; for advanced API scripting, refer to Figma's developer documentation.
