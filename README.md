# Kuula Viewer API type definitions

[![JSR Scope](https://jsr.io/badges/@guille)](https://jsr.io/@guille)
[![JSR](https://jsr.io/badges/@guille/kuula)](https://jsr.io/@guille/kuula)
[![JSR Score](https://jsr.io/badges/@guille/kuula/score)](https://jsr.io/@guille/kuula/score)

TypeScript definitions for **embedded Kuula Viewer API**.

## Features

- **Type safe** `window.KuulaPlayerAPI` and `KuulaPlayerAPI` objects
- **Autocomplete** in all API methods and Events
- **Documented parameters** to request Tours via URL
- **Additional documentation** to the one found in [Kuula Docs](https://kuula.co/support)

## Installation

For Node-based projects:

```bash
npx jsr add @guille/kuula -D
```

For Deno-based projects:

```bash
deno add @guille/kuula
```

## Setup

First, you need to set up Kuula in your project by following the
[Official Installation Guide](https://kuula.co/help/getting-started-api).

Setup it consists in adding the API `<script>` tag on your site:

```html
<script src="https://static.kuula.io/api.js"></script>
```

After your site loads, `KuulaPlayerAPI` and `window.KuulaPlayerAPI` global
objects will be available.

**To fully type these APIs** you need to add this declaration in a `.d.ts` file:

```ts
import type { KuulaPlayerApi } from "@guille/kuula";

declare global {
  // Types global `KuulaPlayerAPI` object
  const KuulaPlayerAPI: KuulaPlayerApi;

  interface Window {
    // Types `window.KuulaPlayerAPI` value
    KuulaPlayerAPI: KuulaPlayerApi;
  }
}
```

## Issues

Any question of issue found? Please raise it on the
[Issues](https://github.com/guilledll/kuula/issues) page.

## Contributing

Thanks for considering contributing to this project! Please make a
[Pull Request](https://github.com/guilledll/kuula/pulls) to see your
contribution added!
