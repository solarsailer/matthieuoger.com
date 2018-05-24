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
  home: {
    title: 'SolarSailer',
    subtitle: 'Matthieu Oger'
  },
  handles: {
    twitter: 'solarsailer',
    github: 'solarsailer',
    dribbble: 'solarsailer',
    unsplash: 'solarsailer',
    instagram: 'matthieuoger'
  },
  url: 'solarsailer.net',
  googleAnalyticsCode: 'UA-41853457-1',
  googleFonts: ['Rubik:300,300i,400,400i,500,500i,700,700i,900,900i']
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
  'gatsby-transformer-remark',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-react-next'
]
