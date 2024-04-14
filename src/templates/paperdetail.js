import React from 'react';
import { graphql } from 'gatsby';

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

// The PaperDetail component receives the data as a prop and renders it
const PaperDetail = ({ data }) => {
  const { pubMedPaper } = data; // Destructure the fetched data

  return (
    <article>
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
  );
};

export default PaperDetail;
