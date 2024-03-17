import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam"; // Install using npm or yarn
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./ComplaintForm.css";
import { db, imgDB } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";


const ComplaintForm = () => {
  // const ref = collection(db, "comp");
  const [name, setName] = useState("");
  const [inv, setInv] = useState("");
  const [complaint, setComplaint] = useState("");
  const [image, setImage] = useState(null);
  const [img, setImg] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState("user");

  const [ISTDate, setISTDate] = useState("");
  const [ISTTime, setISTTime] = useState("");

  const handleImageCapture = () => {
    setShowCamera(!showCamera);
  };

  const handleCapture = (e) => {
    
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    const imgs =ref(imgDB,`Image/${v4()}`)
    uploadBytes(imgs, imageSrc).then((data)=>{
      console.log(data,"imgs")
      getDownloadURL(data.ref).then((val)=>{
        console.log(val);
        setImage(val);
      })
    })
    // setImage(img);
    setShowCamera(!showCamera);
  };
  const handleUploadImg = (e) => {
    console.log(e.target.files[0])
    const  file =  e.target.files[1];
    const imgs =ref(imgDB,`Image/${v4()}`)
    uploadBytes(imgs, file).then((data)=>{
      console.log(data,"imgs")
      getDownloadURL(data.ref).then((val)=>{
        console.log(val);
        setImg(val)
        console.log("newImg: ",image)
      })
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name,
      complaint,
      inv,
      ISTDate,
      ISTTime,
    };

    console.log("Form Data:", formData); // Debugging

    try {
      const valref= collection(db,'Complaint')
      await addDoc(valref, {txtVal:formData,imgUrl:img});
      toast("Complaint sent successfully");
      setName("");
      setComplaint("");
      setInv("");
      setImage(null);setImg('')
      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  const switchCamera = () => {
    setCameraFacingMode(cameraFacingMode === "user" ? "environment" : "user");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDateTime = new Date();
      const ISTOptions = {
        timeZone: "Asia/Kolkata",
        hour12: false,

        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const ISTDateString = currentDateTime.toLocaleDateString(
        "en-IN",
        ISTOptions
      );
      const ISTTimeString = currentDateTime.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setISTDate(ISTDateString);
      setISTTime(ISTTimeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const webcamRef = React.useRef(null);

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

export default ComplaintForm;
