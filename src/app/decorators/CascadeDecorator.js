import React, {PropTypes, Component} from 'react';
import invariant from 'fbjs/lib/invariant';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

export default styles => {
  return ComposedComponent => {
    class CascadeDecorator extends Component {
      static contextTypes = {
        setStyle: PropTypes.func.isRequired,
      };

      constructor(props) {
        super(props);
      }

      componentWillMount() {
        if (canUseDOM && !__DEV__) {
          invariant(styles.use, 'The style-loader must be configured with reference-counted API.');
          styles.use();
        } else {
          invariant(this.context.setStyle, 'The context must be configured with setStyle function.');
          this.context.setStyle(styles);
        }
      }

      componentWillUnmount() {
        if (canUseDOM && !__DEV__) {
          styles.unuse();
        }
      }

      render() {
        return <ComposedComponent {...this.props} />;
      }
    }

    return CascadeDecorator;
  };
};
