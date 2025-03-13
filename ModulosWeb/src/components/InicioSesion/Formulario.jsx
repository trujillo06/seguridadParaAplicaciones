import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Formulario.css";
import Swal from "sweetalert2";
import CustomAlert from "../Alertas/CustomAlert";

function Formulario() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [modalType, setModalType] = useState("success"); // Tipo de modal
  const [modalTitle, setModalTitle] = useState(""); // Título del modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setModalType("success");
      setModalTitle("Éxito");
      setModalMessage("Inicio de sesión exitoso. Redirigiendo...");
      setShowModal(true);
      navigate("/dashboard");
    } catch (err) {
      console.error('Error al Iniciar Sesión')
      setModalType("error");
      setModalTitle("Error");
      setModalMessage(err.response?.data?.message || "Ha ocurrido un error al iniciar sesión.");
      setShowModal(true);
    }
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   text: err.response.data.message || "Ha ocurrido un error al registrarte.",
      // });
  };


  return (
    <div className="background">
    <div className="login-container">
      <div className="login-box">
        <h2 className="h2-color">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo</label>
            <input 
              id="email"
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {/* <div className="options">
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </div> */}
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
        <div className="register-link">
          <p>Aún no tienes cuenta? <a href="/Register">Regístrate aquí</a></p>
        </div>
      </div>
            {showModal && (
              <CustomAlert
                type={modalType}
                title={modalTitle}
                message={modalMessage}
                onConfirm={closeModal}
              />
            )}
    </div>
  </div> 
);
}

export default Formulario;