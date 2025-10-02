# IFPD-LL

Ideas for product development - LogicLike

## Environment variables

You can run a project in several modes, depending on the mode, one or another backend will be used.

Available env modes:

- `local` (default in watch mode)
- `staging`
- `production`

You can run a project in any of the listed modes. To do this, create a file `.env.local` in the root of the repository (**note that this file should be ignored by the `git`**) and put the line `PUBLIC_ENV` in it.

For details see code and [dotenv-flow documentation](https://www.npmjs.com/package/dotenv-flow).

## Pre requirements

- `node.js`: `22.*`
- `yarn`: `4.*`

## Development

1. install `node`, `yarn`
2. run `yarn install` on repository root
3. install all packages (see instructions):
   - [be-api](be-api/README.md)
   - [be-db](be-db/README.md)
   - [fe-web](fe-web/README.md)
   - [shared](shared/README.md)

## Available Scripts

In the repository root, you can run:

### `yarn run prepare`

Run husky.\
See the [documentation](https://typicode.github.io/husky/) for the `husky` package for details.

### `yarn run prettier`

Run prettier.\
See the [documentation](https://prettier.io/docs/en/cli.html) for the `prettier` package for details.

## Quick start

1. run `yarn install` on repository root
2. install postgres (see the [instruction](be-db/README.md))
3. run `yarn run pg:init` on be-db
4. run `yarn run pg:start` on be-db
5. run `yarn run pg:migrate up` on be-db
6. run `yarn run watch` on be-api
7. run `yarn run watch` on fe-web
