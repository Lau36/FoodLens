import Navbar from "../Components/Navbar";
import defaultImage from "../Resources/dafaultImage.png";
import recipeImage from "../Resources/recipeImage.png";
import "../Picture/Picture.css";

function Picture() {
  return (
    <>
      <Navbar />
      <div className="containerPageImages">
        <div className="container1">
          <div className="image">
            <img src={defaultImage} alt="Logo" className="defaultImage" />
          </div>
          <div className="buttons">
            <button className="buttonTakePicture">Tomar foto</button>
            <button className="buttonUpload">Subir foto</button>
          </div>
        </div>
        <div className="container2">
          <button className="createRecipe">
            <img src={recipeImage} alt="Logo" className="recipeImage" />
            Generar reseta
          </button>
        </div>
      </div>
    </>
  );
}

export default Picture;
