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

        console.log("verbs", verbs);

        nouns.concat(adjectives).forEach(term => {
            if (!nodeMap.has(term)) {
                nodeMap.set(term, nodeId++);
                nodes.push({ id: nodeMap.get(term), label: term, type: term.includes(' ') ? 'phrase' : 'word' });
            }
        });


        verbs.forEach(verb => {
            let subjects = sentDoc.match(verb).lookBehind('#Noun').out('array');
            let objects = sentDoc.match(verb).lookAhead('#Noun').out('array');

            console.log("Verb:", verb);
            console.log("Subjects:", subjects);
            console.log("Objects:", objects);

            subjects.forEach(sub => {
                objects.forEach(obj => {
                    let sourceId = findBestNodeMatch(nodeMap, sub);
                    let targetId = findBestNodeMatch(nodeMap, obj);

                    console.log("Source:", sub, sourceId);
                    console.log("Target:", obj, targetId);

                    if (sourceId !== null && targetId !== null) { // Ensure both source and target exist
                        console.log("    CHOSEN Adding link:", sourceId, targetId, verb)
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

    console.log("Nodes:", nodes);
    console.log("Links:", links);

    return { nodes, links };
}


/**
 * Finds the best match for a term in a map of nodes. The best match is defined as the longest key that includes the term.
 *
 * @param {Map} nodeMap - The map of nodes to search. Keys are strings, values can be of any type.
 * @param {string} term - The term to search for in the keys of the nodeMap.
 * @returns {any|null} The value of the best match in the nodeMap, or null if no match is found.
 */
function findBestNodeMatch(nodeMap, term) {
    let bestMatch = null;
    let bestMatchLength = 0;
    for (let [key, value] of nodeMap.entries()) {
        // console.log("key", key, "TERM", term);
        if (key.includes(term) && key.length > bestMatchLength) {
            bestMatch = key;
            bestMatchLength = key.length;
        }
    }
    return bestMatch ? nodeMap.get(bestMatch) : null;
}