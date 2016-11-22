import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './global-styles/main.scss';
import Root from './components/root';
injectTapEventPlugin();

const rootEl = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./components/root', () => {
    const NextRoot = require('./components/root').default;
    ReactDOM.render(
      <AppContainer>
         <NextRoot />
      </AppContainer>,
      rootEl
    );
  });
}