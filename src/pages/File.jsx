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
    <div className="app">
    <div className="h2">Complaint Form</div>
    <div className="form">
      <div className="left">
        <div id="slok">
          शरीर और मोह सेआगेभी हैजीवन, <br />
          एक पावन अनुभव के लिए चलो कुम्भ चल.
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57647.60898680808!2d81.78486139949585!3d25.439080554063956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854b0b2f2e574f%3A0xadfd2b86aabbdd2b!2sKumbh%20Mela!5e0!3m2!1sen!2sin!4v1710574690983!5m2!1sen!2sin"
            style={{ border: "0" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="right">
        <div className="c-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="complaint">Complaint:</label>
              <textarea
                id="complaint"
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="complaint">Inventory no:</label>
              <input
                id="inv"
                value={inv}
                onChange={(e) => setInv(e.target.value)}
                required
              />
              <input type="file" id="fileInput"  onChange={(e)=>handleUploadImg(e)}/>
            </div>
           
            <div className="sub-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default File;
