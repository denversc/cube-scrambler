import {Alea} from './alea'

/**
 * A function that produces floating-point numbers in the half-open range [0..1).
 */
export type RandomNumberFunction = () => number;

export function getRandomElementFrom<T>(elements: readonly T[], randomNumberFunction: RandomNumberFunction): T {
    const elementsLength = elements.length;
    if (elementsLength === 0) {
        throw new Error("elements must be empty (error code ggr47yr5be)");
    }
    const randomNumber = randomNumberFunction();
    if (randomNumber < 0 || randomNumber >= 1) {
        throw new Error(`randomNumberFunction ${randomNumberFunction} produced an invalid number: ${randomNumber}`
        + ` (must be greater than or equal to zero and strictly less than 1) ` +
            `(error code xy7zr5xkxr)`);
    }
    const elementIndex = Math.floor(elementsLength * randomNumber);
    return elements[elementIndex]!;
}

const mathDotRandomRandomNumberFunction = (() => Math.random()) satisfies RandomNumberFunction;

export function randomNumberFunctionFromMathDotRandom(): RandomNumberFunction {
    return mathDotRandomRandomNumberFunction;
}

export function randomNumberFunctionFromAlea(alea: Alea): RandomNumberFunction {
    return () => {
        while (true) {
            const randomNumber = alea.next();
            if (randomNumber != 1) {
                return randomNumber;
            }
        }
    }
}