import colors from 'windicss/colors';
import { Theme } from 'windicss/types/interfaces';

/**
 * Name of your website.
 */
export const siteName = 'The Thicket';

/**
 * String to be used to prefix all wikilinks. Useful if this site is going
 * to be accessible from a subdirectory, eg. domain.tld/garden. Should end
 * with a forward slash. Should start with a forward slash if not empty.
 * Default value should be '/' if no prefix is required.
 */
export const linkPrefix = '/';

/**
 * The location of the markdown files.
 * Right now Astro.glob does not seem to work with dynamic strings, make
 * sure to update it in src/pages/[...node].astro if you change this.
 */
export const source = 'content';

/**
 * Path of the index node which can be accessed on https://yoursite.test/
 */
export const indexNode = 'Index';

export const theme: Theme = {
  extend: {
    screens: {
      sm: '768px',
      md: '1024px',
    },
    fontFamily: {
      sans: ['Fira Sans', 'Arial', 'sans-serif'],
      mono: ['Victor Mono', 'Hack', 'monospace'],
    },
    colors: {
      // Surface in light mode
      light: colors.gray,
      // Surface in dark mode
      dark: colors.dark,
      primary: colors.blue,
      secondary: colors.purple,
      'text-primary': {
        light: colors.black,
        dark: colors.white,
      },
      'text-secondary': {
        light: colors.black,
        dark: colors.white,
      },
    },
    borderRadius: {
      generic: '3px',
      graph: '20px',
    },
  },
};

/**
 * SEO properties for your digital garden that go into the <head>.
 * Title and openGraph.basic is autogenerated and will be ignored.
 */
export const seo: Partial<SEOProps> = {
  description: 'The Thicket - My digital garden',
  openGraph: {
    image: {
      alt: 'A visual, cartoonic representation of a thicket',
    },
  },
  extend: {
    link: [
      {
        type: 'image/png',
        rel: 'icon',
        href: '/favicon.png',
      },
    ],
  },
};

// Types extracted from astro-seo.
//#region "Astro SEO types"
export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  nofollow?: boolean;
  noindex?: boolean;
  openGraph?: {
    basic?: {
      title: string;
      type: string;
      image: string;
      url?: string;
    };
    optional?: {
      audio?: string;
      description?: string;
      determiner?: string;
      locale?: string;
      localeAlternate?: string[];
      siteName?: string;
      video?: string;
    };
    image?: {
      url?: string;
      secureUrl?: string;
      type?: string;
      width?: number;
      height?: number;
      alt?: string;
    };
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      expirationTime?: string;
      authors?: string[];
      section?: string;
      tags?: string[];
    };
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
  extend?: {
    link?: Partial<Link>[];
    meta?: Partial<Meta>[];
  };
}

interface Link extends HTMLLinkElement {
  prefetch: boolean;
}

interface Meta extends HTMLMetaElement {
  property: string;
}
//#endregion
