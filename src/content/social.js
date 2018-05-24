// -------------------------------------------------------------
// Content.
// -------------------------------------------------------------

export const social = {
  twitter: {
    name: 'Twitter',
    color: '#4DA4FA',
    domain: 'com',
    url: 'https://twitter.com/@HANDLE/'
  },
  github: {
    name: 'GitHub',
    color: '#6CC644',
    domain: 'com',
    url: 'https://github.com/@HANDLE/'
  },
  dribbble: {
    name: 'Dribbble',
    color: '#EA4C89',
    domain: 'com',
    url: 'https://dribbble.com/@HANDLE/'
  },
  unsplash: {
    name: 'Unsplash',
    color: '#B3B3B3',
    domain: 'com',
    url: 'https://unsplash.com/@HANDLE/'
  },
  instagram: {
    name: 'Instagram',
    color: '#AB62EE',
    domain: 'com',
    url: 'https://www.instagram.com/@HANDLE/'
  }
}

export function getSocial(name) {
  return social[name]
}
