import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Index";
import Picture from "./Picture/Index";
import Receta from "./Recipes/Index";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Foto" element={<Picture />} />
        <Route path="/Receta" element={<Receta />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;