import React, { useState, useEffect } from 'react';
import "../Styles/ImagesPage.css";
import { makeGetAllRequest as getAllImages, makePutRequest as updateRequest } from '../utilities/APIrequests';
import { imagesURL, mediaURL, testMediaURL } from '../utilities/config';
import editicon from "../Icons/edit.png";
import deleteicon from "../Icons/delete.png";

const Images = () => {
    const [images, setImages] = useState([]);
    const [editingImageId, setEditingImageId] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newImageFile, setNewImageFile] = useState(null);

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
            fetchImages(); // Reload images after update
            setEditingImageId(null); // Close the edit form
        });
    }

    const startEditing = (image) => {
        setEditingImageId(image.Id);
        setNewTitle(image.Title);
        setNewImageFile(null);
    };

    return (
        <div>
            <div className="page-title">Images</div>

            <div className="images-container">
                {images && images.map((image) => (
                    <div key={image.Id} className="image-wrapper">
                        <img className="image" src={`${imagesURL}${image.Image ? image.Image.slice(7) : 'default-image.jpg'}`} alt="" />
                        <h1 className="image-text">{`Title: ${image.Title}`}</h1>
                        <h1 className="image-text">{`Date created: ${image.CreateDate}`}</h1>

                        <div className="crud-buttons">
                            <div className="crud-button" onClick={() => startEditing(image)}>
                                <h1 className="crud-button-text">Edit</h1>
                                <img className = "crud-button-icon"src= {editicon} alt="" />
                            </div>

                            <div className="crud-button" onClick={() => alert("Delete button clicked")}>
                                <h1 className="crud-button-text">Delete</h1>
                                <img className = "crud-button-icon"src= {deleteicon} alt="" />
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
                                <button onClick={() => handleUpdate(image.id)}>Save</button>
                                <button onClick={() => setEditingImageId(null)}>Cancel</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
