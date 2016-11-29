import { TOGGLE_FAVORITES_ONLY } from '../constants';
export default function (state = false, {type}) {
    switch (type) {
        case TOGGLE_FAVORITES_ONLY:
            return !state;
        default:
            return state;
    }
}