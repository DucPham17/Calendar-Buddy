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
    <div className="homeScreenStyle">
      {userInfo.userInfo ? <h1>Hello, {userInfo.userInfo.name} ! </h1> : <h1>Hello! </h1>}
      <h2 className="buttonContainer">{time.toLocaleTimeString()}</h2>
      <h3 className="buttomText">- let's plan & meet -</h3>
    </div>
  );

}

export default HomeScreen;