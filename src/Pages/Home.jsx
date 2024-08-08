import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Home.css";
import { makeGetAllRequest as getAllData, makePutRequest as updateRequest } from '../utilities/APIrequests';
import { imagesURL, audiosURL, mediaURL, testMediaURL } from '../utilities/config';
import editicon from "../Icons/edit.png";
import deleteicon from "../Icons/delete.png";

const Home = () => {
    const [images, setImages] = useState([]);
    const [editingImageId, setEditingImageId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);
    

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12); 
    const selectOptions = [1,2,3,4,5,6,7,8,9,10,11,12];

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = () => {
        getAllData(mediaURL, setImages);
    };

    const handleFileChange = (e) => {
        setNewImageFile(e.target.files[0]);
    };

    const handleUpdate = (imageId) => {
        const updateURL = `${testMediaURL}${imageId}`;
        const newData = new FormData();
        newData.append('Title', newTitle);

        if (newImageFile) {
            newData.append('Image', newImageFile, newImageFile.name);
        }
    
        updateRequest(updateURL, newData, (updatedData) => {
            console.log('Updated Data: ', updatedData);
            fetchImages(); 
            setEditingImageId(null); 
        });
    };

    const startEditing = (image) => {
        setEditingImageId(image.Id);
        setNewTitle(image.Title);
        setNewImageFile(null);
    };

    const playAudio = (audioID) => {
        const audio = document.getElementById(audioID);
        audio.play();
    };

    const pauseAudio = (audioID) => {
        const audio = document.getElementById(audioID);
        audio.pause();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = images.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(images.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>

            <div className = "pagination-inputs">

            <select className = "pagination-input" name="cars" id="cars" onChange = {(e) => {setItemsPerPage(e.target.value)}}>
            <option className = "select-option" value= "" disabled selected>Select number of items per page</option>
            {selectOptions.map((selectOption, index) => (
                
              
                    <option className = "select-option" value= {index + 1}>{index + 1}</option>
                
        ))}

            
            </select>

            <select className = "pagination-input">
            <option className = "select-option" value= "" disabled selected>Select category</option>
              
            </select>

            </div>
            <div className="data-container">
                {currentItems && currentItems.map((datum) => (
                    <div key={datum.Id} className="image-wrapper">
                        <img className="image" src={`${imagesURL}${datum.Image ? datum.Image.slice(7) : 'default-image.jpg'}`} alt="" />
                        <h1 className = "category">{datum.Category}</h1>
                        <h1 className="title">{datum.Title}</h1>
                        <h1 className="episode">{`Episode: ${datum.Id}`}</h1>
                        <p className="date">{datum.CreateDate}</p>
                        <Link className = "youtube-link" to={`https://www.youtube.com/watch?v=${datum.MediaName}`} target = "_blank">Link to YouTube channel</Link>

                        <div className="audio-wrapper">
                            <audio id={datum.Id} controls>
                                <source src={datum.Audio ? `${audiosURL}${datum.Audio.replace('MP3/', '')}` : ""} type="audio/mpeg" />
                            </audio>
                          
                        </div>

                        <p className="audio-size">{`Audio Size: ${Math.round(datum.AudioSize / 1000000).toFixed(2)} MB`}</p>

                        <div className="crud-buttons">
                            <div className="crud-button" onClick={() => startEditing(datum)}>
                                <h1 className="crud-button-text">Edit</h1>
                                <img className="crud-button-icon" src={editicon} alt="" />
                            </div>

                            <div className="crud-button" onClick={() => alert("Delete button clicked")}>
                                <h1 className="crud-button-text">Delete</h1>
                                <img className="crud-button-icon" src={deleteicon} alt="" />
                            </div>
                        </div>

                        {editingImageId === datum.Id && (
                            <div className="edit-form">
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="New Title"
                                />
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                />
                                <button onClick={() => handleUpdate(datum.Id)}>Save</button>
                                <button onClick={() => setEditingImageId(null)}>Cancel</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="pagination-controls">
                <button className = "pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span className = "pagination-text">Page {currentPage} of {totalPages}</span>
                <button className = "pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Home;
