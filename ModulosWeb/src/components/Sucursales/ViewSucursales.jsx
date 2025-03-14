import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([
    { id_sucursal: 1, nombre: "Sucursal A", direccion: "Calle 123", telefono_contacto: "1234567890", nombre_encargado: "Juan Perez" },
    { id_sucursal: 2, nombre: "Sucursal B", direccion: "Avenida 456", telefono_contacto: "0987654321", nombre_encargado: "Maria Lopez" },
    { id_sucursal: 3, nombre: "Sucursal C", direccion: "Boulevard 789", telefono_contacto: "1122334455", nombre_encargado: "Carlos Sanchez" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Estados para el modal de agregar
  const [showModal, setShowModal] = useState(false);
  const [newSucursal, setNewSucursal] = useState({
    nombre: "", direccion: "", telefono_contacto: "", nombre_encargado: "",
  });

  // Estados para el modal de editar
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSucursal, setEditSucursal] = useState(null);

  const handleDeleteSucursal = (id) => {
    setSucursales(sucursales.filter((s) => s.id_sucursal !== id));
  };

  const handleAddSucursal = () => {
    if (!newSucursal.nombre || !newSucursal.direccion || !newSucursal.telefono_contacto || !newSucursal.nombre_encargado) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    
    const nuevaLista = [
      ...sucursales,
      { id_sucursal: sucursales.length + 1, ...newSucursal }
    ];
    
    setSucursales(nuevaLista);
    setNewSucursal({ nombre: "", direccion: "", telefono_contacto: "", nombre_encargado: "" });
    setShowModal(false);
  };

  const handleEditSucursal = () => {
    if (!editSucursal.nombre || !editSucursal.direccion || !editSucursal.telefono_contacto || !editSucursal.nombre_encargado) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const updatedSucursales = sucursales.map(sucursal =>
      sucursal.id_sucursal === editSucursal.id_sucursal ? editSucursal : sucursal
    );

    setSucursales(updatedSucursales);
    setShowEditModal(false);
  };

  const filteredSucursales = sucursales.filter((sucursal) =>
    [sucursal.nombre, sucursal.direccion, sucursal.telefono_contacto, sucursal.nombre_encargado]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-5">
      <Navbar />
      <h2 className="text-center text-white mb-4">Gestión de Sucursales</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar Sucursal</button>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive" style={{ minHeight: "300px", overflowY: "auto" }}>
        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Encargado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSucursales.length > 0 ? (
              filteredSucursales.map((sucursal) => (
                <tr key={sucursal.id_sucursal}>
                  <td>{sucursal.nombre}</td>
                  <td>{sucursal.direccion}</td>
                  <td>{sucursal.telefono_contacto}</td>
                  <td>{sucursal.nombre_encargado}</td>
                  <td className="text-center">
                    <button className="btn btn-warning btn-sm me-2" 
                      onClick={() => {
                        setEditSucursal(sucursal);
                        setShowEditModal(true);
                      }}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSucursal(sucursal.id_sucursal)}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No hay sucursales disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar sucursal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Sucursal</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control mb-2" placeholder="Nombre" value={newSucursal.nombre} onChange={(e) => setNewSucursal({ ...newSucursal, nombre: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Dirección" value={newSucursal.direccion} onChange={(e) => setNewSucursal({ ...newSucursal, direccion: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Teléfono" value={newSucursal.telefono_contacto} onChange={(e) => setNewSucursal({ ...newSucursal, telefono_contacto: e.target.value })} />
                <input type="text" className="form-control mb-2" placeholder="Encargado" value={newSucursal.nombre_encargado} onChange={(e) => setNewSucursal({ ...newSucursal, nombre_encargado: e.target.value })} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleAddSucursal}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal || showEditModal ? <div className="modal-backdrop fade show"></div> : null}
    </div>
  );
};

export default Sucursales;
