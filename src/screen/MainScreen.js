import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../action/userAction';

function MainScreen(props){

    const userInfo = useSelector(state => state.signin);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!userInfo.userInfo){
            props.history.push("/")
        }
    })

    const handleSignout = () =>{
        dispatch(signout());
    }

    return(
        userInfo.userInfo?
        <div>
            <h4>{userInfo.userInfo.name}</h4>
            <h4>{userInfo.userInfo.email}</h4>
            <button className="button primary" onClick={handleSignout}>SignOut</button>
        </div>
        : null
    )
}

export default MainScreen;