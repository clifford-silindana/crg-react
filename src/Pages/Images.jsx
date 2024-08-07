import React, {useState, useEffect} from 'react';
import "../Styles/ImagesPage.css";
import { makeGetAllRequest as getAllImages } from '../utilities/APIrequests';
import { imagesURL, mediaURL } from '../utilities/config';

const Images = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {

        getAllImages(mediaURL, setImages);
    }
    ,[])

  return (

    <div>
        <div>Images</div>

        <div>
        {images && images.map((image) => (
            <div key = {image.Id}>
            <img className = "image" src= {`${imagesURL}${image.Image.slice(7)}`} alt="" />
            </div>
        ))}

        </div>

        

    </div>

    
  )
}

export default Images