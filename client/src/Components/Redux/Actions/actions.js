import { 
    SET_USER_NAME,
    SET_ALL_ACTIVITIES,
    GET_ACTIVITIES,
} from './actions_types';
import axios from 'axios';

export function setUserName(payload){
    return {
        type: SET_USER_NAME,
        payload,
    };
};

export function getActivities() {
    return async function (dispatch) {
        let json = await axios.post('http://localhost:3001/activities');
        return dispatch({
            type: GET_ACTIVITIES,
            payload: json.data,
        });
    };
};

export const setAllActivities = (value) => {
    return async function (dispatch){
        let res = await axios.get(`http://localhost:3001/activities/match/${value}`)
        return dispatch({
            type: SET_ALL_ACTIVITIES,
            payload: res.data,
        })
        
    } 
}