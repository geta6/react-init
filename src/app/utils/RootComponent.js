import React, {Component, PropTypes} from 'react';

class RootComponent extends Component {
  static propTypes = {
    state: PropTypes.string.isRequired,
    styles: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    context: PropTypes.object.isRequired,
  };

  static defaultProps = {
    title: '',
    description: '',
  };

  render() {
    return (
      <html className='no-js' lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,user-scalable=0,initial-scale=1.0' />
        <link href='//fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' />
        <style dangerouslySetInnerHTML={{__html: this.props.styles}} />
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{__html: this.props.markup}} />
        <script dangerouslySetInnerHTML={{__html: this.props.state}} />
        <script src='/client.js' defer />
      </body>
      </html>
    );
  }
}

export default RootComponent;
