import 'babel-core/polyfill';
import defaults from 'lodash/object/defaults';

const DEBUG = !process.argv.includes('--release');

defaults(process.env, {
  NODE_ENV: DEBUG ? 'development' : 'production',
  HOST: '0.0.0.0',
  PORT: 3000,
  BACKLOG: 511,
  TIMEOUT: 6000,
});

export default {
  googleAnalyticsId: 'UA-XXXXX-X',
};
