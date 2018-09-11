# Random Name Generator

Generate original names with Markov chains.

## Usage

Using a set of words as training data, the library calculates the conditional probability of a letter coming up after a sequence of letters chosen so far. It looks back up to "n" characters, where "n" is the order of the model.
```typescript
import {markovChain, NameGenerator} from 'namegen';

const chain = markovChain([
  "Mercury", "Venus", "Earth", "Mars", "Eros", "Gespra", "Mathilde", 
  "Kalliope", "Eugenia", "Jupiter", "Saturn", "Uranus", "Neptune", "Ceres", "Pluto", 
  "Pasiphae", "Sinope", "Lysithea", "Carme", "Ananke", "Leda", "Thebe", "Adrastea"
]);

// Generate original names with Markov chains

const nameGen = new NameGenerator();
nameGen.setChainFromValues("planetary_names", chain);
  
console.log( nameGen.random("planetary_names") );
```

The name generator was written using TypeScript.