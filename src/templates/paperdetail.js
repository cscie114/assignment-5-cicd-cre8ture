// import React from 'react';
// import { graphql } from 'gatsby';
// import { analyzeTextToGraphData } from '../libs/analyze_paragraphs';
// import {createGraph} from '../libs/graph';
// // This query will be executed by Gatsby to fetch the data for each paper
// export const query = graphql`
//   query($id: String!) {
//     pubMedPaper(id: { eq: $id }) {
//       title
//       summary
//       author
//       terms
//       nouns
//     }
//   }
// `;

// // The PaperDetail component receives the data as a prop and renders it
// const PaperDetail = ({ data }) => {
//   const { pubMedPaper } = data; // Destructure the fetched data

//   return (
//     <article>
//       <h1>{pubMedPaper.title}</h1>
//       <p><strong>Author:</strong> {pubMedPaper.author}</p>
//       <section>
//         <h2>Summary</h2>
//         <p>{pubMedPaper.summary}</p>
//       </section>
//       <section>
//         <h2>Key Terms</h2>
//         <ul>
//           {pubMedPaper.terms.map((term, index) => (
//             <li key={index}>{term}</li>
//           ))}
//         </ul>
//       </section>
//       <section>
//         <h2>Nouns</h2>
//         <ul>
//           {pubMedPaper.nouns.map((noun, index) => (
//             <li key={index}>{noun}</li>
//           ))}
//         </ul>
//       </section>
//     </article>
//   );
// };

// export default PaperDetail;

import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { analyzeTextToGraphData } from '../libs/analyze_paragraphs';
import { createGraph } from '../libs/graph';

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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <article style={{ flex: 1 }}>
        <h1>{pubMedPaper.title}</h1>
        <p><strong>Author:</strong> {pubMedPaper.author}</p>
        <section>
          <h2>Summary</h2>
          <p>{pubMedPaper.summary}</p>
        </section>
        <section>
          <h2>Key Terms</h2>
          <ul>
            {pubMedPaper.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Nouns</h2>
          <ul>
            {pubMedPaper.nouns.map((noun, index) => (
              <li key={index}>{noun}</li>
            ))}
          </ul>
        </section>
      </article>
      <div ref={graphRef} style={{ width: '800px', height: '600px', zIndex: '100'}}></div>
    </div>
  );
};

export default PaperDetail;
