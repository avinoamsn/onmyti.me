# TODOs for onmyti.me

### Project ideas & TODOs

- **IMPORTANT** the "enter" key code is different on Windows - add it to the submission logic
- **IMPORTANT** if there aren't any posts, don't continue to show "Loading..." after the query returns
- config options to either store journal locally (in `localStorage`) or log in through OAuth (Netlify)
- system for unique keys across every array on HomePage
- Implement some basic Storybook stories (at least to get a feel for the tool)
- Arrow interaction currently both scrolls the textarea & the page, there should be a way to differentiate the two different actions (perhaps a setting optionally disabling arrow scroll if the user would prefer using arrows to navigate entry input text)
- Replace ASCII carriage return w/ inline SVG (currently saved in `src/assets`)
- multiple formatting options for the clock
  - maybe even an analog clock?
- Touch-up docs in the `usePersistentState` hook & c/p it into the custom hooks repo
- It would be cool if the background amber/orange dimmed with the evening/night (e.g. transition `bg-amber-200` -> `bg-amber-400`, or similar)
- Custom backgrounds? (Maybe different pastel colors)
- improve the resolver logic for the optional `from`/`to` fields in the entries query (it's more verbose than it likely needs to be due to some prisma limitations)
- API integrations for blogging platforms like Twitter, Facebook, etc.

### Notes & thoughts

- documentation leaves something to be desired (not enough explicit use cases/examples)
- TS support is not there yet (see: https://github.com/redwoodjs/redwood/issues/234)
  - The pages components & some core functions don't seem to have correct types (need to document further)
  - Redwood compiles with babel w/ the typescript preset so the types are stripped out at compile time (unlike webpack's `ts-loader`) – I woould like the option of checking types at compile time & not just with a linter
- Although Redwood provides the `src` dir as a root dir for package resolution, I think I prefer relative name resolution for in-project deps b/c it makes identifying project deps easier & the VSCode _Typescript Import Sorter_ extension organizes relative deps into their own section
- **Despite the tightly coupled prisma client & react frontend, I still need to manually write type defs for the front end (???)**
- Scaffolding/generation options need to be expanded (see below)

### RedwoodJS Bugs, features, suggestions

- Re-work the cell system such that `Today` doesn't reload when it is focused/unfocused (the _Success_ switches to the _Loading_ cell when `isFocused` is updated)
- Feature: config option to use barrel file pattern for components (etc.) - it appears this would be required to use the current dir import pattern w/ TS
- Suggestion: Generate scaffold components inside a `<MODEL>Scaffold` dir
- Bug: Generated model services don't extend the `...WhereUniqueInput` interface where applicable (e.g. in the `Update<Model>ModelArgs` interface, where both the input & id are required for the `update<Model>` function below – see `srvices/entries/entry` for more detail).
