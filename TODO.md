# TODOs for onmyti.me
### Project ideas, suggestions & TODOs

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

### Notes & thoughts

- documentation leaves something to be desired (not enough explicit use cases/examples)
- TS support is not there yet (see: https://github.com/redwoodjs/redwood/issues/234)
  - The pages components & some core functions don't seem to have correct types (need to document further)
- **Despite the tighlt coupled prisma client & react frontend, I still need to manually write type defs for the front end (???)**
- Scaffolding/generation options need to be expanded (see below)

### Bugs, features, suggestions

- Feature: config option to use barrel file pattern for components (etc.) - it appears this would be required to use the current dir import pattern w/ TS
- Suggestion: Generate scaffold components inside a `<MODEL>Scaffold` dir
- Bug: Generated model services don't extend the `...WhereUniqueInput` interface where applicable (e.g. in the `Update<Model>ModelArgs` interface, where both the input & id are required for the `update<Model>` function below – see `srvices/entries/entry` for more detail).
