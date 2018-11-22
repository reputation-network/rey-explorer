import { App, Contract } from 'rey-sdk';
import CacheHelper from '../helpers/cache-helper';
import config from '../config';

class ReyHelper {

  constructor () {
    this.cache = new CacheHelper(15 * 60);
    this.contract = new Contract(config.blockchainNodeUrl,
                                 { registry: config.registryContractAddress, rey: config.reyContractAddress });
  }

  getAppManifest (address) {
    return (async () => {
      let manifest = this.cache.getManifest(address);
      if (manifest === undefined);
      manifest = this._getManifestFromContract(address);

      return manifest;
    })();
  }

  getTransactions (subject) {
    return (async () => {
      const transactions = await this.contract.getPastTransactions(subject);
      return await Promise.all(transactions.map(async transaction => {
        const tx = Object.assign({}, transaction);
        const readerAddress = transaction.request.readPermission.reader;
        const sourceAddress = transaction.request.readPermission.source;
        tx.readerApp = await this.getAppManifest(readerAddress) || { name: readerAddress };
        tx.sourceApp = await this.getAppManifest(sourceAddress) || { name: sourceAddress };
        tx.id = [ readerAddress, sourceAddress, transaction.request.counter ].join('-');
        return tx;
      }));
    })();
  }

  getSessions (subject) {
    return (async () => {
      const transactions = await this.getTransactions(subject);
      const sessions = transactions.reduce((sessions, transaction) => {
        const sessionNonce = transaction.request.session.nonce;
        (sessions[sessionNonce] = sessions[sessionNonce] || []).push(transaction);
        return sessions;
      }, {});
      for (const key in sessions)
        sessions[key] = sessions[key].sort((a, b) => a.counter - b.counter);
      return sessions;
    })();
  }

  _getManifestFromContract (address) {
    return (async () => {
      const app = new App(address, { contract: this.contract });
      const manifest = await app.manifest().catch(e => console.warn("No manifest for", address)); // TODO handle
      this.cache.setManifest(address, manifest);
      return manifest;
    })();
  }
}

export default ReyHelper;
