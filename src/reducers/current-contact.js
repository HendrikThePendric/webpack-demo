import { SET_CURRENT_CONTACT, CLEAR_CURRENT_CONTACT } from '../constants';
export default function (state = null, {type, payload}) {
    switch (type) {
        case SET_CURRENT_CONTACT:
            return payload;
        case CLEAR_CURRENT_CONTACT:
            return null;
        default:
            return state;
    }
}