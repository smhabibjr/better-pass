# Better Password Manager — Monorepo

| Directory            | Description                   |
|----------------------|-------------------------------|
| `web-app/`           | Rails web application         |
| `chrome-extension/`  | Chrome browser extension      |

## Development

### Rails web app
```bash
cd web-app
bundle install
rails server
```

### Chrome extension
```bash
cd chrome-extension
yarn install
yarn build
```

## Deployment

Set the root directory to `web-app/` in your hosting platform (Render, Railway, Heroku, etc.).
