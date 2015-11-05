import React, {PropTypes, Component} from 'react';

class IconComponent extends Component {
  static propTypes = {
    glyph: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={`IconComponent IconComponent-${this.props.glyph}`} />
    );
  }
}

export default IconComponent;
