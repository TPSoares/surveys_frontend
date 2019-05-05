import { 
    FETCH_SURVEY_DATA_SUCCESS,
    FETCH_SURVEY_DATA_FAIL
} from './types';

import axios from 'axios';

export const getAllSurveys = () => async dispatch => {
    // const request = "http://localhost/signoweb_backend/surveys";
    const request = "http://api-surveys.tpsoares.com/surveys";

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

export const sendVote = (vote) => async dispatch => {
    // const request = `http://localhost/signoweb_backend/survey_options/${vote}`;
    const request = `http://api-surveys.tpsoares.com/survey_options/${vote}`;

    console.log(vote);
    try {
        const response = await axios.post(request);
        console.log("RESPONSE", response);
        dispatch({
            type: FETCH_SURVEY_DATA_SUCCESS,
            payload: response.data.data
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

export const edit = (id, values) => async dispatch => {
    // const request = `http://localhost/signoweb_backend/surveys/edit/${id}`;
    const request = `http://api-surveys.tpsoares.com/surveys/edit/${id}`;

    try {
        const response = await axios.post(request, {
            title: values.title,
            description: values.description,
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log("RESPONSE", response);
        dispatch({
            type: FETCH_SURVEY_DATA_SUCCESS,
            payload: response.data.data
        })

    } catch (err) {
        if (err.response) {
            console.log(err.response);
            dispatch({
                type: FETCH_SURVEY_DATA_FAIL,
                payload: err.response.data
            })
        } else if (err.request) {
            console.log("ERR: ",err)
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}

export const deleteSurvey = (id) => async dispatch => {
    // const request = `http://localhost/signoweb_backend/surveys/${id}`;
    const request = `http://api-surveys.tpsoares.com/surveys/${id}`;

    // console.log("ID", id);

    try {
        const response = await axios.post(request);
        console.log("RESPONSE", response);
        dispatch({
            type: FETCH_SURVEY_DATA_SUCCESS,
            payload: response.data.data
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

export const createSurvey = (values) => async dispatch => {
    console.log("VALUES: ", values);
    // const request = "http://localhost/signoweb_backend/surveys/new";
    const request = "http://api-surveys.tpsoares.com/surveys/new";


    try {
        const response = await axios.post(request, {
            title: values.title,
            description: values.description,
            start_date: values.start_date,
            end_date: values.end_date,
            survey_options: values.survey_options
        }, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log("RESPONSE", response);
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
            console.log("ERR: ",err)
            console.log(err.request);
        } else {
            console.log(err);
        }
    }
}