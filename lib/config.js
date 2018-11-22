require('dotenv').config();

const config = {
  blockchainNodeUrl: process.env.BLOCKCHAIN_NODE_URL || "http://localhost:8545",
  reyContractAddress: process.env.REY_CONTRACT_ADDRESS || "0x76C19376b275A5d77858c6F6d5322311eEb92cf5",
  registryContractAddress: process.env.REGISTRY_CONTRACT_ADDRESS || "0x556ED3bEaF6b3dDCb1562d3F30f79bF86fFC05B9",
};

export default config;
