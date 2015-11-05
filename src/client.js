import ReactDOM from 'react-dom';
import {createElementWithContext} from 'fluxible-addons-react';
import app from './app';

app.rehydrate(window.dehydrated, (err, context) => {
  if (err) {
    throw err;
  } else {
    ReactDOM.render(createElementWithContext(context), document.getElementById('root'));
  }
});
