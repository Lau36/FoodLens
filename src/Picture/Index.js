import Navbar from "../Components/Navbar";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import defaultImage from "../Resources/dafaultImage.png";
import recipeImage from "../Resources/recipeImage.png";
import takePicture from "../Resources/takePicture.png";
import "../Picture/Picture.css";
import { Link } from "react-router-dom";

function Picture() {
  const [image, setImage] = useState(defaultImage); /** this var has the image*/
  const [openCamera, setOpenCamera] = useState(false);
  const webcam = useRef(null);

  const openingCamera = () => {
    setOpenCamera(true);
  };

  const capturePicture = useCallback(() => {
    const imageSrc = webcam.current.getScreenshot();
    setImage(imageSrc);
    setOpenCamera(false);
  }, [webcam]);

  const handleUploadClick = () => {
    setOpenCamera(false);
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if (!file) {
      console.log("No se seleccionó ningun archivo");
    }
  };

  return (
    <>
      <Navbar />
      <div className="containerPageImages">
        <div className="container1">
          <div className="image">
            {openCamera ? (
              <Webcam
                audio={false}
                ref={webcam}
                screenshotFormat="image/png"
                className="defaultImage"
              />
            ) : (
              <img src={image} alt="Current Display" className="defaultImage" />
            )}
          </div>
          <div className="buttons">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {openCamera ? (
              <button className="buttonTakePicture" onClick={capturePicture}>
                <img src={takePicture} alt="Recipe" className="takePicture" />
              </button>
            ) : (
              <>
                <button className="buttonOpenCamera" onClick={openingCamera}>
                  Abrir camara
                </button>
                <button className="buttonUpload" onClick={handleUploadClick}>
                  Subir foto
                </button>
              </>
            )}
          </div>
        </div>
        <div className="container2">
          <Link to="/Receta">
          <button className="createRecipe">
            <img src={recipeImage} alt="Recipe" className="recipeImage" />
            Generar receta
          </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Picture;
