export const social = {
  twitter: {
    name: 'Twitter',
    color: 'hsl(210, 95%, 64%)',
    domain: 'com',
    url: 'https://twitter.com/@HANDLE/'
  },
  github: {
    name: 'GitHub',
    color: 'hsl(102, 53%, 52%)',
    domain: 'com',
    url: 'https://github.com/@HANDLE/'
  },
  dribbble: {
    name: 'Dribbble',
    color: 'hsl(337, 79%, 61%)',
    domain: 'com',
    url: 'https://dribbble.com/@HANDLE/'
  },
  unsplash: {
    name: 'Unsplash',
    color: 'hsl(31, 86%, 53%)',
    domain: 'com',
    url: 'https://unsplash.com/@HANDLE/'
  },
  instagram: {
    name: 'Instagram',
    color: 'hsl(271, 80%, 66%)',
    domain: 'com',
    url: 'https://www.instagram.com/@HANDLE/'
  },
  speakerDeck: {
    name: 'Speaker Deck',
    color: 'hsl(150, 50%, 40%)',
    domain: 'com',
    url: 'https://speakerdeck.com/@HANDLE/'
  },
  linkedIn: {
    name: 'LinkedIn',
    color: 'hsl(201, 100%, 35%)',
    domain: 'com',
    url: 'https://linkedin.com/in/@HANDLE/'
  }
}

export function getSocial(name) {
  return social[name]
}
