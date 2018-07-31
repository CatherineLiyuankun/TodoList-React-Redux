import './todomvc/index.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './todomvc/store/configureStore';
import Root from './todomvc/containers/Root';

const store = configureStore();

render(
  <AppContainer>
    <Root
      store={ store }
    />
  </AppContainer>,
  document.getElementById('todo')
);

if (module.hot) {
  module.hot.accept('./todomvc/containers/Root', () => {
    const RootContainer = require('./todomvc/containers/Root').default;
    render(
      <AppContainer>
        <RootContainer
          store={ store }
        />
      </AppContainer>,
      document.getElementById('todo')
    );
  });
}
