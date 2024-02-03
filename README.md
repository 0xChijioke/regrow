# ReGrow 🏗 Scaffold-ETH 2 & Allo protocol

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Scaffold-eth-2 Documentation</a> |
  <a href="https://docs.allo.gitcoin.co">Allo Documentation</a> |
  <a href="https://regrow.vercel.app">Demo</a>
</h4>

Regrow is a decentralized application built on top of the Allo Protocol. It enables users to create and manage pools and profiles with an intuitive user interface.



Features

    Create Profiles: Initiate the creation of profiles with personalized information and metadata.

    Manage Profiles: Update profile name, members, metadata, create pool etc.

    Create Pools: Easily create new pools with custom strategies, tokens, and managers.



## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/0xChijioke/ReGrow.git
cd ReGrow
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.


## Contributing to ReGrow

We welcome contributions to Regrow!

Please see [CONTRIBUTING.MD](https://github.com/0xChijioke/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to ReGrow.
