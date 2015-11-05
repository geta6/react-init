/* global jest, expect */

jest.dontMock('../App');
jest.dontMock('../../stores/ErrorStore');
jest.dontMock('../../decorators/ContextDecorator');
jest.dontMock('../../decorators/CascadeDecorator');

const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');
const {createMockComponentContext} = require('fluxible/utils');

const App = require('../App');
const ErrorStore = require('../../stores/ErrorStore');

class MockErrorStore extends ErrorStore {}

describe('App', () => {
  it('should set state', () => {
    const context = createMockComponentContext({stores: [MockErrorStore]});
    ReactTestUtils.renderIntoDocument(<App context={context} />);
    return true;
  });
});
