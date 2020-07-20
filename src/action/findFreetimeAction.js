import Axios from "axios";
import { FREETIME_REQUEST, FREETIME_SUCCESS, FREETIME_FAIL } from "../constant/freetimeConst";

export const getFreeTime = (date,friendId,yourId) => async (dispatch) => {
    dispatch({
        type: FREETIME_REQUEST,
        payload: {loading: true}
    });
        
    try {
        const {data} = await Axios.post("/api/users/findfreetime",{date,friendId,yourId})
     //   console.log(data);
        dispatch({
            type: FREETIME_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type: FREETIME_FAIL,
            payload : error
        })
    }
}