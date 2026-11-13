# Tim Prokosch — personal website

The homepage is a Next.js static export. The separate pension simulator is hosted
independently at `/pension-funding-simulator/`.

## Local development

```sh
npm ci
npm run dev
```

Open the local URL printed by Next.js. Changes to `app/` update the preview.
The Next.js homepage in `app/` is the source of truth.

## Build and deployment

```sh
npm run build
```

The static export is written to `out/` and deployed by the GitHub Actions
workflow. Set the repository's Pages source to **GitHub Actions** in Settings →
Pages. The simulator has its own repository and deployment and must not be added
as a route in this project.
