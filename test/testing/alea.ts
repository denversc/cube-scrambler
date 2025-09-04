// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

type MashFunction = (data: number | string) => number;

/**
 * A pseudo-random number generator using the "Alea" algorithm.
 *
 * This is based on the work by Johannes Baagøe in 2010, which is mirrored at
 * https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
 *
 * This code is an adaptation of the random number generator from
 * https://github.com/davidbau/seedrandom/blob/4460ad32/lib/alea.js
 */
export class Alea {
  private c = 1;
  private s0: number;
  private s1: number;
  private s2: number;

  /**
   * Creates a new {@link Alea} instance with the given seed.
   *
   * Instances of this class generate pseudo-random data. Any two {@link Alea}
   * objects instantiated with the same `seed` are guaranteed to generate the
   * same sequence of numbers.
   *
   * @param seed the seed to use for random number generation.
   */
  constructor(seed: number | string) {
    const mash = Mash();

    this.s0 = mash(" ");
    this.s1 = mash(" ");
    this.s2 = mash(" ");
    this.s0 -= mash(seed);
    if (this.s0 < 0) {
      this.s0 += 1;
    }
    this.s1 -= mash(seed);
    if (this.s1 < 0) {
      this.s1 += 1;
    }
    this.s2 -= mash(seed);
    if (this.s2 < 0) {
      this.s2 += 1;
    }
  }

  /** Returns a random number in the range [0..1]. */
  next(): number {
    return this._next() + Math.trunc(this._next() * 0x200000) * 1.1102230246251565e-16; // 2^-53
  }

  private _next(): number {
    const t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32
    this.s0 = this.s1;
    this.s1 = this.s2;
    return (this.s2 = t - (this.c = Math.trunc(t)));
  }
}

function Mash(): MashFunction {
  let n = 0xefc8249d;

  return (data: number | string) => {
    const stringData = String(data);
    for (let index = 0; index < stringData.length; index++) {
      // eslint-disable-next-line unicorn/prefer-code-point
      n += stringData.charCodeAt(index);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };
}
