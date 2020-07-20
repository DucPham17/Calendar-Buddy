import { SIGNIN_ACTION_REQUEST, SIGNIN_ACTION_SUCCESS, SIGNIN_ACTION_FAIL, SIGNUP_ACTION_REQUEST, SIGNUP_ACTION_SUCCESS, SIGNUP_ACTION_FAIL, SIGNOUT_ACTION_REQUEST } from "../constant/userConst";
import Axios from "axios";
import Cookie from "js-cookie";

export const signin = (email, password) => async (dispatch) => {
    dispatch({
        type: SIGNIN_ACTION_REQUEST,
        payload: {loading: true}
    });
        
    try {
        // console.log(email, password);
        const {data} = await Axios.post("/api/users/signin",{email,password})
        
        dispatch({
            type: SIGNIN_ACTION_SUCCESS,
            payload : data
        })
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: SIGNIN_ACTION_FAIL,
            payload : error
        })
    }
}

export const signout = () => (dispatch) => {
    dispatch({
        type : SIGNOUT_ACTION_REQUEST,
        payload : {}
    })
    Cookie.set('userInfo', JSON.stringify(null))
}

export const signup = (name, email, password) => async (dispatch) => {
    dispatch({
        type: SIGNUP_ACTION_REQUEST,
        payload: {loading: true}
    });
        
    try {
        // console.log(name, email, password);
        const {data} = await Axios.post("/api/users/signup",{name, email,password})
        console.log(data)
        dispatch({
            type: SIGNUP_ACTION_SUCCESS,
            payload : data
        })
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: SIGNUP_ACTION_FAIL,
            payload : error
        })
    }
}