import React, {PropTypes, Component} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connectToStores} from 'fluxible-addons-react';
import contextDecorator from '../../decorators/ContextDecorator';
import cascadeDecorator from '../../decorators/CascadeDecorator';
import ErrorPageComponent from '../ErrorPage';
import style from './App.styl'; // eslint-disable-line import/default

@contextDecorator()
@cascadeDecorator(style)
class Application extends Component {
  static propTypes = {
    context: PropTypes.object.isRequired,
    currentRoute: ImmutablePropTypes.map,
    currentError: ImmutablePropTypes.map,
  };

  static contextTypes = {
    executeAction: PropTypes.func.isRequired,
  };

  getRouteHandler() {
    let RouteHandler;
    if (this.props.currentRoute && this.props.currentError.get('statusCode') === 200) {
      RouteHandler = this.props.currentRoute.get('handler');
    } else {
      RouteHandler = ErrorPageComponent;
    }
    return <RouteHandler context={this.props.context} />;
  }

  render() {
    return (
      <div id='Application'>
        {this.getRouteHandler()}
      </div>
    );
  }
}

export default connectToStores(Application, ['ErrorStore', 'RouteStore'], context => {
  return {
    currentRoute: context.getStore('RouteStore').getCurrentRoute(),
    currentError: context.getStore('ErrorStore').getCurrentError(),
  };
});
