module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://sheunaluko.com/',
    author: 'Sheun Aluko',
    title: 'Sheun Aluko',
    description: 'Professional Model Portfolio',
    keywords: [
      'Model',
      'Photography',
      'Portfolio',
      'Fashion',
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/pics`,
        name: 'photos',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Sheun Aluko - Professional Model Portfolio',
        short_name: 'Sheun Aluko',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/logo.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
