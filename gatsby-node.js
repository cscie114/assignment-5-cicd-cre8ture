const path = require('path');
const { fetchData } = require('./src/libs/fetchPubMed.js');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const data = await fetchData(); // Fetch and analyze the data

  // For each item in the data, create a node
  data.forEach((item, i) => {
    const node = {
      ...item,
      id: createNodeId(`PubMedPaper-${i}`),
      internal: {
        type: 'PubMedPaper',
        contentDigest: createContentDigest(item),
      },
    };
    createNode(node);
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allPubMedPaper {
        edges {
          node {
            id
            title
            summary
            author
            terms
            nouns
          }
        }
      }
    }
  `);

  // Handle errors in GraphQL query execution
  if (result.errors) {
    throw result.errors;
  }

  // Create a page for each PubMed paper
  result.data.allPubMedPaper.edges.forEach(({ node }) => {
    createPage({
      path: node.id,
      component: path.resolve(`./src/templates/paperDetail.js`),
      context: {
        id: node.id,
        title: node.title,
        summary: node.summary,
        author: node.author,
        terms: node.terms,
        nouns: node.nouns,
      },
    });
  });
};
