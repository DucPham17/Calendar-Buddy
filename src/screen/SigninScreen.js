import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signin } from '../action/userAction';

function SigninScreen(props) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const userInfo = useSelector(state => state.signin);
    const {loading, error} = userInfo;
   // console.log(userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        if(userInfo.userInfo){
            props.history.push("/mainscreen");
        }
    })

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
    }

    return (
        <div className="form">
                     
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form--container">
                    <li>
                       <h3> Sign In </h3>
                    </li>
                    <li>
                    {loading? <div>Loading...</div> : error? <div>Wrong in email or password</div> : null}
                    </li>
                    <li >
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" placeholder="email" onChange={(event) => {setEmail(event.target.value)}}></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password"placeholder="password" onChange={(event) => {setPassword(event.target.value)}}></input>
                    </li>
                    <li><button type="submit" className="button primary">Sign In</button></li>
                    <li>If you are a new user</li>
                    <Link to="/signup">Create Your Calendar Buddy Account</Link>
                </ul>
            </form>
        </div>
    )
}

export default SigninScreen;