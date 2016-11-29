import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'
import ContactsReducer from './contacts';
import SortPropReducer from './sort-prop';
import FilterValueReducer from './filter';
import FavoritesOnlyReducer from './favorites-only';
import FormStateReducer from './form-state';
import CurrentContactReducer from './current-contact';

const rootReducer = combineReducers({
    contacts:      ContactsReducer,
    sortProp:      SortPropReducer,
    filterVal:     FilterValueReducer,
    favoritesOnly: FavoritesOnlyReducer,
    showForm:      FormStateReducer,
    currContact:   CurrentContactReducer,
    form:          reduxFormReducer
});

export default rootReducer;