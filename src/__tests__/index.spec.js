const evaluate = require('..');

describe('evaluate', () => {
  it('should be a function', () => {
    expect(evaluate).toBeInstanceOf(Function);
  });

  describe('evaluate(secret, guess)', () => {
    it('should return an array of two numbers', () => {
      const result = evaluate([], []);
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toEqual(expect.any(Number));
      expect(result[1]).toEqual(expect.any(Number));
    });

    describe('when passing empty arrays', () => {
      it('should return [0, 0]', () => {
        const result = evaluate([], []);
        expect(result).toEqual([0, 0]);
      });
    });

    describe('when passing arrays of length 1', () => {
      describe('when guessed properly', () => {
        it('should return [1, 0]', () => {
          const result = evaluate(['red'], ['red']);
          expect(result).toEqual([1, 0]);
        });
      });

      describe('when guessed incorrectly', () => {
        it('should return [0, 0]', () => {
          const result = evaluate(['red'], ['blue']);
          expect(result).toEqual([0, 0]);
        });
      });
    });

    describe('when passing arrays of length 2', () => {
      describe('when no colors are present in the secret', () => {
        it('should return [0, 0]', () => {
          const result = evaluate(['red', 'green'], ['blue', 'orange']);
          expect(result).toEqual([0, 0]);
        });
      });

      describe('for one color well placed', () => {
        it('should return [1, 0]', () => {
          const result = evaluate(['red', 'green'], ['blue', 'green']);
          expect(result).toEqual([1, 0]);
        });
      });

      describe('for one color misplaced', () => {
        it('should return [0, 1]', () => {
          const result = evaluate(['red', 'green'], ['blue', 'red']);
          expect(result).toEqual([0, 1]);
        });
      });

      describe('for both colors misplaced', () => {
        it('should return [0, 2]', () => {
          const result = evaluate(['red', 'green'], ['green', 'red']);
          expect(result).toEqual([0, 2]);
        });
      });

      describe('for both colors well placed', () => {
        it('should return [2, 0]', () => {
          const result = evaluate(['red', 'green'], ['red', 'green']);
          expect(result).toEqual([2, 0]);
        });
      });
    });

    describe('when passing larger arrays', () => {
      it('should return the correct evaluation', () => {
        const result = evaluate([
          'red', 'green', 'blue', 'yellow', 'grey', 'rose', 'white',
        ], [
          'green', 'red', 'blue', 'purple', 'black', 'white', 'yellow',
        ]);

        expect(result).toEqual([1, 4]);
      });
    });
  });
});
