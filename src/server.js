import './config/env';
import path from 'path';
import express from 'express';
import serialize from 'serialize-javascript';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {navigateAction} from 'fluxible-router';
import {createElementWithContext} from 'fluxible-addons-react';
import ErrorAction from './app/actions/ErrorAction';

import RootComponent from './app/utils/RootComponent';
import getCustomContext from './app/utils/getCustomContext';
import app from './app';

const Server = express();

Server.use(express.static(path.join(__dirname, 'public')));

Server.get('*', async (req, res, next) => {
  try {
    const styles = [];
    const context = getCustomContext({app, setStyle: style => styles.push(style)});

    try {
      await context.executeAction(navigateAction, {url: req.path});
    } catch (error) {
      const statusCode = error.statusCode || 500;
      await context.executeAction(ErrorAction, {
        type: ErrorAction.ActionTypes.SET_ERROR,
        error: {statusCode, message: error.message},
      });
    } finally {
      res.status(context.getStore('ErrorStore').getCurrentError('statusCode'));
    }

    const state = `window.dehydrated=${serialize(app.dehydrate(context))};`;
    const markup = ReactDOM.renderToString(createElementWithContext(context));
    res.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(React.createElement(RootComponent, {
      state: state,
      markup: markup,
      styles: styles.join(''),
      context: context.getComponentContext(),
    })));
  } catch (err) {
    next(err);
  }
});

const server = Server.listen(process.env.PORT, process.env.HOST, ~~process.env.BACKLOG, () => {
  server.timeout = ~~process.env.TIMEOUT;
  const {address, port} = server.address();
  process.stdout.write(`The server is running at http://${address}:${port}\n`);
  return typeof process.send === 'function' && process.send('online');
});

process.on('message', msg => msg === 'shutdown' && process.exit(0));

export default server;
