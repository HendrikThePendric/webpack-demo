// Actual imports
import { createStore, compose } from 'redux';
import persistState from 'redux-localstorage'
import getInitialState from './initial-state.js';
import rootReducer from '../reducers';

// Passthroughs
export { getVisibleContacts, getContactsCount, getNextSequenceId } from './queries';

export default function configureStore() {
  // Keep contact list and sort property in the localStorage
  const enhancer = compose(persistState(['contacts', 'sortProp']));
  const store    = createStore(rootReducer, getInitialState(), enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}