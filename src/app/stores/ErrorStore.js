import Immutable from 'immutable';
import {createStore} from 'fluxible/addons';

const debug = require('debug')('app:store:error');

export default createStore({
  storeName: 'ErrorStore',

  handlers: {
    SET_ERROR: 'setCurrentError',
    CLEAR_ERROR: 'clearCurrentError',
    NAVIGATE_SUCCESS: 'onNavigateSuccess',
    NAVIGATE_FAILURE: 'onNavigateFailure',
  },

  initialize() {
    debug('initialize');
    this.currentError = new Immutable.Map({statusCode: 200, message: null});
  },

  onNavigateSuccess() {
    this.clearCurrentError();
  },

  onNavigateFailure(error) {
    this.setCurrentError({error});
  },

  setCurrentError({error}) {
    const currentError = Immutable.fromJS(Object.assign({statusCode: 200, message: null}, error));
    if (!Immutable.is(this.currentError, currentError)) {
      debug('setCurrentError: %o', error);
      this.currentError = currentError;
      this.emitChange();
    }
  },

  clearCurrentError() {
    const currentError = new Immutable.Map({statusCode: 200, message: null});
    if (!Immutable.is(this.currentError, currentError)) {
      debug('clearCurrentError:');
      this.currentError = currentError;
      this.emitChange();
    }
  },

  getCurrentError(param) {
    return param ? this.currentError.getIn(Array.isArray(param) ? param : [param]) : this.currentError;
  },

  dehydrate() {
    return {
      error: this.currentError.toJS(),
    };
  },

  rehydrate(dehydrated) {
    this.setCurrentError(dehydrated);
  },
});
