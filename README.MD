# Fireworks Canvas Example

[Take a look at the live example!](https://tswaters.github.io/fireworks/)

## install

```sh
bower install --save fireworks-canvas
npm install --save fireworks-canvas
```

## usage

```js
const container = document.getElementById('container')
const options = {
  maxRockets: 3,            // max # of rockets to spawn
  rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
  numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
  explosionHeight: 0.2,     // minimum percentage of height of container at which rockets explode
  explosionChance: 0.08     // chance in each tick the rocket will explode
}
const fireworks = new Fireworks.start(container, options)
```

## support

- doesn't work within a node context

The package includes file that can be used in the browser, ./dist/fireworks.js. However, it is not an cjs module by any stretch... plus there is no `document` or `canvas` in the node world. You can of course package this file however you like - should work once it makes its way to a browser context.

- requires es6 in the browser

This should work in most evergreen browsers.  I haven't tested Safari or Opera but I don't see why they wouldn't work.

- In Edge it blows up in a pretty spectacularly, see [this issue](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6664966/)

## development

```sh
npm install
npm run-script build
# open ./index.html in your favourite evergreen browser
```

