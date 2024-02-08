# 🏗 Scaffold-ETH 2 & Allo protocol

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Scaffold-eth-2 Documentation</a> |
  <a href="https://docs.allo.gitcoin.co">Allo Documentation</a> |
  <a href="https://regrow.vercel.app">Demo</a>
</h4>

Regrow is a decentralized application built on top of the Allo Protocol. It enables users to create and manage profiles.



Features
1. Profile Creation and Management

  -  [Create Profiles](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/registry/CreateProfile.tsx): - Initiate the creation of profiles with personalized information and metadata.

  -  [Update name](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/registry/manage/UpdateName.tsx): - Initiate the creation of profiles with personalized information and metadata. Modify the name associated with a profile.

  -  [Update members](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/registry/manage/ManageMembers.tsx): Manage members associated with a profile.

  -  [Transfer ownership](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/registry/manage/TransferOwnership.tsx): Facilitate the transfer of ownership of a profile.

  -  [Accept Ownership](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/registry/manage/AcceptOwnership.tsx): Accept ownership transfer requests for profiles.

  -  [View Profiles](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/registry/ProfilesList.tsx): Retrieve information about existing profiles.




## Current Focus: Creating Pools with Custom Strategies


Currently focusing on implementing the ability to [create pools](https://github.com/0xChijoke/ReGrow/blob/main/packages/nextjs/components/allo/create/CreatePoolContainer.tsx) with custom strategies using the Microgrants strategy provided by the Allo-sdk. This feature is still a work in progress to define custom strategies for managing and distributing funds within pools.

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


## Contribute!
