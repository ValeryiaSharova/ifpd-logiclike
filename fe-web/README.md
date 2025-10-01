# fe-web

Frontend

This project was bootstrapped with [Vite](https://vite.dev/).

## Infrastructure

TODO

## Environment variables

You can run a project in several modes, depending on the mode, one or another backend will be used.

Available env modes:

- `local` (default in watch mode)
- `staging`
- `production`

You can run a project in any of the listed modes. To do this, create a file `.env.local` in the root of the repository (**note that this file should be ignored by the `git`**) and put the line `VITE_PUBLIC_ENV` in it. For example:

```sh
echo "VITE_PUBLIC_ENV=staging" >> .env
```

For details see [code](src/constants/env.ts) and [Vite documentation](https://vite.dev/guide/env-and-mode.html).

## Pre requirements

- `node.js`: `22.*`
- `yarn`: `4.*`

## Development

1. install `node`, `yarn`
2. run `yarn install` on repository root

```sh
yarn run watch:po
```

```sh
yarn run watch
```

## Production

Just merge the changes into the `main` branch.

### Manual deploy

1. run `yarn install --immutable` on repository root.
2. run `yarn run build:po`
3. run `yarn run build`

When the build is complete, serve the files from the `/build` directory using nginx as regular static files.

## Available Scripts

In the project directory, you can run:

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vite.dev/guide/static-deploy.html) for more information.

### `yarn run build:po`

Generate typescript-compatible dictionaries from .po files.

### `yarn run watch`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run watch:po`

Generate typescript-compatible dictionaries from .po files in watch mode.

### `yarn run typecheck`

Run TypeScript typecheck.

### `yarn run lint`

Run eslint.

## Learn More

You can learn more in the [Vite documentation](https://vite.dev/guide/).

To learn React, check out the [React documentation](https://react.dev/).
