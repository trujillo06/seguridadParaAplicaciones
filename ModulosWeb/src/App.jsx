import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario from "./components/InicioSesion/Formulario";
import Register from "./components/Registro/Register";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sucursales" element={<Register />} />
          <Route path="/r-h" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
