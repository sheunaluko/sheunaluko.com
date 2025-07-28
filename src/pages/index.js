import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { createGlobalStyle } from 'styled-components';

import Portfolio from '../components/Portfolio';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    background: #000;
    overflow: hidden;
  }
`;

export default function Index({ data: { site } }) {
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>{site.siteMetadata.title}</title>
        <meta name="description" content={site.siteMetadata.description} />
      </Helmet>
      <Portfolio />
    </>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
