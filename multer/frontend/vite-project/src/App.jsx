// App.js
import './App.css';
import React, { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      setStatusMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage); // Ensure the key matches your server's expectation ("file")

    try {
      const response = await fetch("http://localhost:2000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatusMessage("Image uploaded successfully!");
      } else {
        setStatusMessage("Failed to upload image.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="imageUpload" className="upload-label">
          Choose an image
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <br /><br />
        <button type="submit">Upload</button>
      </form>
      {preview && <img src={preview} alt="Image Preview" className="preview" />}
      <p className="status-message">{statusMessage}</p>
    </div>
  );
}

export default App;
