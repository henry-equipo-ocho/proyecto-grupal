import { SET_USER_NAME } from './actions_types'

export function setUserName(payload){
    return {
        type: SET_USER_NAME,
        payload,
    }
}