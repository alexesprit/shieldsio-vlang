# shieldsio-vlang

A custom endpoint to allow display a version of a V project from project files.

## Usage

Use the [web application](https://shieldsio-vlang.vercel.app/) to generate a badge for your project.

## API

### Read version from v.mod file

#### URL format

The format of URL is the following: `https://shieldsio-vlang.vercel.app/api/vmod/:owner/:repo/:ref`, where

-   `owner` is your name on GitHub
-   `repo` is your repository name on GitHub
-   (optional) `ref` is any valid git ref (branch, commit, or tag)

#### Example

-   Endpoint URL: `https://shieldsio-vlang.vercel.app/api/vmod/vlang/v`
-   Badge image URL: `https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvmod%2Fvlang%2Fv`

![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvmod%2Fvlang%2Fv)

### Read version from vpkg.json file

#### URL format

The format of URL is the following: `https://shieldsio-vlang.vercel.app/api/vpkg/:owner/:repo/:ref`, where

-   `owner` is your name on GitHub
-   `repo` is your repository name on GitHub
-   (optional) `ref` is any valid git ref (branch, commit, or tag)

#### Example

-   Endpoint URL: `https://shieldsio-vlang.vercel.app/api/vpkg/alexesprit/colors`
-   Badge image URL: `https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvpkg%2Falexesprit%2Fcolors`

![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%2Fvpkg%2Falexesprit%2Fcolors)

## Development

```sh
# Install dependencies
> npm install

# Run dev server
> npx vercel dev

# Run linter
> npm run lint

# Format files
> npm run format
```

## Credits

This project is inspired by [endel/shieldsio-patreon](https://github.com/endel/shieldsio-patreon) and uses some ideas (e.g. the web app for generating badges) from that project.

The web application uses [picturepan2/spectre](https://github.com/picturepan2/spectre) for building UI and [tholman/github-corners](https://github.com/tholman/github-corners) for displaying a GitHub corner.

The social media preview was created with using [Bootstrap's](https://icons.getbootstrap.com/icons/shield/) `shield` icon and [V's](https://github.com/vlang/v-logo) logo.

## License

Licensed under the [MIT License](LICENSE.md).
