# Tim Prokosch — personal website

The homepage is a Next.js static export. The separate pension simulator is hosted
independently at `/pension-funding-simulator/`.

## Local development

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. Changes to `app/` update the preview.
The `prototype/` folder is the earlier standalone design draft; the Next.js
homepage is the source of truth going forward.

## Build and deployment

```sh
npm run build
```

The static export is written to `out/`. The GitHub Actions workflow additionally
builds the old Jekyll pages and copies their routes into the export. For deployment,
set the repository's Pages source to **GitHub Actions** in Settings → Pages.
The simulator has its own repository and deployment and must not be added as a
route in this project.

To reproduce the legacy-inclusive build locally, install Ruby and Bundler, then:

```sh
bundle install
bundle exec jekyll build
npm run build
node scripts/copy-legacy.mjs
```
