import { FREETIME_REQUEST, FREETIME_SUCCESS, FREETIME_FAIL } from "../constant/freetimeConst";

export const findFreeTimeReducer = (state = {}, action) => {
    switch(action.type){
        case FREETIME_REQUEST:
            return {loading : true};
        case FREETIME_SUCCESS:
            return {loading : false, freetimeSlot: action.payload};
        case FREETIME_FAIL:
            return {loading : false, error: action.payload};
        default:
            return state;
    }
}