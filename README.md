# KuulaPlayerAPI TypeScript Definitions

[![JSR Scope](https://jsr.io/badges/@guille)](https://jsr.io/@guille)
[![JSR](https://jsr.io/badges/@guille/kuula)](https://jsr.io/@guille/kuula)
[![JSR Score](https://jsr.io/badges/@guille/kuula/score)](https://jsr.io/@guille/kuula/score)

TypeScript definitions for **embedded Kuula Player API**.

[Kuula](https://kuula.co/) is a popular virtual tour software to create 3D 360
tours for real estate, architecture, construction, art galleries, education and
more.

## Features

- **Type safe** `window.KuulaPlayerAPI` and `KuulaPlayerAPI` objects
- **Autocomplete** in all API methods, Events and Listeners
- **Documented parameters** to request Tours via URL
- **Additional documentation** to the one found in
  [Kuula Docs](https://kuula.co/support)

## Setup

First, you need to set up Kuula in your project by following the
[official installation guide](https://kuula.co/help/getting-started-api).

It consists in adding the API `<script>` tag on your site:

```html
<head>
  <script src="https://static.kuula.io/api.js"></script>
</head>
```

After your site loads, `KuulaPlayerAPI` and `window.KuulaPlayerAPI` global
objects will be available.

**To fully type these APIs** you need to add this declaration in a `.d.ts` file:

```ts
import type { KuulaPlayerApi } from "@guille/kuula";

declare global {
  // Type global `KuulaPlayerAPI` object
  const KuulaPlayerAPI: KuulaPlayerApi;

  interface Window {
    // Type `window.KuulaPlayerAPI` object
    KuulaPlayerAPI: KuulaPlayerApi;
  }
}
```

## Usage

After globally declaring `KuulaPlayerAPI` now you can safely use Kuula Player
API.

```ts
window.KuulaPlayerAPI.addEventListener("hotspot", (event) => {});
// OR
KuulaPlayerAPI.synchronizePlayers(true);
```

It is also possible to declare a function to safely add and remove event
listeners:

```ts
import type { FrameLoadedFunction } from "@guille/kuula";

const frameLoaded: FrameLoadedFunction = (event) => {}; // Typed function and parameter

KuulaPlayerAPI.addEventListener("frameloaded", frameLoaded);
KuulaPlayerAPI.removeEventListener("frameloaded", frameLoaded);
```

### Kuula URL constructor

Kuula allows [sharing posts](https://kuula.co/help/share-embed) using a **URL
with parameters**; usually URLs look like this:

```
https://kuula.co/share/xxxxx?logo=0&info=0&zoom=1&sd=1&...
```

Type `KuulaURLParams` can be used to build a **type safe URL**:

```ts
import type { KuulaURLParams } from "@guille/kuula";

const defaultOptions: Partial<KuulaURLParams> = {
  info: 0,
  fs: 0,
  vr: 0,
  gyro: 0,
  keys: 0,
  initload: 1,
  thumbs: -1,
  inst: "es",
};

let kuulaUrl = `https://kuula.co/share/xxxxx?`;

// Append parameters to the URL
for (const [key, value] of Object.entries(defaultOptions)) {
  kuulaUrl += "&" + key + "=" + value;
}
```

### MessageEvent listening

In some cases we may need to listen to events that are not accessible throw the
API like, `start` or `postready`. To achieve this we can listen to `message`
events.

```ts
import type { KuulaMessageData } from "@guille/kuula";

const postReady = (event: MessageEvent<KuulaMessageData>) => {
  if (
    event.origin === "https://kuula.co" &&
    event.data.cmd === "postready"
  ) {
    // 'event.data' is typed properly for 'postready' at this point
  }
};

window.addEventListener("message", postReady);
```

## Issues

Any question of issue found? Please raise it on the
[Issues](https://github.com/guilledll/kuula/issues) page.

## Contributing

Thanks for considering contributing to this project!

Please make a [Pull Request](https://github.com/guilledll/kuula/pulls) to see
your contribution added!
