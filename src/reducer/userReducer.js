import { SIGNIN_ACTION_REQUEST, SIGNIN_ACTION_SUCCESS, SIGNIN_ACTION_FAIL, SIGNOUT_ACTION_REQUEST } from "../constant/userConst";

export const userReducer = (state = {},action) => {
    switch(action.type){
        case SIGNIN_ACTION_REQUEST:
            return {loading : true}
        case SIGNIN_ACTION_SUCCESS:
            return {userInfo : action.payload, loading : false}
        case SIGNIN_ACTION_FAIL:
            return {error: action.payload, loading: false}
        case SIGNOUT_ACTION_REQUEST:
            return {}
        default:
            return state;
    }
}