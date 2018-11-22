import NodeCache from 'node-cache';

class CacheHelper {

  constructor (ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2 });
  }

  getManifest (address) {
    return this.cache.get('manifest_' + address);
  }

  setManifest (address, manifest) {
    this.cache.set('manifest_' + address, manifest);
  }
}

export default CacheHelper;
