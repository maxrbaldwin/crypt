const NodeCache = require( "node-cache" );
const { log } = require('@logging');

const fifteenMinutes = 900; //seconds
const fiveMinutes = 600; //seconds
const cacheOptions = {
  stdTTL: fifteenMinutes,
  checkPeriod: fiveMinutes,
};

class AddRecipeCache {
  constructor() {
    this.cache = new NodeCache(cacheOptions);
  }
  setInCache(key, value) {
    if (!key || !value) return false;
    const cachedEntry = this.cache.set(key, value);
    if (cachedEntry) {
      log('cache:set', key);
    }
    return cachedEntry;
  }
  getFromCache(key) {
    if (!key) return undefined;
    const cachedEntry = this.cache.get(key);
    if (cachedEntry) {
      log('cache:hit', key);
    } 
    return cachedEntry;
  }
}

module.exports = AddRecipeCache;