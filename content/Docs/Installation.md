---
tags: [docs]
---

# Install as a template

## Cloning the repository

Thicket is a template. So you can clone it and start hacking right away!

```bash
$ mkdir my-garden && cd my-garden
$ git clone https://github.com/retronav/thicket.git .
```

## Installing dependencies

```bash
$ npm install # or yarn install, pnpm install
```

## Configuration

See [[Configuration]]

## Additional resources

- [[Wikilinks]]

## Updating

You probably won't require updating Thicket unless there is a bugfix / feature
addition upstream. To update Thicket, you can simply copy src/ of the newer
version over to your project. Care should be taken before updating if you have
heavily customized Thicket; you might lose them while copying over the updated
stock components.

# Install as a library

Thicket has its components and the core code published in a npm package,
`@retronav/thicket`. You can install this package to use the components in a
separate project. You can access which components are available by checking
[this page listing all the files in the package](https://unpkg.com/browse/@retronav/thicket/).
