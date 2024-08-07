import React, {useState, useEffect} from 'react';
import "../Styles/ImagesPage.css";
import { makeGetAllRequest as getAllAudios } from '../utilities/APIrequests';
import { audiosURL, mediaURL } from '../utilities/config';

const Audios = () => {
    const [audios, setAudios] = useState([]);

    const playAudio = (audioID) => {
        const audio = document.getElementById(audioID);
        audio.play();
    }

    const pauseAudio = (audioID) => {
        const audio = document.getElementById(audioID);
        audio.pause();
    }

    useEffect(() => {

        getAllAudios(mediaURL, setAudios);
    }
    ,[]);

  return (

    <div>
        <div>Audios</div>

        <div>
            {audios && audios.map((audio) => (
                
                <div key = {audio.Id}>
                    <audio id={audio.Id} controls>
                        <source src={audio.Audio ? `${audiosURL}${audio.Audio.replace('MP3/', '')}`: ""} type="audio/mpeg"/>
                        <button onClick = {() => playAudio(audio.Id)} type = "button">Play</button>
                        <button onClick = {() => pauseAudio(audio.Id)} type = "button">Pause</button>
                    </audio>
                </div>
        ))}

        </div>
    </div>

    
  )
}

export default Audios;