import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Styles/ImagesPage.css";
import { makeGetAllRequest as getAllImages, makePutRequest as updateRequest } from '../utilities/APIrequests';
import { imagesURL, audiosURL, mediaURL, testMediaURL } from '../utilities/config';
import editicon from "../Icons/edit.png";
import deleteicon from "../Icons/delete.png";

const Images = () => {
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
        getAllImages(mediaURL, setImages);
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

            <select className = "pagination-input" name="cars" id="cars">
            <option className = "select-option" value= "" disabled selected>Select category</option>
              
            </select>

            </div>
            <div className="images-container">
                {currentItems && currentItems.map((image) => (
                    <div key={image.Id} className="image-wrapper">
                        <img className="image" src={`${imagesURL}${image.Image ? image.Image.slice(7) : 'default-image.jpg'}`} alt="" />
                        <h1 className = "category">{image.Category}</h1>
                        <h1 className="title">{`Title: ${image.Title}`}</h1>
                        <h1 className="episode">{`Episode: ${image.Id}`}</h1>
                        <p className="date">{`Date created: ${image.CreateDate}`}</p>
                        <Link className = "youtube-link" href="">{`Link to YouTube channel ${image.CreateDate}`}</Link>

                        <div className="audio-wrapper">
                            <audio id={image.Id} controls>
                                <source src={image.Audio ? `${audiosURL}${image.Audio.replace('MP3/', '')}` : ""} type="audio/mpeg" />
                            </audio>
                          
                        </div>

                        <p className="audio-size">{`Audio Size: ${Math.round(image.AudioSize / 1000000).toFixed(2)} MB`}</p>

                        <div className="crud-buttons">
                            <div className="crud-button" onClick={() => startEditing(image)}>
                                <h1 className="crud-button-text">Edit</h1>
                                <img className="crud-button-icon" src={editicon} alt="" />
                            </div>

                            <div className="crud-button" onClick={() => alert("Delete button clicked")}>
                                <h1 className="crud-button-text">Delete</h1>
                                <img className="crud-button-icon" src={deleteicon} alt="" />
                            </div>
                        </div>

                        {editingImageId === image.Id && (
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
                                <button onClick={() => handleUpdate(image.Id)}>Save</button>
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

export default Images;
