# @x12i/analytix-tiers usage example

Dependency-tier compilation and execution with optional materialization of intermediate analytic outputs.

This consuming application demonstrates **compile dependency levels and reuse materialized local outputs** using the published npm package, pinned to `1.0.1`.

## Run

Requires Node.js 24 or newer and npm. The example needs no service credentials.

```sh
npm install --ignore-scripts
npm start
```

## Example

[`src/index.mjs`](src/index.mjs) contains the complete example. Assertions check the demonstrated behavior and the program prints a small result.

## When to use the package

- Compile dependent analytics into execution order.
- Reuse intermediate results while executing a tier.

## Links

- [npm package](https://www.npmjs.com/package/@x12i/analytix-tiers)
- [Implementation monorepo](https://github.com/x12i/analytix)
- [Reviewed package source](https://github.com/x12i/analytix/tree/cf2ed708652df6f853af877340acc385d17c76f2/packages/analytix-tiers)

The `package.json` in this repository is private to prevent accidental publication of the example application under an npm package name.

## Validation scope

The definitions, outputs, callers, and source data are authored fixtures. Storage is in memory, and model assignment/resolution never invokes a provider. The function example executes only the source written in this repository; the package's Node VM mode is not a security boundary for untrusted code. The service authentication example inspects the demo/default hook and does not constitute a production authentication setup.
