import React from 'react';
import "../Styles/Home.css";
import {Outlet} from "react-router-dom";
import Navigation from '../Components/Navigation';

const Home = () => {
  return (
    <div>
        <Navigation />

        <div className = "outlet-container">
        <Outlet />
        </div>
        

    </div>
  )
}

export default Home;