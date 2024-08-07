import React, {useState, useEffect} from 'react';
import "../Styles/AudiosPage.css";
import { makeGetAllRequest as getAllAudios } from '../utilities/APIrequests';
import { audiosURL, mediaURL, testMediaURL } from '../utilities/config';

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
        <div className="page-title">Audios</div>

        <div className = "audios-container">
            {audios && audios.map((audio) => (
                
                <div key = {audio.Id} className = "audio-wrapper">

                    
                    <audio id={audio.Id} controls>
                        <source src={audio.Audio ? `${audiosURL}${audio.Audio.replace('MP3/', '')}`: ""} type="audio/mpeg"/>
                        <button onClick = {() => playAudio(audio.Id)} type = "button">Play</button>
                        <button onClick = {() => pauseAudio(audio.Id)} type = "button">Pause</button>
                    </audio>

                    <h1 className="audio-text">{`Title: ${audio.Title}`}</h1>
                        <h1 className="audio-text">{`Date created: ${audio.CreateDate}`}</h1>
                </div>
        ))}

        </div>
    </div>

    
  )
}

export default Audios;