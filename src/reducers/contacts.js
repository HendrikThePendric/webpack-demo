import { ADD_CONTACT, UPDATE_CUSTOM_SORT } from '../constants';
export default function (state = [], {type, payload}) {
    switch (type) {
        case ADD_CONTACT:
            return [...state, payload];
        case UPDATE_CUSTOM_SORT:
            // Loop through list based on current order and update sequenceId descending
            return payload.map((c,i) => ({...c, sequenceId: payload.length - (i + 1)}));
        default:
            return state;
    }
}