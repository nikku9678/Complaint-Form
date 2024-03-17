import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, imgDB } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const File = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image to Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `images/${uuidv4()}`);
      await uploadBytes(imageRef, image);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(imageRef);

      // Add data to Firestore
      const collectionRef = collection(db, 'data');
      await addDoc(collectionRef, {
        text: text,
        imageUrl: imageUrl,
      });

      // Clear the form
      setText('');
      setImage(null);

      alert('Data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Text:</label>
          <input type="text" id="text" value={text} onChange={handleTextChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default File;
