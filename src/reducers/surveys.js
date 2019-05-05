import { 
    FETCH_SURVEY_DATA_SUCCESS,
    FETCH_SURVEY_DATA_FAIL
} from '../actions/types';

export default function(state = [], action) {
    // //console.log(action);
    switch(action.type) {
        case FETCH_SURVEY_DATA_SUCCESS:
            return action.payload;
        case FETCH_SURVEY_DATA_FAIL:
            return action.payload;
        default:
            return state;
    }
}