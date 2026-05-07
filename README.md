# Better Password Manager — Monorepo

| Directory            | Description                   |
|----------------------|-------------------------------|
| `web-app/`           | Rails web application         |
| `chrome-extension/`  | Chrome browser extension      |

## Development

### Rails web app
```bash
git clone https://github.com/smhabibjr/better-pass.git
cd better-pass/web-app
bundle install
yarn install
bin/dev or rails server
```

### Chrome extension
```bash
cd better-pass/chrome-extension
yarn install
yarn start
```

## Deployment

Set the root directory to `web-app/` in your hosting platform (Render, Railway, Heroku, etc.).
