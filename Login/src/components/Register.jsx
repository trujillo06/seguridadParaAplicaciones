import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", { name, email, password });
      navigate("/");
    } catch (err) {
      alert("Error en el registro");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input 
              id="name"
              type="text" 
              placeholder="Nombre" 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="Contraseña" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            </div>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <div className="login-link">
          <p>¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
