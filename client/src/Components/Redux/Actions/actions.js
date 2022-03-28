import axios from 'axios'
import {
    SET_ALL_ACTIVITIES,
    SET_USER_NAME,
    GET_ACTIVITIES
} from './actions_types'

const server = "http://localhost:3001";
//import { SET_USER_NAME } from './actions_types';

export function setUserName(payload) {
    return {
        type: SET_USER_NAME,
        payload,
    };
};

export function getActivities() {
    return async function (dispatch) {
        const activity = await axios.post('http://localhost:3001/activities')
        dispatch({
            type: GET_ACTIVITIES,
            payload: activity.data.data
        });
    };
};

export function setAllActivities(value) {
    return async function (dispatch) {
        let res = await axios.get(`http://localhost:3001/activities/match/${value}`)
        console.log(res.data.data)
        return dispatch({
            type: SET_ALL_ACTIVITIES,
            payload: res.data.data,
        });
    };
};
