---
tags: [docs, markdown]
---

Frontmatter is the metadata accompanying the markdown content in a node.

For example:

```md
---
date: 11-05-2022
tags:
  - foo
  - bar
---

This is tagged `foo` and `bar.
```

The YAML enclosed by the "fences"(`---`) is called frontmatter. These contain
special values that can be used to enhance the HTML output. Frontmatter is
opt-in for each node and should be written only at the start of a document.

# Supported frontmatter keys

These keys are supported in frontmatter as of now:

- `date`: the date when the node was created.
- `updated`: the date when the node last updated.
- `tags`: list of tags to node can be considered under. Tags can help in better
  grouping of content and optionally support per-tag RSS feeds.
