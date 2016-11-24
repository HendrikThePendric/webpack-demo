// Actual imports
import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage'
import getInitialState from './initial-state.js';
import rootReducer from '../reducers';

// Passthroughs
export { getVisibleContacts, getContactsCount, getNextSequenceId } from './queries';

export default function configureStore() {
    // Add logger in dev only ad when you want it switched on
    const middlewares = [];
    // Switch logger on and off
    const shouldLog = false;
    if (process.env.NODE_ENV === 'development' && shouldLog) {
        const createLogger = require(`redux-logger`);
        const logger = createLogger();
        middlewares.push(logger);
    }
    // Keep contact list and sort property in the localStorage
    const enhancer = compose(
        persistState(['contacts', 'sortProp']),
        applyMiddleware(...middlewares)
    );
    const store = createStore(rootReducer, getInitialState(), enhancer);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}