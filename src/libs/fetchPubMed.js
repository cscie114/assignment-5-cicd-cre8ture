const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const compromise = require('compromise');

// Define additional stop words
const additionalStopWords = ['of', 'and', 'there', 'the', 'such', 'on', 'with', 'at', 'from', 'by', 'about', 'as'];

exports.fetchData = async function() {
  const response = await fetch('https://pubmed.ncbi.nlm.nih.gov/?term=executive+functions');
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Get the list of papers
  const papers = Array.from(document.querySelectorAll('.docsum-content'));

  // For each paper, extract the necessary information and analyze the summary
  const data = papers.map(paper => {
    const title = paper.querySelector('.docsum-title').textContent;
    const author = paper.querySelector('.docsum-authors').textContent;
    const summary = paper.querySelector('.docsum-snippet').textContent;

    // Analyze the summary after removing stop words
    let doc = compromise(summary);
    doc.remove('#StopWord'); // Remove default stop words
    additionalStopWords.forEach(word => doc.remove(word)); // Remove additional custom stop words
    const cleanSummary = doc.text(); // Gets the text back without stop words

    // Now extract nouns and terms from the cleaned summary
    const nouns = doc.nouns().out('array');
    const terms = doc.terms().out('array');

    return { title, author, summary: cleanSummary, nouns, terms };
  });

  return data;
}
