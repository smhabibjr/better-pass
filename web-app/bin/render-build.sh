#!/usr/bin/env bash
# Render build script for web-app
set -o errexit  # Exit on any error

# Install Ruby dependencies
bundle install

# Install JS dependencies
yarn install --frozen-lockfile

# Build JS and CSS assets
yarn build
yarn build:css

# Precompile Rails assets
bundle exec rails assets:precompile

# NOTE: db:migrate runs as Render's Pre-Deploy Command, not here.
# Build time-এ database connection থাকে না।
