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

## Editing profile and CV content

Update `app/data/profile.json` for the introduction and profile links. Update
`app/data/cv.json` for experience, education, and languages. Entries appear in
the order listed in the files.

## Build and deployment

```sh
npm run build
```

The static export is written to `out/` and deployed by the GitHub Actions
workflow. Set the repository's Pages source to **GitHub Actions** in Settings →
Pages. The simulator has its own repository and deployment and must not be added
as a route in this project.

## Background animation sketches

The p5.js sketches live in `app/backgrounds/gbm.js` and
`app/backgrounds/network.js`. Each file has settings near the top. Each network
section gets its own instance; `kind` identifies it.

The canvas wrapper handles creation, resizing, cleanup, reduced-motion
preferences, and pausing off-screen sketches. It clears the canvas before every
`draw` call, so redraw any paths or nodes you want to remain visible. Static
artwork is a fallback until a sketch draws its first frame.

The dark-panel formula backgrounds use the LaTeX strings in
`app/data/equations.js`. To add a formula, add a `String.raw` entry to that
array. Adjust `--formula-opacity` in `app/globals.css` for overall visibility;
the project and footer formula counts are set in `app/page.jsx`. Animations
pause off-screen and remain static when reduced motion is preferred.
