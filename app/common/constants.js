/**
 * 公用常量
 *
 * API_BASE: 域名地址
 * 
 * PRODUCTION_ENV   生产环境
 * DEVELOPMENT_ENV  开发环境
 * CURRENT_ENV      当前环境
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

export const QA_ENV = ['easubdev', 'easub', 'qa'];
export const CURRENT_ENV = process.env.NODE_ENV;
export const CURRENT_QA = process.env.QA_ENV;
