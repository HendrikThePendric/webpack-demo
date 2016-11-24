import { SHOW_CONTACT_FORM, HIDE_CONTACT_FORM } from '../constants';
export default function (state = false, {type}) {
    switch (type) {
        case SHOW_CONTACT_FORM:
            return true;
        case HIDE_CONTACT_FORM:
            return false;
        default:
            return state;
    }
}