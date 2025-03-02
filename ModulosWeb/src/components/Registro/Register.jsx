import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../Alertas/CustomAlert";
import "./Register.css";
import Swal from "sweetalert2";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [modalType, setModalType] = useState("success"); // Tipo de modal
  const [modalTitle, setModalTitle] = useState(""); // Título del modal
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/register", { name, email, password });

      setModalType("success");
      setModalTitle("¡Registro exitoso!");
      setModalMessage("Ahora puedes iniciar sesión.");
      setShowModal(true);

    } catch (err) {
      setModalType("error");
      setModalTitle("Error");
      setModalMessage("Ha ocurrido un error al registrarte.");
      setShowModal(true);
      
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: err.response.data.message || "Ha ocurrido un error al registrarte.",
        // });
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError("Las contraseñas no coinciden.");
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <form onSubmit={handleSubmit}>
          <h2 className="h2-color">Registrarse</h2>
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
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmar Contraseña</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirmar contraseña"
              onChange={handleConfirmPasswordChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="register-button"
            disabled={!!passwordError || password !== confirmPassword}
          >
            Registrarse
          </button>
        </form>
        <div className="login-link">
          <p>¿Ya tienes cuenta? <a href="/">Inicia sesión aquí</a></p>
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
  );
}

export default Register;