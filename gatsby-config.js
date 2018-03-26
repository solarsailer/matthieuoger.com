module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts'
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`
  ]
}
