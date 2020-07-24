import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screen/HomeScreen';
import SigninScreen from './screen/SigninScreen';
import SignUpScreen from './screen/SignUpScreen';
import MainScreen from './screen/MainScreen';
import ProfileScreen from './screen/ProfileScreen'
import CreateEventScreen from './screen/CreateEventScreen';
import { useSelector } from 'react-redux';
import FindFreeTimeScreen from './screen/FindFreeTimeScreen';
import UpdateEventScreen from './screen/UpdateEventScreen';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

function App() {

  const userInfo = useSelector(state => state.signin);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="grid-container--header">
          <div className="grid-container--brand">
            <EventAvailableIcon style={{fontSize: 40, color: '#fff', marginRight: 6}}/>
            <Link to="/">Calendar Buddy</Link>
          </div>
          <div className='grid-container--header-links'>
            {userInfo.userInfo ? <Link to='mainscreen'>{userInfo.userInfo.name}</Link> : <Link to='signin'>Sign In</Link>}
          </div>
        </header>
        <main>
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/signup" component={SignUpScreen} />
            <Route path="/mainscreen" component={MainScreen} />
            <Route path="/profilescreen" component={ProfileScreen} />
            <Route path="/createevent" component={CreateEventScreen} />
            <Route path="/findfreetime" component={FindFreeTimeScreen} />
            <Route path="/updateevent" component={UpdateEventScreen}/>
          </div>
        </main>
        <footer className="grid-container--footer">
          We help you control your plan
      </footer>

      </div>
    </BrowserRouter>

  );
}

export default App;
