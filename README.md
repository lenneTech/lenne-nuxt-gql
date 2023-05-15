<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: nuxt-zeus
- Package name: nuxt-zeus
- Description: My new Nuxt module
-->

# nuxt-zeus

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-zeus?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

Nuxt 3 module for https://github.com/graphql-editor/graphql-zeus 🚀

## Features

<!-- Highlight some of the features your module provide here -->
- 🚀 &nbsp;Use zeus in nuxt app
- 🚀 &nbsp;Some helper functions for better usage
- 🚀 &nbsp;Completely typed

## Quick Setup

1. Add `nuxt-zeus` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-zeus

# Using yarn
yarn add --dev nuxt-zeus

# Using npm
npm install --save-dev nuxt-zeus
```

2. Add `nuxt-zeus` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-zeus'
  ]
})
```

That's it! You can now use nuxt-zeus in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-zeus/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-zeus

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-zeus.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-zeus

[license-src]: https://img.shields.io/npm/l/nuxt-zeus.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-zeus

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
