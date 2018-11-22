# REY Explorer

Front-end to easily browse Reputation Network actors and transactions.

Available live at [explorer.reputation.network](http://explorer.reputation.network)

## Usage

You can run the explorer through different methods. By default, it'll listen at localhost:8083.

### Using rey-cli

You can run REY explorer locally by using [`rey-cli`](http://github.com/reputation-network/rey-cli), so that cloning this repository is not needed. Simply run:

    rey-cli dev explorer

### Docker

You can build and run a docker image:

    docker build . -t rey-explorer
    docker run -it -p 8083:8083 rey-explorer

You can also run the pre-built docker image that `rey-cli` uses:

    docker run -it -p 8083:8083 reputationnetwork/explorer

### Cloning the repository

You can build and run the node project locally:

    git clone git@github.com:reputation-network/rey-explorer.git && cd rey-explorer
    yarn install
    yarn start

### Development

You can enable _nodemon_ so that the server restarts on changes.

    yarn install --dev
    yarn devstart

## Environment variables

* `PORT`: Port that the server will listen to. Default: 8083.
* `BLOCKCHAIN_NODE_URL`: URL of the blockchain node's RPC endpoint.
* `REY_CONTRACT_ADDRESS`: Address of REY's contract.
* `REGISTRY_CONTRACT_ADDRESS`: Address of registry's contract.

The addresses have sensible defaults for using rey-cli's development blockchain node.

## LICENSE
MIT © 2018 [Reputation Network](./LICENSE)
