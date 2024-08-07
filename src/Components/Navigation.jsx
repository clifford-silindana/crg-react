import React from 'react';
import "../Styles/Navigation.css";
import { Link } from 'react-router-dom';
import imageicon from "../Icons/image.png";
import audioicon from "../Icons/audio.png";

const Navigation = () => {
  return (
    <div className = "navigation-items">
        
        <Link className = "navigation-item" to = "/images">
        <div>
            <h1 className = "navigation-item-text">Images</h1>
            <img className = "navigation-icon" src= {imageicon} alt="" />
        </div>
        </Link>

        <Link className = "navigation-item" to = "/audios">
        <div>
            <h1 className = "navigation-item-text">Audios</h1>
            <img className = "navigation-icon" src= {audioicon} alt="" />
        </div>
        </Link>
        
      
        
 
    </div>
  )
}

export default Navigation