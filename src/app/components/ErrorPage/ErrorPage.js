import React, {PropTypes, Component} from 'react';
import {provideContext, connectToStores} from 'fluxible-addons-react';
import cascadeDecorator from '../../decorators/CascadeDecorator';
import style from './ErrorPage.styl'; // eslint-disable-line import/default

@cascadeDecorator(style)
class ErrorPage extends Component {
  static propTypes = {
    children: PropTypes.element,
    error: PropTypes.object,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div id='ErrorPage'>
        <div>エラーだぞー</div>
      </div>
    );
  }
}

export default provideContext(connectToStores(ErrorPage, ['ErrorStore'], context => {
  return {
    currentError: context.getStore('ErrorStore').getCurrentError(),
  };
}));
