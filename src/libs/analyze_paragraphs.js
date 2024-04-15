// Test this in a simple Node.js script without Webpack
const nlp = require('compromise');
// const compromiseSentences = require('compromise-sentences'); 
nlp.extend(require('compromise-sentences'))

// compromiseSentences(nlp);
export function analyzeTextToGraphData(paragraph) {
    console.log("Paragraph:", paragraph);
    let doc = nlp(paragraph);
    let sentences = doc.sentences().out('array');

    let nodes = [], links = [], nodeId = 0;
    const nodeMap = new Map();

    sentences.forEach(sentence => {
        let sentDoc = nlp(sentence);

        let nouns = sentDoc.nouns().out('array');
        let adjectives = sentDoc.adjectives().out('array');
        let verbs = sentDoc.verbs().out('array');

        nouns.concat(adjectives).forEach(term => {
            if (!nodeMap.has(term)) {
                nodeMap.set(term, nodeId++);
                nodes.push({ id: nodeMap.get(term), label: term, type: term.includes(' ') ? 'phrase' : 'word' });
            }
        });

        // console.log("nodeMap", nodeMap);

        verbs.forEach(verb => {
            let subjects = sentDoc.match(verb).lookBehind('#Noun').out('array');
            let objects = sentDoc.match(verb).lookAhead('#Noun').out('array');

            // console.log("Subjects:", subjects);
            // console.log("Objects:", objects);

            subjects.forEach(sub => {
                objects.forEach(obj => {
                    let sourceId = findBestNodeMatch(nodeMap, sub);
                    let targetId = findBestNodeMatch(nodeMap, obj);

                    if (sourceId && targetId) { // Ensure both source and target exist
                        links.push({
                            source: sourceId,
                            target: targetId,
                            relation: verb
                        });
                    }
                });
            });
        });
    });

    // console.log("Nodes:", nodes);
    // console.log("Links:", links);

    return { nodes, links };
}
function findBestNodeMatch(nodeMap, term) {
    let bestMatch = null;
    let bestMatchLength = 0;
    for (let [key, value] of nodeMap.entries()) {
        if (key.includes(term) && key.length > bestMatchLength) {
            bestMatch = key;
            bestMatchLength = key.length;
        }
    }
    return bestMatch ? nodeMap.get(bestMatch) : null;
}
