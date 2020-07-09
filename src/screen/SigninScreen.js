import React from 'react';

function SigninScreen() {


    const submitHandler = () =>{

    }

    return (
        <div className="form">
            <form method="POST" onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                       <h3> Sign In </h3>
                    </li>
                    <li >
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email"placeholder="email"></input>
                    </li>
                    <li>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password"placeholder="password"></input>
                    </li>
                    <li><button type="submit" className="button primary">Sign in</button></li>
                    <li>If you are a new user</li>
                    <li>Create Your Calendar Buddy Account</li>
                </ul>
            </form>
        </div>
    )
}

export default SigninScreen;