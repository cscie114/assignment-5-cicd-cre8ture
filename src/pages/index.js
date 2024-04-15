import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

export const query = graphql`
  query {
    allPubMedPaper {
      edges {
        node {
          id
          title
          author
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => (
  <Layout>
  <div>
    <h1>PubMed Papers</h1>
    {data.allPubMedPaper.edges.map(({ node }) => (
      <div key={node.id}>
        <h2>{node.title + ' '} <span style={{color:'white'}}>|</span> {' ' + node.author}</h2>
        <Link to={node.id}>
          <button>View Paper</button>
        </Link>
      </div>
    ))}
  </div>
  </Layout>
);

export default IndexPage;
