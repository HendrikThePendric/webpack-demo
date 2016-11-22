import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'
import ContactsReducer from './contacts';
import SortPropReducer from './sort-prop';
import FormStateReducer from './form-state';

const rootReducer = combineReducers({
    contacts:  ContactsReducer,
    sortProp:  SortPropReducer,
    showForm:  FormStateReducer,
    form:      reduxFormReducer
});

export default rootReducer;