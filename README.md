# React + TypeScript + Vite@6 template

> This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

- [中文版](./docs/README.zh-TW.md)

## Requirements

* NodeJS v20+
* pnpm v9+

## Overview

> Built with type safety, scalability, and developer experience in mind. A batteries included Vite + React template.

* [⚡️](https://vitejs.dev/)**[Vite 5](https://github.com/vitejs/vite)** : for project building and running the dev server

  * **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)** uses [SWC](https://swc.rs/) for Fast Refresh
* **[⚛️ ](https://reactjs.org/)[React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)**
* 🏄 **[React-router v7.5+](https://reactrouter.com/docs/en/v6/getting-started/overview)** : Declarative routing for React apps at any scale.
* **[shadcn/ui](https://ui.shadcn.com)** : for React UI Components
* **[Tailwind CSS](https://tailwindcss.com/)**：for styling
* **ESLint v9.5.0+**: for linting and formatting

  * **[@antfu/eslint-config](https://github.com/antfu/eslint-config/tree/main)**: This project uses `@antfu/eslint-config` as its base ESLint configuration to maintain code quality and consistency.
    * Auto fix for formatting (aimed to be used standalone without Prettier)
    * Powered by [eslint-plugin-command](https://github.com/antfu/eslint-plugin-command). It is not a typical rule for linting, but an on-demand micro-codemod tool that triggers by specific comments.
    * Style principle: Minimal for reading, stable for diff, consistent
      * Sorted imports, dangling commas
      * Using ESLint Stylistic
  * **[vite-plugin-eslint](https://www.npmjs.com/package/vite-plugin-eslint)** : Integrates ESLint into the Vite build process for on-the-fly linting.
* Vitest : for unit test

  * React Testing Library - A very light-weight, best practice first, solution for testing React components
  * MSW（Mock Service Worker） - Mocking API tools

## Getting Started

1. Getting started is a simple as cloning the repository
   ```
   git clone git@github.com:keon981/vite-tsx-app.git

   ```
2. Changing into the new directory
   ```
   cd vite-tsx-app
   ```
3. Installing dependencies
   ```
   pnpm install
   ```
4. Removing the .git folder (and any additional files, folders or dependencies you may not need)
   ```
   rm -rf .git
   ```

Congrats! You're ready to starting working on that new project!

> If you'd rather run the commands above in one go, check out the command below：
>
> ```
> git clone git@github.com:keon981/vite-tsx-app.git &&\
> cd vite-tsx-app &&\
> pnpm install &&\
> rm -rf .git
> ```

## Testing

Unit testing is handled by React Testing Library and Vitest while End-to-End (E2E) Testing is conducted by Playwright.

If you'd like to run all tests, Unit and E2E alike, execute the following command:

```
pnpm run test
```

### Unit Testing

When running unit test scripts, it is assumed that unit tests will be colocated with the source files. Take a look at the placeholder README file in `src/components` for [an example](src/components/README.md).

If you'd like to execute unit tests specifically, the below command will execute vitest:

```
pnpm run test:unit
```

If instead you are interested in coverage reporting, run:

```
pnpm run coverage
```


## License

No License. You can use this starter as you wish.
