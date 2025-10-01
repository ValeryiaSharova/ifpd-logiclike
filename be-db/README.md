# be-db

Development database

## Pre requirements

- `node.js`: `22.*`
- `yarn`: `4.*`
- `postgresql`: `16.*`
- [shared](../shared/README.md)

## Development

1. install `node`, `yarn`
2. install `PostgreSQL` (see [How to install database](#how-to-install-database))
3. run `yarn install`
4. run `yarn run build`
5. run parallel:
   - `yarn run pg:start` or `yarn run pg:start:win32`
   - `yarn run pg:migrate up`

⚠️ Do not run the command in step 5 with administrator privileges.
Running it will generate an error.
Run the server with normal user rights only ⚠️

## How to install database

### MacOS:

1. install `PostgreSQL`: `brew install postgresql@16`
2. set environment variables:

```sh
echo 'export PATH="$PATH:/opt/homebrew/opt/postgresql@16/bin"' >> ~/.zshrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.zshrc
```

3. Reload terminal
4. Initialize the database: `yarn run pg:init:darwin`

### WSL:

1. install `PostgreSQL` by ([tutorial](https://www.cybertec-postgresql.com/en/postgresql-on-wsl2-for-windows-install-and-setup/#highlighter_741240))
2. set environment variables:

```sh
echo 'export PATH="$PATH:/usr/lib/postgresql/16/bin/"' >> ~/.bashrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bashrc
```

3. Reload terminal
4. Initialize the database: `yarn run pg:init`
5. Change permissions: `sudo chmod -R 777 /var/run/postgresql/`

### Windows:

1. Download and install [PostgreSQL](https://www.postgresql.org/download/windows/)
2. Add PATH to `C:\\Program Files\PostgreSQL\16\bin` or your path to **bin** folder.
3. Restart PC
4. Initialize the database with `cmd.exe` (not `powershell` or other):

```cmd
  yarn run pg:init:darwin
```

## Production

⚠️ Note! Don't use this in production. Only for development! ⚠️

## How to check?

- Use the [dbdiagram.io](https://dbdiagram.io/) [scheme](./postgres.dbml) to view the structure of the database.
- Use [TablePlus](https://tableplus.com/) or alternative tool to view the database.

### Windows, Mac

Settings for connect:

- Name: `sttork`
- Tag: `local`
- Host: `127.0.0.1`
- Port: `5300`
- User: ``
- Password: ``
- Database: `postgres`

Click to the `Test`

Expected result: _Connection is ok_

### WSL

Settings for connect:

- Name: `sttork`
- Tag: `local`
- Host: `127.0.0.1`
- Port: `5300`
- User: execute in terminal `whoami` and paste result to field User
- Database: `postgres`

Click to the `Test`

Expected result: _Connection is ok_

## Available Scripts

In the project directory, you can run:

### `yarn run build`

Build the package for production to the `build` folder.

### `yarn run watch`

Watch code changes and rebuild package.

### `yarn run lint`

Run eslint.

### `yarn run pg:init`

### `yarn run pg:init:darwin`

Initialize the database.

### `yarn run pg:migrate`

Run migrations.\
See the [documentation](https://www.npmjs.com/package/node-pg-migrate) for the `node-pg-migrate` package for details.

### `yarn run pg:start`

Run the database.
