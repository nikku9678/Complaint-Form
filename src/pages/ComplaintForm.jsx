import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam"; // Install using npm or yarn
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./ComplaintForm.css";
import { db, imgDB } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4} from "uuid";
import { getDownloadURL,getStorage,ref,uploadBytes } from "firebase/storage";


const ComplaintForm = () => {
  // const ref = collection(db, "comp");
  const [name, setName] = useState("");
  const [inv, setInv] = useState("");
  const [complaint, setComplaint] = useState("");
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState("user");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  const [ISTDate, setISTDate] = useState("");
  const [ISTTime, setISTTime] = useState("");

  const handleImageCapture = () => {
    setShowCamera(!showCamera);
  };

  const handleCapture = (e) => {
    
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    const imgs =ref(imgDB,`d/${v4()}`)
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
    // console.log(e.target.files[0])
    // const  file =  e.target.files[0];
    // const imgs =ref(imgDB,`Image/${v4()}`)
    // uploadBytes(imgs, e.target.files[0]).then((data)=>{
    //   console.log(data,"imgs")
    //   getDownloadURL(data.ref).then((val)=>{
    //     console.log(val);
    //     setImg(val)
    //     console.log("newImg: ",image)
    //   })
    // })
   
      setImage(e.target.files[0])
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set isSubmitting to true when form is being submitted

    const formData = {
      name,
      complaint,
      inv,
      ISTDate,
      ISTTime,
    };

    console.log("Form Data:", formData); // Debugging
   try{
    if (!image) {
      alert('Please select an image.');
      setIsSubmitting(false); // Reset isSubmitting
      return;
    }
    const storage = getStorage();
    const imageRef = ref(storage, `complaint-image/${uuidv4()}`);
    await uploadBytes(imageRef, image);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl)
    // Add data to Firestore
    const collectionRef = collection(db, 'comp');
    await addDoc(collectionRef, {
      name:name,
      complaint:complaint,
      inv:inv,
      ISTDate:ISTDate,
      ISTTime:ISTTime,
      imageUrl: imageUrl,
    });

  
    alert('Data uploaded successfully!');
//   try {
//     const valref= collection(db,'Complaint')
//     await addDoc(valref, {txtVal:formData,imgUrl:img});
//     toast("Complaint sent successfully");
    setName("");
    setComplaint("");
    setInv("");
    document.getElementById("fileInput").value = "";
    setImage(null);setImg(null)
   }
  //   } 
  catch (error) {
      console.error("Error submitting complaint:", error);
    }finally {
      setIsSubmitting(false); // Reset isSubmitting after form submission
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
            शरीर और मोह से आगे भी है जीवन, <br />
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
                <input type="file" id="fileInput"   onChange={(e)=>handleUploadImg(e)}/>
              </div>
             
              <div className="sub-btn">
                <button type="submit" disabled={isSubmitting} >{isSubmitting ? 'Submitting...' : 'Register'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;
