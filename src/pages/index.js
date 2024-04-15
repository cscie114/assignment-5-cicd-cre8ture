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
    <p>In cognitive science and neuropsychology, executive functions (collectively referred to as executive function and cognitive control) are a set of cognitive processes that are necessary for the cognitive control of behavior: selecting and successfully monitoring behaviors that facilitate the attainment of chosen goals. Executive functions include basic cognitive processes such as attentional control, cognitive inhibition, inhibitory control, working memory, and cognitive flexibility. Higher-order executive functions require the simultaneous use of multiple basic executive functions and include planning and fluid intelligence (e.g., reasoning and problem-solving)</p>
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
