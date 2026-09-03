# Features

Code-derived inventory of what this repo implements. Bullets and key file paths —
the mechanism lives in `docs/how-it-works.md`, the walkthrough in `docs/demo-script.md`.

_Last generated: 2026-09-02 by feature-doc._

This repo is a Merchant Center Custom Application, built on commercetools' generic
"Custom Application starter template in TypeScript" (the scaffold named in
`generic-iframe-integrator/README.md`, not one of the tracked demo storefront
starters). It is a thin, single-purpose app: it renders an arbitrary external URL
inside an iframe as a new item in the Merchant Center main menu. Everything about
which URL, label, and Merchant Center project it targets is supplied through
Connect deploy-time configuration rather than hardcoded, so the same codebase is
reused across different demos/customers by redeploying with different config
values. Because it has no fork base among the tracked starters, bullets below
carry no starter-provenance tags.

## Merchant Center Integration

- Registers as a Merchant Center Custom Application via Connect, adding a new
  main-menu entry whose label is set entirely at deploy time by the
  `EXTERNAL_LABEL_TEXT` environment variable, with no locale-specific overrides
  configured (`generic-iframe-integrator/custom-application-config.mjs`,
  `mainMenuLink.labelAllLocales: []`).
- Main-menu entry icon is fixed to the built-in "bag" icon shipped with
  `@commercetools-frontend/assets` (`custom-application-config.mjs`).
- Requests the `view_products` Merchant Center OAuth scope and gates the
  main-menu link on a `View` permission derived from the app's own
  `entryPointUriPath`, even though the app makes no direct commercetools API
  calls itself — the scope/permission exists to let it be embedded like any
  other MC module (`custom-application-config.mjs`, `src/constants.ts`).
- Per-deployment identity (Custom Application ID, MC cloud region, entry point
  path, application URL) is all environment-driven so one build can be
  registered multiple times under different Merchant Center projects
  (`connect.yaml`, `custom-application-config.mjs`).

## Iframe Display

- Renders a single external URL, taken from application context
  (`EXTERNAL_URL`), full-width inside a 16:9 iframe on the app's only view; shows
  a loading spinner until the URL is resolved from context
  (`src/components/previews/preview.tsx`).
- Content Security Policy is dynamically scoped to the configured target: both
  `connect-src` and `frame-src` are set to `EXTERNAL_URL` at deploy time, so only
  the one allow-listed external origin can be framed
  (`custom-application-config.mjs`).
- Route tree is a single, lazily-loaded route (code-split from the main app
  bundle) that always renders the iframe preview — there is no navigation
  between multiple views (`src/routes.tsx`, `src/components/previews/index.ts`).

## Configuration & Deployment

- Connect manifest declares five deploy-time configuration keys — Custom
  Application ID, MC cloud region (defaulting to `gcp-eu`), entry point URI path
  (defaulting to `generic-iframe-integrator`), the external URL to embed, and the
  main-menu button label — making the connector reusable for arbitrary
  "embed this URL in the Merchant Center" demos without a code change
  (`connect.yaml`).
- Local development points at a fixed sample commercetools project
  (`tech-sales-good-store`) so the app can be run and previewed without extra
  setup (`custom-application-config.mjs`, `env.development.initialProjectKey`).

## Internationalization

- Locale message loading supports English (default) and German, lazily
  code-splitting the translation bundle per locale
  (`src/load-messages.ts`, `src/i18n/data/en.json`, `src/i18n/data/de.json`).
- The app's only user-facing string (the preview view title) is defined via
  `react-intl` for future translation, though the current German bundle is
  empty (`src/components/previews/messages.ts`, `src/i18n/data/de.json`).

## Distinctive capability

This repo's only distinctive capability is its purpose-built genericness: unlike
a one-off Merchant Center integration, this app has no business logic of its own
— its entire job is to make "embed an arbitrary external tool/dashboard as a
Merchant Center menu item" a deploy-time configuration problem (URL, label,
region, project) rather than a coding problem, via `connect.yaml` and
`custom-application-config.mjs`.
