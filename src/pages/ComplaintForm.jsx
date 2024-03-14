import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam'; // Install using npm or yarn
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import './ComplaintForm.css'
import  {db} from '../firebase.js';
import {addDoc,collection} from '@firebase/firestore' 
import { toast } from 'react-toastify';
const ComplaintForm = () => {
  const ref=collection(db,'comp')
  const [name, setName] = useState('');
  const [inv, setInv] = useState('');
  const [complaint, setComplaint] = useState('');
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState('user'); 
  const handleImageCapture = () => {
    setShowCamera(!showCamera);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowCamera(!showCamera);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name,
      complaint,
      inv,
      image
    };
  
    console.log('Form Data:', formData); // Debugging
  
    try {
      await addDoc(ref,formData)
      toast("Complaint sent successfully")
      setName('')
      setComplaint('')
      setInv('')
      setImage(null)
    } catch (error) {
      console.error("Error submitting complaint:", error);
      
    }
  };

  const switchCamera = () => {
    setCameraFacingMode(cameraFacingMode === 'user' ? 'environment' : 'user');
  };

  const webcamRef = React.useRef(null);

  return (
   <div className="app">
    <div className='h2'>Complaint Form</div>
    <div className="form">
    <div className="left">
      <div id='slok'>शरीर और मोह सेआगेभी हैजीवन, <br/>
एक पावन अनुभव के लिए
चलो कुम्भ चल.</div>
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
        </div>
        <div>
          {/* <label htmlFor="image">Image:</label> */}
          {!showCamera && <button type="button" id="image" onClick={handleImageCapture}>
            <FontAwesomeIcon icon={faCamera} /> Take Picture
          </button>}
          {showCamera && (
              <div className="camera">
              <Webcam id='webcam'
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={320}
                height={240}
                videoConstraints={{ facingMode: 'environment' }} 
              />
             
               <div className='camera-btn'>
               {/* <button id='switch-camera' type="button" onClick={switchCamera}>Switch Camera</button> */}
              <button onClick={handleCapture}>Capture</button>
               </div>
            </div>
          )}
          {image && <img src={image} id='cap-img' alt="Captured" />}
        </div>
        <div className='sub-btn'>
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    </div>
   </div>
  );
};

export default ComplaintForm;
