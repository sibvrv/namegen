declare global {
  type NameSetList = string[];

  interface ChainInterface {
    [key: string]: {
      [token: string]: number;
    };
  }

  interface ChainCache {
    [type: string]: ChainInterface;
  }

  interface ChainCounts {
    [key: string]: number;
  }
}

/**
 * Construct Markov Chain
 *
 * A Markov chain is "a stochastic model describing a sequence of possible events in which
 * the probability of each event depends only on the state attained in the previous event".
 *
 * @param {NameSetList} list
 * @returns {ChainInterface}
 */
export function markovChain(list: NameSetList) {
  let chain: ChainInterface = {};
  let counts: ChainCounts = {};

  const increase = function (key: string, token: string | number) {
    if (chain[key]) {
      chain[key][token] = (chain[key][token] || 0) + 1;
    } else {
      chain[key] = {[token]: 1};
    }
  };

  for (let i = 0; i < list.length; i++) {
    let names = list[i].split(/\s+/);
    increase('parts', names.length);

    for (let j = 0; j < names.length; j++) {
      let name = names[j];
      increase('length', name.length);

      let c = name.substr(0, 1);
      increase('initial', c);

      let string = name.substr(1);
      let last_c = c;

      while (string.length > 0) {
        let c = string.substr(0, 1);
        increase(last_c, c);

        string = string.substr(1);
        last_c = c;
      }
    }
  }

  for (let key in chain) {
    counts[key] = 0;

    for (let token in chain[key]) {
      let count = chain[key][token];
      let weighted = Math.floor(Math.pow(count, 1.3));

      chain[key][token] = weighted;
      counts[key] += weighted;
    }
  }
  chain['counts'] = counts;

  return chain;
}

/**
 * Random Name Generator
 * @class NameGenerator
 */
export class NameGenerator {
  chain_cache: ChainCache = {};

  /**
   * Select data form chain
   * @param {ChainInterface} chain
   * @param {string} key
   * @returns {string}
   */
  static select(chain: ChainInterface, key: string) {
    let len = chain['counts'][key];
    let idx = Math.floor(Math.random() * len);

    let t = 0;
    for (let token in chain[key]) {
      t += chain[key][token];
      if (idx < t) {
        return token;
      }
    }
    return '';
  }

  static make(chain: ChainInterface) {
    let parts = +NameGenerator.select(chain, 'parts');
    let names = [];

    for (let i = 0; i < parts; i++) {
      let length = +NameGenerator.select(chain, 'length');
      let c = NameGenerator.select(chain, 'initial');
      let name = c;
      let last_c = c;

      while (name.length < length) {
        c = NameGenerator.select(chain, last_c);
        name += c;
        last_c = c;
      }
      names.push(name);
    }
    return names.join(' ');
  }

  /**
   * Random Name Generator
   * @param {string} type
   * @returns {string}
   */
  public random(type: string) {
    let chain = this.chain_cache[type] || null;
    return chain ? NameGenerator.make(chain) : '';
  }

  public setChainFromValues(type: string, values: NameSetList) {
    this.chain_cache[type] = markovChain(values);
  }

  public setChain(type: string, chain: ChainInterface) {
    this.chain_cache[type] = chain;
  }
}
