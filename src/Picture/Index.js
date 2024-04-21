import Navbar from "../Components/Navbar";
import { useState, useRef, useCallback } from "react";
import { endpoints } from "../Services/Index";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import defaultImage from "../Resources/dafaultImage.png";
import recipeImage from "../Resources/recipeImage.png";
import takePicture from "../Resources/takePicture.png";
import flipCamera from "../Resources/flipCamera.png";
import Swal from "sweetalert2";

import "../Picture/Picture.css";

function Picture() {
  const [image, setImage] = useState(defaultImage); /** this var has the image*/
  const [openCamera, setOpenCamera] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState("user");
  const webcam = useRef(null);

  const openingCamera = () => {
    setOpenCamera(true);
  };

  const capturePicture = useCallback(() => {
    const imageSrc = webcam.current.getScreenshot();
    setImage(imageSrc);
    setOpenCamera(false);
  }, [webcam]);

  const toggleCameraFacingMode = () => {
    if (cameraFacingMode === "user") {
      setCameraFacingMode("environment");
    } else {
      setCameraFacingMode("user");
    }
  };

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

  const getIngredients = async () => {
    if (image === defaultImage) {
      onError();
    } else {
      try {
        const response = await endpoints.getIngredients(image);
        setIngredients(response);
        console.log("estos son los ingredientes", ingredients);
      } catch (error) {
        console.error("Ocurrió un error", error);
      }
    }
  };

  const onError = (error) => {
    Swal.fire({
      icon: "warning",
      title: "Algo salió mal",
      text: "Tienes que subir o tomar una foto para poder obtener los ingredientes de esta",
      confirmButtonText: "Continuar",
      allowOutsideClick: false,
      showCancelButton: false,
    });
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
                videoConstraints={{ facingMode: cameraFacingMode }}
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
              <>
                <button className="buttonTakePicture" onClick={capturePicture}>
                  <img src={takePicture} alt="Recipe" className="takePicture" />
                </button>
                <button className="flipCamera" onClick={toggleCameraFacingMode}>
                  <img src={flipCamera} alt="Recipe" className="takePicture" />
                </button>
              </>
            ) : (
              <>
                <button className="buttonOpenCamera" onClick={openingCamera}>
                  Abrir cámara
                </button>
                <button className="buttonUpload" onClick={handleUploadClick}>
                  Subir foto
                </button>
              </>
            )}
          </div>
        </div>

        <div className="container2">
          {ingredients ? (
            <>
              <div className="card1">
                <div className="card_ingredients">
                  <h1 className="card_title">Ingredientes:</h1>
                  <textarea
                    rows="10"
                    type="text"
                    className="card_body"
                    name="description"
                    value={ingredients}
                    required
                  />
                </div>
                <p className="textCard">
                  Puedes editar los ingredientes si el reconocimiento no fue
                  exacto
                </p>
              </div>
              <Link to="/Receta">
                <button className="createRecipe">Generar receta</button>
              </Link>
            </>
          ) : (
            <button className="getIngredients" onClick={getIngredients}>
              <img src={recipeImage} alt="Recipe" className="recipeImage" />
              Obtener ingredientes
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Picture;
