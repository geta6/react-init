import React, {PropTypes, Component} from 'react';
import {provideContext, connectToStores} from 'fluxible-addons-react';
import cascadeDecorator from '../../decorators/CascadeDecorator';
import style from './IndexPage.styl'; // eslint-disable-line import/default

@cascadeDecorator(style)
class IndexPage extends Component {
  static propTypes = {
    children: PropTypes.element,
    error: PropTypes.object,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div id='IndexPage'>
        <div>ほげほげふがふがほおgへおえおげ</div>
      </div>
    );
  }
}

export default provideContext(connectToStores(IndexPage, ['ErrorStore'], context => {
  return {
    currentError: context.getStore('ErrorStore').getCurrentError(),
  };
}));
