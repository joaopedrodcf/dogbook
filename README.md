# typescript-monorepo
A template of a monorepo to create a react application.

## Features

- [x] CSS in JS
- [x] React fast refresh
- [x] Precommit validation
- [x] Storybook for all the components
- [x] Storybook with HMR
- [x] Eslint and Prettier with recommended rules
- [x] Prettier running on json files only and eslint on js, ts, tsx
- [x] SSR
- [ ] Github actions to run the unit tests
- [ ] Tsconfig with recommend rules for react projects
- [ ] Graphql
- [ ] Peerdependencies in each package outside of root for shared dependencies
- [ ] Codeowners for folder validation if multiple teams work in the repo
- [ ] Jest + Testing library unit tests
- [ ] Yarn 2



## Folder structure
```
packages/                       // feel free to add more components in this folder
    app/                        // main app that will use all the components
        src/
            index.ts
            button.tsx
            styles.tsx
        package.json            // everytime you need a new devDependency add it here
        tsconfig.json           // every package from the monorepo that you import you need to add it to references
    storybook/                  // storybook that will run all the components
        stories/                // feel free to add more components in this folder
            header/
            button/
                index.tsx
                index.stories.tsx
        package.json            // everytime you need a new devDependency add it here
        tsconfig.json           // every package from the monorepo that you import you need to add it to references
    header/                     // a header component
    button/                     // a button component
package.json                    // everytime you need a new devDependency add it here
tsconfig.json                   // everytime you add a new package modify this file by adding the new package path
```
## How to make references work

Everytime you add a new package you must do the following

1. Add to root tsconfig.json the path of the new package
2. If this package is a dependency of anothe package you also need to add it to the parent tsconfig.json file

## React fast refresh

Followed the config of https://github.com/pmmmwh/react-refresh-webpack-plugin/tree/main/examples/typescript-without-babel


## Storybook

As developing a monorepo is fundamental to be able to start your components in isolation instead of the main app in this repo we included a way for you to start the storybook and change your components and see changes in real time!

## Garment

This project uses garment which is a task runner that speeds up development of teams working in a monorepo.

```
"garment-runner-package": {
            "tasks": {
                "generate-schema": {
                    "runner": "typescript-json-schema",
                    "input": "{{projectDir}}/src/**/index.ts",
                    "output": ["{{projectDir}}/dist", "{{projectDir}}/src"],
                    "options": {
                        "pattern": "*Options"
                    }
                },
                "build": {
                    "ref": "typescript-package:build",
                    "next": ":generate-schema"
                }
            }
        },
```


## Important commands of the repo

Run all the commands from the root folder
The monorepo is built in a way where you dont need to change from the root to run any command

### Install dependencies
```
yarn
```
### Start main app
```
yarn start
```

### Lint all the project
```
yarn lint
```

### Start storybook
```
yarn storybook
```

### Garment task runner


## Biography

Monorepo configs
https://github.com/wixplosives/sample-monorepo

Monorepo configs
https://baltuta.eu/posts/typescript-lerna-monorepo-the-setup

Storybook and lerna setup
https://medium.com/loftbr/creating-a-design-system-with-monorepo-bc18e055fb3c

SSR with next and apollo client
https://dev.to/givehug/next-js-apollo-client-and-server-on-a-single-express-app-55l6
https://github.com/givehug/devto-monorepo

https://www.digitalocean.com/community/tutorials/react-react-router-ssr

https://medium.com/the-andela-way/how-to-set-up-an-express-api-using-webpack-and-typescript-69d18c8c4f52

SSR react router
https://www.digitalocean.com/community/tutorials/react-react-router-ssr

