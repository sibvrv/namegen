import {expect} from 'chai';
import {markovChain} from './index';

describe('Prepare Data', function () {

  describe('basic', function () {
    it('paragraph markup', function () {

      const result = markovChain(['first', 'fatal', 'force', 'fun', 'fantastic', 'favorite']);
      expect(result).to.deep.equal(
        {
          parts: {'1': 10},
          length: {'3': 1, '5': 4, '8': 1, '9': 1},
          initial: {f: 10},
          f: {i: 1, a: 4, o: 1, u: 1},
          i: {r: 1, c: 1, t: 1},
          r: {s: 1, c: 1, i: 1},
          s: {t: 2},
          a: {t: 1, l: 1, n: 1, s: 1, v: 1},
          t: {a: 2, i: 1, e: 1},
          o: {r: 2},
          c: {e: 1},
          u: {n: 1},
          n: {t: 1},
          v: {o: 1},
          counts:
            {
              parts: 10,
              length: 7,
              initial: 10,
              f: 7,
              i: 3,
              r: 3,
              s: 2,
              a: 5,
              t: 4,
              o: 2,
              c: 1,
              u: 1,
              n: 1,
              v: 1
            }
        }
      );
    });
  });

});
