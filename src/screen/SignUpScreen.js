import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { signup } from '../action/userAction';

function SignUpScreen(props) {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const userInfo = useSelector(state => state.signin);
    const {loading, error} = userInfo;
    // console.log(userInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log(userInfo.userInfo);
        if(userInfo.userInfo){
            props.history.push("/mainscreen");
        }
    })

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signup(name, email, password));
    }

    return (
        <div className="form">
                     
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form--container">
                    <li>
                       <h3> Sign Up </h3>
                    </li>
                    <li>
                    {loading? <div>Loading...</div> : error? <div>Email already exists</div> : null}
                    </li>
                    <li >
                        <label htmlFor="name">Username: </label>
                        <input type="text" name="name" id="name" placeholder="name" onChange={(event) => {setName(event.target.value)}}></input>
                    </li>
                    <li >
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" placeholder="email" onChange={(event) => {setEmail(event.target.value)}}></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password"placeholder="password" onChange={(event) => {setPassword(event.target.value)}}></input>
                    </li>
                    <li><button type="submit" className="button primary">Sign Up</button></li>
                    <li>Already has an account?</li>
                    <Link to="/signin">Back to Sign In</Link>
                </ul>
            </form>
        </div>
    )
}

export default SignUpScreen;