import React from 'react';
import "../Styles/Navigation.css";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className = "navigation-items">
        <Link to = "/images"><h1>Images</h1></Link>
        <Link to = "/audios"><h1>Audios</h1></Link>
 
    </div>
  )
}

export default Navigation