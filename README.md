# next-perfect-dark-mode

Dark mode in Next.js with no flash of the wrong theme on first paint.

**[Live demo](https://next-perfect-dark-mode.vercel.app)**

## The problem

The naive implementation reads the user's preference in a `useEffect`, which
runs after the first paint. The page renders in the default theme, then
corrects itself, and everyone on dark mode gets a white flash on every
navigation. Reading `prefers-color-scheme` in CSS alone does not fix it either,
because it cannot honour a choice the user made explicitly.

## The approach

A small script is serialised into `_document.tsx` and runs **before** React
hydrates. It reads the persisted choice from `localStorage`, falls back to the
`prefers-color-scheme` media query, and writes the resulting class onto
`<html>` while the browser is still parsing the document. By the time the first
pixel is painted, the correct theme is already applied.

React then picks up that class as its initial state, so the provider never
disagrees with what is on screen and there is no hydration mismatch.

```
_document.tsx  ──▶ inline script, before hydration
                     ├── localStorage preference?  ──▶ use it
                     └── otherwise                 ──▶ prefers-color-scheme
                                                        │
<html class="dark"> ◀───────────────────────────────────┘
                     ▼
ThemeProvider reads the class as its initial state
useTheme() reads and sets it from anywhere
```

## Built with

Next.js · TypeScript · Tailwind CSS (`dark:` variant) · Headless UI
