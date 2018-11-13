/**
 * 公用常量
 *
 * API_BASE: 域名地址
 *
 */

const { location } = window;

// ie兼容
let apiHost =
  location.origin
    ? `${location.protocol}//${location.host}`
    : location.origin;
apiHost = apiHost.indexOf('localhost') !== -1 ? 'http://livebeta.clip.cn' : apiHost;
// apiHost = 'http://livebeta.clip.cn';

export const API_BASE = `${apiHost}/api/v2`;
