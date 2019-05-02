import { combineReducers } from "redux";
import surveysReducer from './surveys';

const Reducers = combineReducers({
    surveys: surveysReducer,
});

export default Reducers;