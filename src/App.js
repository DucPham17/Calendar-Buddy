import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import SigninScreen from './screen/SigninScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header  className="header">
        <div className="brand">
        <Link to="/">Calendar Buddy</Link>
        </div>
        <div className='header-links'>
          <Link to='signin'>Signin</Link>
        </div>
      </header>
      <main>
      <div className="content">
      <Route path="/" exact={true} component={HomeScreen} />
      <Route path="/signin" component={SigninScreen} />
      </div>
      </main>
      <footer className="footer">
        We help you control your plan
      </footer>
     
     </div>
    </BrowserRouter>
    
  );
}

export default App;
