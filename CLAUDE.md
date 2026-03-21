# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Yarn 4 PnP monorepo managed by Turborepo, containing design system packages and frontend services for DND Academy. Uses Node.js 22.21.1 managed via mise.

## Setup Commands

```bash
# Initial setup
mise trust .mise.toml
mise install          # Installs node 22.21.1, lefthook 2.0.4
yarn install

# Development
yarn dev              # Run all dev servers
yarn build            # Build all workspaces
yarn lint             # Lint all workspaces
yarn format           # Format code with Prettier
yarn check-types      # Type check all workspaces

# Selective builds
yarn build:packages   # Build only packages/** (alias: build:p)
yarn build:services   # Build only services/** (alias: build:s)
yarn build:tools      # Build only tools/** (alias: build:t)

# Passboard (Next.js service) specific
cd services/passboard
yarn dev              # Dev server on port 3000
yarn build            # Next.js build with webpack
yarn test:v           # Run Vitest tests
yarn test:ui          # Vitest UI
yarn mock:server      # Start MSW mock server on port 9090

# dds-desktop (Design System) specific
cd packages/dds-desktop
yarn storybook        # Storybook dev server on port 6006
yarn build-storybook  # Build Storybook
yarn generate:component # Generate new component scaffold

# Admin-web specific
cd services/admin-web
yarn dev              # Vite dev server on port 3000
```

## Workspace Structure

### services/

- **passboard**: Next.js 16 App Router application (main user-facing app)
  - Stack: React 19, Vanilla Extract, TanStack Query, React Hook Form + Zod, Framer Motion
  - Testing: Vitest + Testing Library, MSW for API mocking
  - Path alias: `@/*` → `./src/*`
  - Entry: `/src/app/layout.tsx`

- **admin-web**: Vite-based React 19 admin dashboard with React Compiler enabled
  - Consumes `@dds/desktop` and `@dds/token`
  - Entry: `/src/main.tsx`

### packages/

- **dds-desktop**: Component library built with Vanilla Extract recipes
  - Exports reusable UI primitives (Button, TextField, Sidebar, etc.)
  - Storybook for documentation: https://main--6961111a96f838d3ba78064b.chromatic.com/
  - Testing: Storybook + Vitest + Playwright
  - See `/packages/dds-desktop/docs/COMPONENT_GUIDELINES.md` for component authoring rules

- **dds-token**: Design tokens generated from Tokens Studio (Figma plugin)
  - Source: `/tokens/primitive.json`, `/tokens/semantic.json`
  - Build: Style Dictionary generates JS/TS/CSS from JSON
  - Exports: `@dds/token` (JS objects), `@dds/token/css` (CSS variables)

### tools/

- **eslint-config**: Shared ESLint configurations
  - Exports: `./base`, `./next-js`, `./react-internal`

- **typescript-config**: Shared TypeScript configurations
  - Exports: `./base.json`, `./nextjs.json`, `./react-library.json`

## Build System

Turborepo pipeline (see `turbo.json`):

- **build**: Topological order (dds-token → dds-desktop → services)
- **lint**: Parallel across workspaces
- **check-types**: Type checking
- **dev**: Persistent, no cache
- **clean**: Clears cache and PnP artifacts

## Architecture Patterns

### Vanilla Extract Recipe Pattern

Components use `@vanilla-extract/recipes` for type-safe variant-based styling:

```typescript
import { recipe } from '@vanilla-extract/recipes'
import { primitive } from '@dds/token'

export const buttonCss = recipe({
  base: { backgroundColor: primitive.color.blue500 },
  variants: {
    size: { small: {...}, medium: {...} },
    variant: { primary: {...}, secondary: {...} }
  }
})
```

### Token Integration

Design tokens flow through three formats:

- **JS/TS**: Used in `.css.ts` files (`import { primitive, semantic } from '@dds/token'`)
- **CSS Variables**: Runtime theming (`import '@dds/token/css'`)
- **Types**: Full autocomplete

Token naming: Figma `Color/Cyan/500` → Code `primitive.color.cyan500`

### Compound Components (dds-desktop)

Components use compound pattern with context for state sharing:

```typescript
<Button variant="primary" disabled>
  <Button.Icon name="plus" /> {/* Reads variant/disabled from context */}
  Submit
</Button>
```

Implementation via `Object.assign(ButtonImpl, { Icon: ButtonIcon })`

### Polymorphic Components

Components support `as` prop via `forwardRefWithAs` utility:

```typescript
<Txt as="h1">Heading</Txt>
<Txt as="span">Span</Txt>
```

### Component Structure (dds-desktop)

```
primitives/
├── button/
│   ├── Button.tsx (main component with forwardRefWithAs)
│   ├── style.css.ts (Vanilla Extract recipes)
│   ├── context.tsx (ButtonContextProvider)
│   ├── compound/ (ButtonIcon, etc.)
│   └── Button.stories.tsx (Storybook)
```

**Component authoring rules**:

1. All components must support `ref` via `forwardRefWithAs`
2. Props naming: `xxxFromProps` (direct) vs `xxxFromCtx` (context)
3. Always destructure with `...restProps` for flexibility
4. Support `className` and `style` for customization
5. Export both component and types

### Feature-Based Architecture (Passboard)

```
src/
├── app/ (Next.js App Router pages)
├── features/ (domain features, e.g., passboard/)
└── shared/ (cross-feature code)
    ├── components/
    ├── hooks/
    ├── styles/
    ├── utils/
    └── types/
```

## Testing

**Passboard**:

- Framework: Vitest with jsdom
- Pattern: `**/*.spec.{ts,tsx}`
- Setup: `src/shared/utils/testSetup.ts`
- Mocking: MSW with Express server on port 9090 (`yarn mock:server`)

**dds-desktop**:

- Framework: Storybook + Vitest + Playwright
- Pattern: `.stories.tsx` for docs, `.spec.stories.tsx` for tests
- Browser: Chromium headless via Playwright
- Addons: a11y, vitest, docs

## Special Configurations

### Yarn PnP

- Zero-install with `.yarn/cache` committed
- No `node_modules/` folders
- `.pnp.cjs` for module resolution
- IDE support via `.yarn/sdks/`

### Version Resolutions

Root `package.json` enforces consistent versions:

- `vite: 7.1.5`
- `vitest: 4.0.18`
- `react: ^19.2.0`
- `react-dom: ^19.2.0`

### Git Hooks

Lefthook manages pre-commit and pre-push hooks (see `lefthook.yml`):

- **pre-commit**: lint, format, type-check (parallel, only changed files)
- **pre-push**: lint, format, type-check, build (parallel, all files)

Auto-installed via `postinstall` script.

## Common Workflows

### Adding a Component to dds-desktop

```bash
cd packages/dds-desktop
yarn generate:component  # Turbo generator
# Edit generated files following COMPONENT_GUIDELINES.md
# Create .stories.tsx for documentation
yarn storybook  # Verify in Storybook
```

### Updating Design Tokens

```bash
# 1. Update JSON files in packages/dds-token/tokens/
# 2. Rebuild tokens
cd packages/dds-token
yarn build

# 3. Rebuild dependent packages
cd ../..
yarn build:packages
```

### Running a Single Test

```bash
# Passboard
cd services/passboard
yarn test:v path/to/test.spec.ts

# dds-desktop (via Storybook)
cd packages/dds-desktop
yarn test-storybook --grep="ComponentName"
```

### Debugging Build Issues

```bash
# Clean all caches
yarn clean

# Rebuild from scratch
yarn install
yarn build

# Check specific workspace
turbo build --filter=@dds/desktop --force
```

## Key File Locations

- **Turbo config**: `/turbo.json`
- **ESLint base**: `/tools/eslint-config/base.js`
- **TypeScript base**: `/tools/typescript-config/base.json`
- **Token sources**: `/packages/dds-token/tokens/*.json`
- **Token build script**: `/packages/dds-token/scripts/build-tokens.js`
- **Component guidelines**: `/packages/dds-desktop/docs/COMPONENT_GUIDELINES.md`
- **Passboard entry**: `/services/passboard/src/app/layout.tsx`
- **Admin-web entry**: `/services/admin-web/src/main.tsx`

## Dependency Graph

```
services/passboard (Next.js)
  └─ Uses Vanilla Extract independently

services/admin-web (Vite)
  ├─ @dds/desktop
  └─ @dds/token

packages/dds-desktop (Component library)
  └─ @dds/token (devDep, for styling)

packages/dds-token (Design tokens)
  └─ (no internal deps)

All workspaces depend on:
  ├─ @dnd-frontend/eslint-config
  └─ @dnd-frontend/typescript-config
```

**Build order**: dds-token → dds-desktop → services (enforced by Turborepo)

## ESLint Import Ordering

Auto-fixed by ESLint, groups ordered as:

1. builtin → external → internal
2. parent/sibling → index → object → type
3. Alphabetized within groups, newlines between groups

## Conventions

- **Commit messages**: Follow conventional commits (`feat:`, `fix:`, `chore:`)
- **Component naming**: PascalCase for components, camelCase for utilities
- **Test files**: `.spec.{ts,tsx}` for unit tests, `.stories.tsx` for Storybook
- **Path references**: Use absolute paths with aliases (`@/*`) in Passboard
- **CSS**: Vanilla Extract `.css.ts` files, no CSS Modules or styled-components
- **State management**: TanStack Query for server state, React Context for UI state
- **Form validation**: React Hook Form + Zod schemas
