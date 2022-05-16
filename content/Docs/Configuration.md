---
tags: [docs]
---

# General notes

## `site.config.ts`

Thicket stores its site-wide configuration in a single file, `site.config.ts`.
You can configure the URL where your digital garden will be hosted, the
directory where your nodes will be stored. You can also configure the theme by
editing the [Windi CSS](https://windicss.org) configuration.

If you change the directory where the files are stored in this file, you will
need to manually update it in `src/pages/[...node].astro`, since
[`Astro.glob()`](https://docs.astro.build/en/reference/api-reference/#astroglob)
does not support dynamic strings at the moment.

## `markdown.config.ts`

All of the markdown configuration required by [Astro](https://astro.build) is
stored in `markdown.config.ts`. This configuration is kept separate from the
main configuration because there can be opportunities to add more features to
Thicket which might require parsing markdown files differently.

# Some more configuration files

- `astro.config.ts`
  This is the configuration file used by
  [Astro](https://docs.astro.build/en/reference/configuration-reference/).
- `windi.config.ts`
  This is the configuration file used by
  [Windi CSS](https://windicss.org/guide/configuration.html).
- `vite.config.ts`
  This is the configuration file used by
  [Vite](https://vitejs.dev/config/).

# Configuration Checklist

> NOTE: Store the markdown files in a directory in the same one as of
> Thicket. It probably won't work if you store it outside the template.

- [ ] Change the site name, description and other details as per needs in
      `site.config.ts`. **REQUIRED**
- [ ] Change the directory where the markdown files are stored
      in `site.config.ts`. **OPTIONAL**
- [ ] Get creative and change the
      [theme](https://windicss.org/guide/configuration.html#example-configuration)
      in `site.config.ts`. **OPTIONAL**
- [ ] Change the markdown configuration in `markdown.config.ts`. **RECOMMENDED**
- [ ] Change the
      [site URL](https://docs.astro.build/en/reference/configuration-reference/#site)
      in `astro.config.ts`. **REQUIRED**
- [ ] Check out [[Hosting]]. **REQUIRED**

# Customization

Customizing Thicket is fairly straightforward. All the components and layouts
are located located in `src`.
