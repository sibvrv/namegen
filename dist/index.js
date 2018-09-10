"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Construct Markov Chain
 *
 * A Markov chain is "a stochastic model describing a sequence of possible events in which
 * the probability of each event depends only on the state attained in the previous event".
 *
 * @param {NameSetList} list
 * @returns {ChainInterface}
 */
function markovChain(list) {
    var chain = {};
    var counts = {};
    var increase = function (key, token) {
        var _a;
        if (chain[key]) {
            chain[key][token] = (chain[key][token] || 0) + 1;
        }
        else {
            chain[key] = (_a = {}, _a[token] = 1, _a);
        }
    };
    for (var i = 0; i < list.length; i++) {
        var names = list[i].split(/\s+/);
        increase('parts', names.length);
        for (var j = 0; j < names.length; j++) {
            var name_1 = names[j];
            increase('length', name_1.length);
            var c = name_1.substr(0, 1);
            increase('initial', c);
            var string = name_1.substr(1);
            var last_c = c;
            while (string.length > 0) {
                var c_1 = string.substr(0, 1);
                increase(last_c, c_1);
                string = string.substr(1);
                last_c = c_1;
            }
        }
    }
    for (var key in chain) {
        counts[key] = 0;
        for (var token in chain[key]) {
            var count = chain[key][token];
            var weighted = Math.floor(Math.pow(count, 1.3));
            chain[key][token] = weighted;
            counts[key] += weighted;
        }
    }
    chain['counts'] = counts;
    return chain;
}
exports.markovChain = markovChain;
/**
 * Random Name Generator
 * @class NameGenerator
 */
var NameGenerator = /** @class */ (function () {
    function NameGenerator() {
        this.chain_cache = {};
    }
    /**
     * Select data form chain
     * @param {ChainInterface} chain
     * @param {string} key
     * @returns {string}
     */
    NameGenerator.select = function (chain, key) {
        var len = chain['counts'][key];
        var idx = Math.floor(Math.random() * len);
        var t = 0;
        for (var token in chain[key]) {
            t += chain[key][token];
            if (idx < t) {
                return token;
            }
        }
        return '';
    };
    NameGenerator.make = function (chain) {
        var parts = +NameGenerator.select(chain, 'parts');
        var names = [];
        for (var i = 0; i < parts; i++) {
            var length_1 = +NameGenerator.select(chain, 'length');
            var c = NameGenerator.select(chain, 'initial');
            var name_2 = c;
            var last_c = c;
            while (name_2.length < length_1) {
                c = NameGenerator.select(chain, last_c);
                name_2 += c;
                last_c = c;
            }
            names.push(name_2);
        }
        return names.join(' ');
    };
    /**
     * Random Name Generator
     * @param {string} type
     * @returns {string}
     */
    NameGenerator.prototype.random = function (type) {
        var chain = this.chain_cache[type] || null;
        return chain ? NameGenerator.make(chain) : '';
    };
    NameGenerator.prototype.setChainFromValues = function (type, values) {
        this.chain_cache[type] = markovChain(values);
    };
    NameGenerator.prototype.setChain = function (type, chain) {
        this.chain_cache[type] = chain;
    };
    return NameGenerator;
}());
exports.NameGenerator = NameGenerator;
