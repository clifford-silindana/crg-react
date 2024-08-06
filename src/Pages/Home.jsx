import React from 'react';
import {Outlet} from "react-router-dom";
import Navigation from '../Components/Navigation';

const Home = () => {
  return (
    <div>
        <Navigation />
        <Outlet />

    </div>
  )
}

export default Home;