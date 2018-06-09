// -------------------------------------------------------------
// Metadata.
// -------------------------------------------------------------

exports.siteMetadata = {
  title: 'Solar Sailer',
  author: 'Matthieu Oger',
  description: 'A collection of thoughts and opinions by Matthieu Oger',
  keywords: [
    'solar',
    'sailer',
    'matthieu',
    'oger',
    'technology',
    'design',
    'development',
    'dev',
    'photography',
    'pixelnest'
  ],
  handles: {
    twitter: 'solarsailer',
    github: 'solarsailer',
    dribbble: 'solarsailer',
    unsplash: 'solarsailer',
    instagram: 'matthieuoger',
    speakerDeck: 'solarsailer'
  },
  url: 'solarsailer.net',
  siteUrl: `http://solarsailer.net/`,
  googleAnalyticsCode: 'UA-41853457-1',
  googleFonts: ['Rubik:300,300i,400,400i,500,500i,700,700i,900,900i|Fira+Mono']
}

// -------------------------------------------------------------
// Plugins.
// -------------------------------------------------------------

exports.plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/content/posts`,
      name: 'posts'
    }
  },
  {
    resolve: `gatsby-plugin-nprogress`,
    options: {
      color: '#f1c40f',
      showSpinner: false
    }
  },
  'gatsby-plugin-feeds',
  'gatsby-transformer-remark',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-react-next'
]
