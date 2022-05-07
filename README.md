# Guestbook app

This project is part of the [Builder Space](https://buildspace.so/) web3 development path. Just for learning purposes, only works on Rinkeby network.

## Stack
**Front**: React + Next.js   
**Web3**: Hardhat + AlchemyAPI + Solidity

## Demo

The demo is available [here](https://guestbook.santek.dev/).

## Requirements

You need to provide an HTTP endpoint to [AlchemyAPI](https://alchemy.com/?r=DI5MzQ2Nzg2NzA2O) or other web3 platform, and a private Ethereum key to interact with the smart contract.

```bash
1. Create a .env file in the root directory of the project with the following variables:
export NODE_API_URL=<YOUR_ALCHEMY_API_ENDPOINT>
export RINKEBY_PRIVATE_KEY=<YOUR_PRIVATE_ETHEREUM_KEY>
2. $ source .env
```
## How to run locally

```bash
$ yarn
$ yarn dev
```
