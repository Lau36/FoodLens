import "../Home/Home.css";
import logo from "../Resources/LogoApp.png"

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <img src={logo} alt="Logo" className="logo" />
        <button className="button">Comenzar</button>
      </div>
    </div>
  );
}

export default Home;
