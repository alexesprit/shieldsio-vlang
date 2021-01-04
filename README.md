# shieldsio-vlang

A custom endpoint to allow display a version of a V project from project files.

## Usage

### Read version from v.mod file

#### URL format

The format of URL is the following: `https://shieldsio-vlang.vercel.app/api/vmod/owner/repo`, where

-   `owner` is your name on GitHub
-   `repo` is your repository name on GitHub

#### Example

-   Endpoint URL: `https://shieldsio-vlang.vercel.app/api/vmod/vlang/v`
-   Badge image URL: `https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fgithub%2Falexesprit%2Fcolors`

![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvmod%2Fvlang%2Fv)

### Read version from vpkg.json file

#### URL format

The format of URL is the following: `https://shieldsio-vlang.vercel.app/api/vpkg/owner/repo`, where

-   `owner` is your name on GitHub
-   `repo` is your repository name on GitHub

#### Example

-   Endpoint URL: `https://shieldsio-vlang.vercel.app/api/vmod/alexesprit/colors`
-   Badge image URL: `https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvmod%2Falexesprit%2Fcolors`

![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvmod%2Falexesprit%2Fcolors)

## Development

```sh
# Install dependencies
> npm install

# Run dev server
> npx vercel dev

# Run linter
> npm run lint
```

## License

Licensed under the [MIT License](LICENSE.md).
