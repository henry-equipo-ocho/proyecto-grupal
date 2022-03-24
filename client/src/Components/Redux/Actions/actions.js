import { SET_USER_NAME } from './actions_types';
import axios from 'axios';

export function setUserName(payload){
    return {
        type: SET_USER_NAME,
        payload,
    };
};

export function getActivities() {
    return async function (dispatch) {
        var json = await axios.post('http://localhost:3001/activities');
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data,
        });
    };
};