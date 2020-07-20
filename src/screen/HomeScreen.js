import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function HomeScreen(props) {
  const userInfo = useSelector(state => state.signin);
  const [time,timeSet] = useState(new Date());
  //console.log(userInfo.userInfo.name);
  useEffect(() => {
     setInterval(() => timeSet(new Date()), 1000
    );
  })


  
    return (
      <div className="home-screen">
        <h1>Hello, _____ ! </h1>
        <h2 className="home-screen--container">{time.toLocaleTimeString()}</h2>
        <h3 className="home-screen--bottom-text">- let's plan & meet -</h3>
      </div>
    );
  }



export default HomeScreen;