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
    github: 'solarsailer',
    twitter: 'solarsailer',
    dribbble: 'solarsailer',
    unsplash: 'solarsailer',
    instagram: 'matthieuoger'
  },
  googleAnalyticsCode: 'UA-41853457-1',
  url: 'solarsailer.net'
}

// -------------------------------------------------------------
// Plugins.
// -------------------------------------------------------------

exports.plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/posts`,
      name: 'posts'
    }
  },
  `gatsby-transformer-remark`,
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-react-helmet`
]
