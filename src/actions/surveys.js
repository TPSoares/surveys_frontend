import { 
    FETCH_SURVEY_DATA_SUCCESS,
    FETCH_SURVEY_DATA_FAIL
} from './types';

import axios from 'axios';

export const getAllSurveys = () => async dispatch => {
    const request = "http://localhost/signoweb_backend/surveys";

    try {
        const response = await axios.get(request);

        dispatch({
            type: FETCH_SURVEY_DATA_SUCCESS,
            payload: response.data
        })

    } catch (err) {
        if (err.response) {
            console.log(err.response);
            dispatch({
                type: FETCH_SURVEY_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}