// -------------------------------------------------------------
// Metadata.
// -------------------------------------------------------------

exports.siteMetadata = {
  title: 'Solar Sailer',
  author: 'Matthieu Oger',
  description:
    'I am a developer, designer and product manager from France. Co-founder of Pixelnest Studio.',
  keywords: [
    'solar',
    'sailer',
    'matthieu',
    'oger',
    'designer',
    'developer',
    'product manager',
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
    dribbble: 'matthieuoger',
    unsplash: 'matthieuoger',
    instagram: 'matthieuoger',
    speakerDeck: 'matthieuoger',
    linkedIn: 'matthieuoger'
  },
  url: 'matthieuoger.com',
  siteUrl: 'https://matthieuoger.com/',
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
    resolve: 'gatsby-plugin-nprogress',
    options: {
      color: '#f1c40f',
      showSpinner: false
    }
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [{resolve: 'gatsby-remark-prismjs'}]
    }
  },
  {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-41853457-1'
    }
  },
  'gatsby-plugin-sitemap',
  'gatsby-plugin-feeds',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-lodash'
]
