import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Application from './containers/app/app';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const renderApplication = () => {
    ReactDOM.render(
            <Provider store={store}>
                <Application/>
            </Provider>, document.getElementById('rootDiv'));
};

renderApplication();

Object.defineProperty(window, 'store', {
    value: store,
    writable: true
});
