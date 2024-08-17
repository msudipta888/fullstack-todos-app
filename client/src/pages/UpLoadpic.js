import axios from "axios";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import "./UpLoadpic.css";

const UpLoadpic = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitChange = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
   // setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axios.post("https://todosapp-me9o.onrender.com/profile/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      setImageUrl(res.data.url);
    } catch (err) {
      setError(err.message || 'An error occurred while uploading the image');
    } finally {
     // setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl('');
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={submitChange} className="upload-form">
        {imageUrl && (
          <img
            src={`https://todosapp-me9o.onrender.com/${imageUrl}`}
            height={100}
            width={100}
            className="profile-pic"
            alt="profile"
          />
        )}
        {previewUrl && !imageUrl && (
          <img
            src={previewUrl}
            height={100}
            width={100}
            className="profile-pic preview"
            alt="preview"
          />
        )}
        <label htmlFor="file-upload" className="upload-label">
          <FaUpload className="upload-icon" />
          <span>Upload Profile Picture</span>
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={handleChange}
          className="upload-input"
        />
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default UpLoadpic;