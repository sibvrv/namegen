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
export declare function markovChain(list: NameSetList): ChainInterface;
/**
 * Random Name Generator
 * @class NameGenerator
 */
export declare class NameGenerator {
    chain_cache: ChainCache;
    /**
     * Select data form chain
     * @param {ChainInterface} chain
     * @param {string} key
     * @returns {string}
     */
    static select(chain: ChainInterface, key: string): string;
    static make(chain: ChainInterface): string;
    /**
     * Random Name Generator
     * @param {string} type
     * @returns {string}
     */
    random(type: string): string;
    setChainFromValues(type: string, values: NameSetList): void;
    setChain(type: string, chain: ChainInterface): void;
}
