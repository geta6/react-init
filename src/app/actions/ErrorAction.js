import get from 'lodash/object/get';
import keyMirror from 'fbjs/lib/keyMirror';

const ErrorAction = (actionContext, payload) => {
  switch (get(payload, ['type'])) {

  case ErrorAction.ActionTypes.ClearError:
    return new Promise(resolve => {
      actionContext.dispatch(ErrorAction.DispatchTypes.CLEAR_ERROR);
      resolve();
    });

  case ErrorAction.ActionTypes.GenericError:
    return new Promise(resolve => {
      const error = get(payload, ['error']);
      actionContext.dispatch(ErrorAction.DispatchTypes.SET_ERROR, {error});
      resolve();
    });

  default:
    return Promise.reject(new Error(`ActionType ${get(payload, ['type'])} not defined.`));
  }
};

ErrorAction.displayName = 'ErrorAction';

ErrorAction.ActionTypes = keyMirror({
  SetError: null,
  ClearError: null,
});

ErrorAction.DispatchTypes = keyMirror({
  SET_ERROR: null,
  CLEAR_ERROR: null,
});

export default ErrorAction;
