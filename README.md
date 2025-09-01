# cube-scrambler

This is a TypeScript project for the Bun runtime that has unit tests that can be run both via bun's built-in test runner AND in a web browser, to ensure that the compiled JavaScript works as expected in a browser runtime.

## Installation

To install dependencies:

```bash
bun install
```

## Running Tests

This project uses `vitest` for testing. You can run the tests in two environments:

### Bun Runtime

To run the tests using Bun's built-in test runner, execute the following command:

```bash
bun test
```

### Browser

To run the tests in a headless Chrome browser using `vitest` and `webdriverio`, execute the following command:

```bash
bun run test:browser
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
