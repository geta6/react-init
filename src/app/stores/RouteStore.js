import {RouteStore} from 'fluxible-router';
import IndexPageComponent from '../components/IndexPage';

const debug = require('debug')('app:store:route');

export default RouteStore.withStaticRoutes({
  index: {
    path: '/',
    method: 'get',
    handler: IndexPageComponent,
    action: async (context, payload, done) => {
      debug('route index');
      done();
    },
  },
});
