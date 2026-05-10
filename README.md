# Game Guide — React Boilerplate

**[Live Demo →](https://strxblu.github.io/game-guide/)**

A React + TypeScript boilerplate for building game guides with tabbed navigation, filterable skill lists, and JSON-driven content.

> **Disclaimer:** This is a personal project built for fun and learning. It is not affiliated with or endorsed by any game developer or publisher. All game content, names, and trademarks referenced in the included example data belong to their respective owners.

## Features

- ✅ **React 18** with TypeScript
- ✅ **Tailwind CSS** for styling
- ✅ **Vite** for fast development and building
- ✅ Tabbed navigation across guide sections
- ✅ Filterable, checkable skill/unlock lists
- ✅ JSON-driven content — edit data without touching components
- ✅ Reusable UI components

## Project Structure

```
guide/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── PageHeader.tsx
│   │   ├── SectionLabel.tsx
│   │   ├── Card.tsx
│   │   ├── CircleBadge.tsx
│   │   ├── SkillCard.tsx
│   │   └── InfoCard.tsx
│   ├── data/               # JSON content files
│   │   ├── config.json
│   │   ├── skills.json
│   │   ├── crafting.json
│   │   ├── sp.json
│   │   ├── building.json
│   │   └── prisms.json
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── App.tsx             # Main guide component
│   ├── main.tsx            # React entry point
│   ├── index.css           # Global styles (Tailwind)
│   └── vite-env.d.ts       # Vite type declarations
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
git clone https://github.com/strxblu/game-guide.git
cd game-guide
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Using This as a Boilerplate

This project is built around **Atelier Yumia** content, but all game-specific data lives in JSON files. Adapting it to a new game requires changes in three areas: data, types, and the App component.

---

### 1. Replace the Data Files (`src/data/`)

Each tab in the guide corresponds to one or more JSON files. Replace the content of each file with your game's data, or delete files you don't need and add new ones.

**`config.json`** is the app-level configuration file. It contains:

- `appTitle` — the text shown in the top header bar
- `navTabs` — the list of navigation tabs. Each entry has a `key`, `label`, and `icon` (emoji or text). **This controls which tabs appear in the app.**
- `credits` — the content shown in the Credits modal (note, contributors, and references).

This is the first file to edit when adapting the boilerplate. Change `appTitle` to your game's name and replace `navTabs` with the sections you want.

**`skills.json`** drives the Skills tab specifically:

- `allSkills` — the list of checkable skill/unlock items rendered on the Skills tab. Each entry must match the `Skill` interface in `src/types.ts` (see Step 2).
- `filterOptions` — the filter buttons above the skill list. Each entry has a `key`, `label`, and `color`.

The remaining data files (`crafting.json`, `sp.json`, `building.json`, `prisms.json`) can have any shape you like — they are plain JSON objects imported directly into `App.tsx`.

---

### 2. Update the Skill Type (`src/types.ts`)

If your skills/unlocks have different fields than the current ones, update the `Skill` interface to match your `allSkills` JSON shape:

```ts
// src/types.ts
export interface Skill {
  step: number;       // unique numeric ID used for checkbox state
  tree: string;       // category key (used for filtering)
  treeLabel: string;  // display name of the category
  treeIcon: string;   // emoji or icon for the category
  treeColor: string;  // hex color for the category accent
  treeGlow: string;   // hex color for glow effects
  treeBg: string;     // hex background color for the skill card
  name: string;       // skill/unlock name
  tag: string;        // short label (e.g. "Early", "Mid")
  why: string;        // explanation text shown on the card
}
```

Add, remove, or rename fields as needed. If you rename or remove fields, update `SkillCard.tsx` (see Step 3b) to match.

---

### 3. Update the App Component (`src/App.tsx`)

#### 3a. Update imports and data references

At the top of `App.tsx`, replace the imported data files with your own:

```ts
// Remove files you don't need, add new ones
import configData from "./data/config.json";
import skillsData from "./data/skills.json";
import myNewSectionData from "./data/mynewsection.json";
```

The destructuring lines need to match your JSON structure:

```ts
const { navTabs, appTitle, credits } = configData;
const { allSkills, filterOptions } = skillsData;
```

#### 3b. Update the nav tab page blocks

Each tab renders its content inside a block like:

```tsx
{page === "skills" && <>
  {/* content here */}
</>}
```

The `page` value must match the `key` fields in your `navTabs` array. To add a new tab:

1. Add an entry to `navTabs` in `config.json`:
   ```json
   { "key": "mytab", "label": "My Tab", "icon": "🗡️" }
   ```
2. Add a matching block in `App.tsx`:
   ```tsx
   {page === "mytab" && <>
     <PageHeader title="My Tab Title" subtitle="SUBTITLE TEXT" />
     {/* render your data here */}
   </>}
   ```

To remove a tab, delete its entry from `config.json` and remove its `{page === "..." && ...}` block from `App.tsx`.

---

### Worked Example: Adding a "Relationships" Tab for a Dating Sim

Say you're building a guide for a dating sim and want a tab that lists characters and how to raise their affection. Here's the full process from scratch.

**Step 1 — Create the data file**

Create `src/data/relationships.json`:

```json
{
  "characters": [
    {
      "name": "Aria",
      "affectionTip": "Bring her the Blue Flower from the market every Tuesday.",
      "maxAffection": 10,
      "gift": "Blue Flower",
      "note": "Unlocks the rooftop scene at affection 7."
    },
    {
      "name": "Marco",
      "affectionTip": "Win the cooking contest in Chapter 3 before talking to him.",
      "maxAffection": 10,
      "gift": "Spice Blend",
      "note": "Only recruitable if you sided with the Guild in Chapter 2."
    }
  ]
}
```

The shape is entirely up to you — no required fields, no type to conform to. This is plain JSON.

**Step 2 — Register the tab in `config.json`**

Open `src/data/config.json` and add an entry to the `navTabs` array:

```json
"navTabs": [
  { "key": "skills",        "label": "Skills",        "icon": "🌿" },
  { "key": "crafting",      "label": "Crafting",       "icon": "⚗️" },
  { "key": "relationships", "label": "Relationships",  "icon": "💌" }
]
```

The tab will now appear in the navigation bar. The `key` value is what you'll reference in `App.tsx`.

**Step 3 — Import the data in `App.tsx`**

At the top of `src/App.tsx`, add the import alongside the others:

```ts
import relationshipsData from "./data/relationships.json";
```

**Step 4 — Add the page block in `App.tsx`**

Inside the `return (...)`, find where the other `{page === "..." && ...}` blocks are and add yours after them:

```tsx
{page === "relationships" && <>
  <PageHeader title="Relationships" subtitle="AFFECTION GUIDE · ALL CHARACTERS" />

  {relationshipsData.characters.map((character) => (
    <InfoCard key={character.name} borderColor="#e080a0">
      <div>
        <strong style={{ color: "#f0b8cc" }}>{character.name}</strong>
        <p style={{ margin: "4px 0 0", fontSize: 13 }}>{character.affectionTip}</p>
        {character.note && (
          <p style={{ margin: "6px 0 0", fontSize: 11, color: "#a08898" }}>{character.note}</p>
        )}
      </div>
    </InfoCard>
  ))}
</>}
```

That's all four steps. The tab appears in the nav, the JSON drives the content, and you never touched any component files.

---

#### 3c. Update the header branding

The top bar title is driven by `appTitle` in `src/data/config.json`. Change it to your game's name:

```json
{
  "appTitle": "My Game · Field Guide",
  "navTabs": [ ... ]
}
```

#### 3d. Update the Credits modal

The Credits button in the header opens a modal driven entirely by the `credits` object in `src/data/config.json`. No code changes are needed to update its content.

The `credits` object has three fields:

```json
"credits": {
  "note": "A short attribution or disclaimer shown at the top of the modal.",
  "contributors": [
    { "name": "Display name", "role": "What they contributed" }
  ],
  "references": [
    { "label": "Link display text", "url": "https://..." }
  ]
}
```

- **`note`** — freeform text shown at the top of the modal. Use it for a general attribution statement or copyright notice.
- **`contributors`** — list of people or tools that helped build the guide. Each entry shows as a name (highlighted) and a role description beside it.
- **`references`** — list of external links rendered as clickable links in the modal. Add as many as needed.

To remove the Credits button entirely, delete the `credits` field from `config.json` and remove the `{creditsOpen && ...}` modal block and the Credits `<button>` from `src/App.tsx`.

---

#### 3e. Change the fonts
Fonts are loaded from Google Fonts in `index.html`. The project uses two fonts by default:

- **Inter** — base font for all body text
- **Montserrat** — headings, subtitles, and uppercase labels

To swap them, replace the Google Fonts `<link>` in `index.html` with a new one from [fonts.google.com](https://fonts.google.com):

```html
<link href="https://fonts.googleapis.com/css2?family=YourBodyFont:wght@400;500;600&family=YourHeadingFont:wght@600;700&display=swap" rel="stylesheet" />
```

Then update the three places that reference font names:

| File | What to change |
|---|---|
| `src/App.tsx` | `fontFamily: "'Inter', sans-serif"` on the root `<div>` → your body font |
| `src/components/PageHeader.tsx` | `fontFamily: "'Montserrat', sans-serif"` on both the title and subtitle divs → your heading font |
| `src/components/SectionLabel.tsx` | `fontFamily: "'Montserrat', sans-serif"` on the label div → your heading font |

If you only want one font throughout, set the same family in all four places and remove the heading font from the Google Fonts URL.

---

#### 3f. Change colors and icons

Colors and icons are spread across three layers. Start from the outermost and work inward.

**App-level colors** — set in `src/App.tsx`:

| What | Where to find it | What to change |
|---|---|---|
| Page background | Root `<div>`, `background` property | The `linear-gradient` colors |
| Default text color | Root `<div>`, `color` property | `#e8dfc8` |
| Top header bar | `<div>` wrapping `{appTitle}`, `background` property | The `linear-gradient` and `borderBottom` color |
| Header icon | The `<span>` before `{appTitle}` | The emoji (currently `⚗`) |
| Active tab indicator | `borderBottom` in the nav button styles | `#9080e0` (purple) |
| Active tab text | `color` in the nav button styles | `#c0b8f8` |
| Progress bar fill | The inner progress `<div>`, `background` property | The `linear-gradient` gradient |
| Recommended next highlight | The "recommended next" `<div>`, `borderLeft` color | `#9080e0` |

**Per-skill colors** — set in `src/data/skills.json`, on each entry in `allSkills`:

| Field | Effect |
|---|---|
| `treeColor` | Border, badge outline, and tag background on the skill card |
| `treeGlow` | Badge text color and tag text color |
| `treeBg` | Background gradient base color for the skill card |
| `treeIcon` | Emoji shown in the category pill on each card |

These also feed the filter buttons — `filterOptions` in `skills.json` has its own `color` per category that controls the button highlight color when selected.

**Component-level colors** — passed as props:

- `InfoCard` — `borderColor` and `bg` props control its border and background
- `PageHeader` — `color` prop controls the title text color (default `#f0d89a`)
- `CircleBadge` — `color` and `glow` props control the circle border and text

To do a full retheme, start with the app-level background and header bar, then update the `treeColor`/`treeGlow`/`treeBg` values in `skills.json` to match your new palette.

---

### 4. Reuse or Modify Components (`src/components/`)

The components are generic and reusable. You can pass in colors, content, and styles via props:

| Component | What it renders | Key props |
|---|---|---|
| `PageHeader` | Section title + subtitle | `title`, `subtitle`, `color` |
| `SectionLabel` | Small uppercase label | `children`, `style` |
| `Card` | Horizontal flex container | `children`, `style` |
| `InfoCard` | Bordered content block | `children`, `borderColor`, `bg` |
| `CircleBadge` | Colored circle icon | `color`, `glow`, `done` |
| `SkillCard` | Full checkable skill row | `skill`, `isDone`, `toggle` |

`SkillCard` is the most game-specific component — it reads fields from the `Skill` type directly. If you change the `Skill` interface, update `SkillCard.tsx` to reflect those field names.

## Technologies Used

- **React 18.3.1** — UI library
- **TypeScript** — Type safety
- **Vite 6.0.1** — Build tool and dev server
- **Tailwind CSS 3.4.17** — Utility-first CSS framework
- **PostCSS & Autoprefixer** — CSS processing

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## AI-Assisted Development Disclosure

This project was developed using a **human-in-the-loop workflow** — a human architect directing a collaborative pipeline of AI tools, each contributing a distinct role.

| Contributor | Role |
|---|---|
| strxblu | Architect |
| VS Code & GitHub Copilot | Infrastructure |
| Claude | Logic and original template |
| ChatGPT | Content synthesis |
| Perplexity AI | Research, fact checking, content refinement, and wording assistance |
| Gemini AI | Review |