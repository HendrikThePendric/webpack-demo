import { TOGGLE_FORM_STATE } from '../constants';
export default function (state = false, {type}) {
    switch (type) {
        case TOGGLE_FORM_STATE:
            return !state;
        default:
            return state;
    }
}