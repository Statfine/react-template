/**
 *
 * Asynchronously loads the component for HostPage
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
