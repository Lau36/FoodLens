import "../Home/Home.css";
import logo from "../Resources/LogoApp.png"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/Foto" className="button" style={{ textDecoration: 'none' }}>Comenzar</Link>
      </div>
    </div>
  );
}

export default Home;
