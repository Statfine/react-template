/**
 *
 * Asynchronously loads the component for AntDashboard
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
