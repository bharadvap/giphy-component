/**
 *
 * Asynchronously loads the component for WrapperCenter
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
