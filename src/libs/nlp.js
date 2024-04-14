const nlp = require('compromise');

let doc = nlp('The quick brown fox jumps over the lazy dog.');

// Extract nouns (potential key concepts)
let nouns = doc.nouns().out('array');

// Extract verbs (potential relationships)
let verbs = doc.verbs().out('array');

console.log(nouns); // ['fox', 'dog']
console.log(verbs); // ['jumps']
