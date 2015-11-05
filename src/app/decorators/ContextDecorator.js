import React, {PropTypes, Component} from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';

export default () => {
  return ComposedComponent => class ContextDecorator extends Component {
    static childContextTypes = {
      setStyle: PropTypes.func.isRequired,
      getStore: PropTypes.func.isRequired,
      executeAction: PropTypes.func.isRequired,
    };

    getChildContext() {
      const context = this.props.context;
      return {
        setStyle: context.setStyle || emptyFunction,
        getStore: context.getStore || emptyFunction,
        executeAction: context.executeAction || emptyFunction,
      };
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
};
