import Fluxible from 'fluxible';
import AppComponent from './components/App';
import RouteStore from './stores/RouteStore';
import ErrorStore from './stores/ErrorStore';

export default new Fluxible({
  component: AppComponent,
  stores: [
    RouteStore,
    ErrorStore,
  ],
});
