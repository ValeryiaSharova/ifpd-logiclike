# IFPD-LL

Ideas for product development - logicLike

## Infrastructure

TODO

## Environment variables

You can run a project in several modes, depending on the mode, one or another backend will be used.

Available env modes:

- `local` (default in watch mode)
- `staging`
- `production`

You can run a project in any of the listed modes. To do this, create a file `.env.local` in the root of the repository (**note that this file should be ignored by the `git`**) and put the line `PUBLIC_ENV` in it. For example:

```sh
echo "PUBLIC_ENV=staging" >> .env
```

For details see code and [dotenv-flow documentation](https://www.npmjs.com/package/dotenv-flow).

## Pre requirements

- `node.js`: `22.*`
- `yarn`: `4.*`
- `tmux`: `*` (optional, for local launch)

## Development

1. install `node`, `yarn`, `tmux`

```sh
brew install tmux
```

2. run `chmod 0755 ./tmux.sh`
3. run `chmod 0755 ./checks.sh`
4. run `yarn install` on repository root
5. install all packages (see instructions):
   - [be-api](be-api/README.md)
   - [be-db](be-db/README.md)
   - [fe-web](fe-web/README.md)
   - [shared](shared/README.md)
6. update `tmux` config: `cp -R ./.tmux.conf ~/.tmux.conf`
7. run `./tmux.sh` on repository root

## Available Scripts

In the repository root, you can run:

### `yarn run prepare`

Run husky.\
See the [documentation](https://typicode.github.io/husky/) for the `husky` package for details.

### `yarn run prettier`

Run prettier.\
See the [documentation](https://prettier.io/docs/en/cli.html) for the `prettier` package for details.

## Docker

TODO
