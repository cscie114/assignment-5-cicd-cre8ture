

import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { analyzeTextToGraphData } from '../libs/analyze_paragraphs';
import { createGraph } from '../libs/graph';
import Layout from '../components/layout';

// This query will be executed by Gatsby to fetch the data for each paper
export const query = graphql`
  query($id: String!) {
    pubMedPaper(id: { eq: $id }) {
      title
      summary
      author
      terms
      nouns
    }
  }
`;

const PaperDetail = ({ data }) => {
  const { pubMedPaper } = data; // Destructure the fetched data
  const graphRef = useRef(null); // Ref for the D3 graph

  useEffect(() => {
    // Analyze the summary text to get nodes and links for the graph
    const graphData = analyzeTextToGraphData(pubMedPaper.summary);

    console.log("graphData", graphData);
    // Create the graph in the D3 canvas
    if (graphRef.current) {
      createGraph(graphRef.current, graphData.nodes, graphData.links);
    }
  }, [pubMedPaper.summary]); // Redraw graph when summary changes

  return (
      <Layout>
    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
    <article style={{ flex: 3, paddingRight: '20px' }}> {/* Increased flex factor and added some padding */}
        <h1>{pubMedPaper.title}</h1>
        <p><strong>Author:</strong> {pubMedPaper.author}</p>
        <section>
          <h2>Summary</h2>
          <p>{pubMedPaper.summary}</p>
        </section>
    <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', border: '1px solid blue' }}>

        <section style={{paddingRight: "20px"}}>
          <h2>Key Terms</h2>
          <ul>
            {pubMedPaper.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Phrases</h2>
          <ul>
            {pubMedPaper.nouns.map((noun, index) => (
              <li key={index}>{noun}</li>
            ))}
          </ul>
        </section>
        </div>
      </article>
      <div>
      <div ref={graphRef} style={{ width: '600px', height: '700px', zIndex: '100'}}></div>
      </div>
    </div>
    </Layout>

  );

};

export default PaperDetail;
