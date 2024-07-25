# Work-In-Progress
This project isn't ready yet! It will take some time to actually build.

## Demo:

Online version of this project is available at:
<br>
> [DEMO](https://comic.rosesintheflames.com/)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
> By default we're using adapter-node for this project.

## Installation:

- Install **PocketBase**, edit `.env.example` file accordingly (read comments) and rename it to `.env`.
<br>
- We commend using `Coolify` to host SvelteKit and Pocketbase projects.
<br>
- Add collections to pocketbase: `import collections` to your pocketbase `dashboard -> Settings -> Sync -> Import collections -> Load from JSON file` and select the `pb_schema.json` on this repository from the `/pocketbase` folder.

## Theming:

You can customize theming by editing `src/css/theme.css` file _(Limited customization available)_.
