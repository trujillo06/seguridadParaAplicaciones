import * as React from "react";
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,IconButton,TextField,Button,Modal,Pagination,Typography,useMediaQuery,useTheme,} from "@mui/material";
import {Edit as EditIcon,Delete as DeleteIcon,Add as AddIcon,Search as SearchIcon,} from "@mui/icons-material";
import Navbar from "../Navbar/Navbar"; 

const Sucursales = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const [sucursales, setSucursales] = React.useState([
    {
      id_sucursal: 1,
      nombre: "Sucursal A",
      direccion: "Calle 123",
      telefono_contacto: "1234567890",
      nombre_encargado: "Juan Perez",
    },
    {
      id_sucursal: 2,
      nombre: "Sucursal B",
      direccion: "Avenida 456",
      telefono_contacto: "0987654321",
      nombre_encargado: "Maria Lopez",
    },
    {
      id_sucursal: 3,
      nombre: "Sucursal C",
      direccion: "Boulevard 789",
      telefono_contacto: "1122334455",
      nombre_encargado: "Carlos Sanchez",
    },
    {
      id_sucursal: 4,
      nombre: "Sucursal D",
      direccion: "Plaza 101",
      telefono_contacto: "5566778899",
      nombre_encargado: "Ana Martinez",
    },
    {
      id_sucursal: 5,
      nombre: "Sucursal E",
      direccion: "Calle 202",
      telefono_contacto: "9988776655",
      nombre_encargado: "Pedro Gómez",
    },
  ]);
  const [openModal, setOpenModal] = React.useState(false);
  const [currentSucursal, setCurrentSucursal] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6; 

  const handleOpenModal = (sucursal = null) => {
    setCurrentSucursal(sucursal);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentSucursal(null);
  };

  const handleSaveSucursal = (sucursal) => {
    if (sucursal.id_sucursal) {
      setSucursales(
        sucursales.map((s) =>
          s.id_sucursal === sucursal.id_sucursal ? sucursal : s
        )
      );
    } else {
      setSucursales([
        ...sucursales,
        { ...sucursal, id_sucursal: sucursales.length + 1 },
      ]);
    }
    handleCloseModal();
  };

  const handleDeleteSucursal = (id) => {
    setSucursales(sucursales.filter((s) => s.id_sucursal !== id));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const filteredSucursales = sucursales.filter(
    (sucursal) =>
      sucursal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sucursal.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sucursal.telefono_contacto
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      sucursal.nombre_encargado.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedSucursales = filteredSucursales.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const rowHeight = 43; 
  const headerHeight = 60; 
  const tableContainerHeight = headerHeight + rowHeight * rowsPerPage; 

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: isMobile ? "10px" : "20px", 
        marginTop: "100px", 
        color: "white",
      }}
    >
      <Navbar />

      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "30px",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          marginTop: "15px", 
        }}
      >
        Gestión de Sucursales
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: isMobile ? "10px" : "0", 
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
          sx={{
            backgroundColor: "#009DCF",
            "&:hover": { backgroundColor: "#007BA7" },
            width: isMobile ? "100%" : "auto", 
          }}
        >
          Agregar Sucursal
        </Button>
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ marginRight: "10px", color: "white" }} />
            ),
            sx: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              width: isMobile ? "100%" : "auto", 
            },
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          backgroundColor: "#ffffff", 
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px", 
          height: tableContainerHeight, 
          overflow: "auto", 
        }}
      >
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#001f3f" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  minWidth: isMobile ? "100px" : "200px", 
                  padding: "8px",
                }}
              >
                Nombre
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  minWidth: isMobile ? "150px" : "400px", 
                  padding: "8px",
                }}
              >
                Dirección
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  minWidth: isMobile ? "80px" : "120px",
                  padding: "8px",
                }}
              >
                Teléfono
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  minWidth: isMobile ? "120px" : "250px", 
                  padding: "8px",
                }}
              >
                Encargado
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  minWidth: isMobile ? "60px" : "100px",
                  padding: "8px",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSucursales.length > 0 ? (
              paginatedSucursales.map((sucursal) => (
                <TableRow key={sucursal.id_sucursal} sx={{ height: rowHeight }}>
                  <TableCell
                    sx={{
                      textAlign: "left",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      minWidth: isMobile ? "100px" : "200px", 
                      padding: "8px",
                    }}
                  >
                    {sucursal.nombre}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "left",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      minWidth: isMobile ? "150px" : "400px",
                      padding: "8px",
                    }}
                  >
                    {sucursal.direccion}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "left",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      minWidth: isMobile ? "80px" : "120px", 
                      padding: "8px",
                    }}
                  >
                    {sucursal.telefono_contacto}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "left",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      minWidth: isMobile ? "120px" : "250px", 
                      padding: "8px",
                    }}
                  >
                    {sucursal.nombre_encargado}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      minWidth: isMobile ? "60px" : "100px",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <IconButton
                      onClick={() => handleOpenModal(sucursal)}
                      sx={{ color: "#009DCF", padding: "4px" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteSucursal(sucursal.id_sucursal)}
                      sx={{ color: "#ff4444", padding: "4px" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    textAlign: "center",
                    height: "300px",
                    color: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <Typography variant="h6">
                    No hay sucursales disponibles.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <Pagination
          count={Math.ceil(filteredSucursales.length / rowsPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.72)",
            },
            "& .Mui-selected": {
              backgroundColor: "#008CBA",
              color: "#ffffff",
              fontWeight: "bold",
              borderRadius: "8px",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#00aaff",
              color: "#ffffff",
            },
          }}
        />
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : 400, 
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontWeight: "bold", color: "#001f3f" }}
          >
            {currentSucursal ? "Editar Sucursal" : "Agregar Sucursal"}
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            value={currentSucursal ? currentSucursal.nombre : ""}
            onChange={(e) =>
              setCurrentSucursal({ ...currentSucursal, nombre: e.target.value })
            }
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Dirección"
            value={currentSucursal ? currentSucursal.direccion : ""}
            onChange={(e) =>
              setCurrentSucursal({
                ...currentSucursal,
                direccion: e.target.value,
              })
            }
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Teléfono de Contacto"
            value={currentSucursal ? currentSucursal.telefono_contacto : ""}
            onChange={(e) =>
              setCurrentSucursal({
                ...currentSucursal,
                telefono_contacto: e.target.value,
              })
            }
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            label="Nombre del Encargado"
            value={currentSucursal ? currentSucursal.nombre_encargado : ""}
            onChange={(e) =>
              setCurrentSucursal({
                ...currentSucursal,
                nombre_encargado: e.target.value,
              })
            }
            sx={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            onClick={() => handleSaveSucursal(currentSucursal)}
            sx={{
              backgroundColor: "#009DCF",
              "&:hover": { backgroundColor: "#007BA7" },
            }}
          >
            Guardar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Sucursales;
