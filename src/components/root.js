import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import configureStore from '../store';
import App from './app/app';

const store = configureStore();

export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <App />
                </MuiThemeProvider>
            </Provider>
        );
    }
}