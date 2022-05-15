Wikilinks is syntactic sugar to reference another node in a digital garden.
This is mostly used in other note taking software like
[Obsidian](https://obsidian.md). Wikilinks look like `[[Path/To/Wikilink]]`.
Wikilinks are case-sensitive, because
[URLs are case-sensitive too](https://webmasters.stackexchange.com/q/90339).

# How Wikilinks work in Thicket

There are two types of wikilinks in Thicket:

1. Ambiguous wikilinks
2. Normal wikilinks

## Ambiguous Wikilinks

Ambiguous wikilinks are wikilinks without a path separator in them, for example
`[[Foobar]]`. These are resolved by finding for them in the same directory as
the node referencing them. For instance, if a file `Fruits/Apple.md` has the
following contents:

```md
<!-- Fruits/Apple.md -->

Comparing an Apple and an [[Orange]] is not quite good.
```

`[[Orange]]` will resolve to `Fruits/Orange.md`.

### How is different than wikilinks in Obsidian?

In Obsidian, the wikilinks are resolved by probing the whole vault, with
preference given to the nodes in the same directory. For example, if we have
the following files:

```
.
├── Index.md
└── Fruits
    └── Orange.md
```

And the content of `Fruit.md` is:

```md
<!-- Fruit.md -->

[[Orange]] is a fruit.
```

Then `[[Orange]]` will resolve to `Fruits/Orange.md` automatically. Whereas in
Thicket, `[[Orange]]` will resolve to `Orange.md`, which does not exist.

## Normal Wikilinks

Examples:

- `[[/Fruits]]` will resolve to `Fruits.md` but is rendered as an
  absolute path.
- `[[Fruits/Orange]]` will resolve to `Fruits/Orange.md`.

# Change wikilink text

By default, wikilinks will display its content in the rendered HTML.
To make `[[Oranges]]` display `Orange the fruit`, you can write both of them
in the "wikilink shell" by separating with a pipe (|):

`[[Oranges|Orange the fruit]]`

The default separator can be changed in [[Configuration#markdownconfigts|markdown.config.ts]].
