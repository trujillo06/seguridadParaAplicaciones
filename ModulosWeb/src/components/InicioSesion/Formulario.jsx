import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Formulario.css";

function Formulario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Error en el login");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
          src="./src/assets/LogoTortilleria2.png" 
          className="login-logo"
          alt="Logo Tortillería"
        />
        <h2 className="h2-color">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo</label>
            <input 
              id="email"
              type="email" 
              placeholder="Correo" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="options">
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        <div className="register-link">
          <p>Aún no tienes cuenta? <a href="/Register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
}

export default Formulario;