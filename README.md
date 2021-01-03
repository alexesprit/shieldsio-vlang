# shieldsio-vlang

A custom endpoint to allow display a version of a V project from project files.

## Usage

### URL format

The format of URL is the following: `https://shieldsio-vlang.vercel.app/api?owner={OWNER}&repo={REPO}`, where

-   `OWNER` is your name on GitHub
-   `REPO` is your repository name on GitHub

### Example

-   Endpoint URL: `https://shieldsio-vlang.vercel.app/api?owner=alexesprit&repo=colors`
-   Badge image URL: `https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%3Fowner%3Dalexesprit%26repo%3Dcolors`

![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fshieldsio-vlang.vercel.app%2Fapi%3Fowner%3Dalexesprit%26repo%3Dcolors)

## Development

```sh
# Install dependencies
> npm install

# Run dev server
> npm run dev

# Run linter
> npm run lint
```

## License

Licensed under the [MIT License](LICENSE.md).
