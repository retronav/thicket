---
tags: [docs]
---

A network graph shows all the nodes in a digital garden, with connecting them
by lines. If a node references another node via a backlink, both of them are
connected and will be shown accordingly in the network.

Thicket uses [vis-network](https://visjs.github.io/vis-network/docs/network/)
to display the network graph. It is lazily loaded and hence does not affect
loading times.
