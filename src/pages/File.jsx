import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { db, imgDB } from '../firebase'
import { addDoc,collection } from 'firebase/firestore'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
const File = () => {
    const [text,setTxt] =useState('')
    const [img,setImg] =useState('')

    const handleFile =(e)=>{
      e.preventDefault();
  console.log(e.target.files[0]);

  const file = e.target.files[0];
  const imgsRef = ref(imgDB, `Image/${v4()}`);

  uploadBytes(imgsRef, file)
    .then((snapshot) => {
      console.log("File uploaded successfully");
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        setImg(downloadURL); // Set the image URL in the state
      });
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
    });
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const valref= collection(db,'temp')
            await addDoc(valref, {txtVal:text,imgUrl:img});
            toast("Complaint sent successfully");
           setTxt('')
           setImg('')
           document.getElementById("fileInput").value = ""; 
          } catch (error) {
            console.error("Error submitting complaint:", error);
          }
    }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
      <input type="file" id='fileInput'  onChange={(e)=>handleFile(e)}/>
      <input type='text'  value={text} onChange={(e)=>setTxt(e.target.value)} />
      <button type='submit'>Submit</button>

      </form>

      <div>
                {/* <label htmlFor="image">Image:</label> */}
                {!showCamera && (
                  <button type="button" id="image" onClick={handleImageCapture}>
                    <FontAwesomeIcon icon={faCamera} /> Take Picture
                  </button>
                )}
                {showCamera && (
                  <div className="camera">
                    <Webcam
                      id="webcam"
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={320}
                      height={240}
                      videoConstraints={{ facingMode: "environment" }}
                    />

                    <div className="camera-btn">
                      {/* <button id='switch-camera' type="button" onClick={switchCamera}>Switch Camera</button> */}
                      <button onClick={handleCapture}>Capture</button>
                    </div>
                  </div>
                )}
                {img && <img src={img} id="cap-img" alt="Captured" />}
              </div>


    </div>
  )
}

export default File
