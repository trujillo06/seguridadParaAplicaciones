import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formulario from "./components/InicioSesion/Formulario";
import Register from "./components/Registro/Register";
// import Sucursales from "./components/Sucursarsales/ViewSucursales";
// import RecursosHumanos from "./components/RH/ViewRH";
import "./App.css";



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/sucursales" element={<SucursalList />} /> */}
          {/* <Route path="/recursos-humanos" element={<RecursosHumanos />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
