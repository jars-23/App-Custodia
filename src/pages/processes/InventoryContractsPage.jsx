import React, { useState, useEffect } from "react";
import { BACKEND_URL } from '../../config'; 
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
    Paper, IconButton, TablePagination, TextField, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import TitleComponent from "../../components/TitleComponent";
import CustomModal from "../../components/CustomModalComponents";
import GroupModal from "../modals/parametrizacion/GroupModal";
import UserGroupModal from "../modals/parametrizacion/UserGroupModal";
import { useAlert } from "../../components/Alert/AlertContext";
import { formatFecha } from "../../utils/utils";

const InventoryContractsPage = () => {

    // #region Environment
    const { showAlert } = useAlert();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [filterEnabled, setFilterEnabled] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [openModalMembers, setOpenModalMembers] = useState(false);
    const [title, setTitle] = useState("Agregar nuevo grupo");
    const [titleMembers, setTitleMembers] = useState("Agregar nuevo miembro");
    const [rows, setRows] = useState([]);    
    const [selectedRow, setSelectedRow] = useState(null);

    //#region Methods-Get    
    const getContract = () => {
        const obj = {
            id: 0,
            fotocliente: "",
            nombrecliente: "",
            nitcliente: "",
            direccioncliente: "",
            telefonocliente: "",
            celularcliente: "",
            emailcliente: "",
            nombresupervisor: "",
            numerocontrato: "",
            valorcontrato: "",
            valorprorroga: "",
            estado: "",
            idusuario: 0,
            usuario: "",
            fechagrabo: "2025-04-03T16:58:55.735Z"
        }
        
        fetch(`${BACKEND_URL}Configuracion/ClientesObtener`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.objetos)) {
                    const sortedData = [...data.objetos].sort((a, b) => a.id - b.id);
                    setRows(sortedData);
                } else {
                    console.error("Error: data.objetos no es un array.");
                    setRows([]);
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                setRows([]);
            });
      }

    // #region Methods-Handle
    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleEdit = (rowData) => {
        // setTitle("Editar grupo");
        // setSelectedRow(rowData);
        // setOpenModal(true);
        showAlert({
            type: "info",
            title: "Información",
            message: "Muy pronto podrás acceder a este contenido",
          });
      };         
    const handleMembers = (rowData) => {
        showAlert({
            type: "info",
            title: "Información",
            message: "Muy pronto podrás acceder a este contenido",
          });
        // setTitleMembers("Agregar nuevo miembro (" + rowData.nombre + ")");
        // setSelectedRow(rowData);
        // setOpenModalMembers(true);
      };

     // #region Methods-Varied 
    const filteredRows = rows.filter((row) => {
        
        if (!rows || rows.length === 0) return [];
        
        const searchText = search?.toLowerCase() || '';
    
        const matchesSearch = row.numerocontrato?.toLowerCase().includes(searchText) || 
        row.nitcliente?.toLowerCase().includes(searchText) || 
        row.nombrecliente?.toLowerCase().includes(searchText);
    
        const matchesEnabled = filterEnabled ? row.estado?.toLowerCase() === filterEnabled.toLowerCase() : true;
    
        return matchesSearch && matchesEnabled;
    }, [rows, search, filterEnabled]);

    const openModals = () => {
        // setTitle("Agregar nuevo grupo");
        // setSelectedRow([]);
        // setOpenModal(true);
        showAlert({
            type: "info",
            title: "Información",
            message: "Muy pronto podrás acceder a este contenido",
          });

      };

    //#region useEffect
    useEffect(() => {
        getContract();
      }, []);

    return (

        <>

            {/* Titulo de la page */}
            <TitleComponent firstTitle={"Parametrización"} secondTitle={"Inventarios y contratos"} btnTitle="Agregar" onBtnClick={() => openModals()}></TitleComponent>

            <div className="col-lg-12 card card--modify p-4 mb-3">
                <div className="row">
                    <div className="col-lg-12 mb-3">
                        <Typography variant="label" align="center" gutterBottom>
                            Filtros de búsqueda:
                        </Typography>
                    </div>
                    <div className="col-lg-6">
                        <TextField
                                label="Buscar..."
                                variant="outlined"
                                fullWidth
                                value={search}
                                onChange={(e) => {setSearch(e.target.value); setPage(0);}}
                            />
                    </div>
                    <div className="col-sm-12 col-lg-3">
                        <FormControl variant="outlined" sx={{ width: '100%' }}>
                                <InputLabel>Habilitado</InputLabel>
                                <Select
                                    value={filterEnabled}
                                    onChange={(e) => {setFilterEnabled(e.target.value); setPage(0);}}
                                    label="Habilitado"
                                >
                                    <MenuItem value="">Todos</MenuItem>
                                    <MenuItem value="SI">SI</MenuItem>
                                    <MenuItem value="NO">NO</MenuItem>
                                </Select>
                            </FormControl>
                    </div>
                </div>
            </div>

            <div className="col-lg-12">
                <TableContainer component={Paper} sx={{ padding: 3, borderRadius: 3 }}>

                    {/* Tabla */}
                    <Table>
                        <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                            <TableRow style={{ borderRadius: "10px 10px 0 0" }}>
                                <TableCell align="center"><strong>EDITAR</strong></TableCell>
                                <TableCell align="center"><strong>MIEMBROS</strong></TableCell>
                                <TableCell align="center"><strong>ID</strong></TableCell>
                                <TableCell align="center"><strong>NÚMERO DE CONTRATO</strong></TableCell>
                                <TableCell align="center"><strong>NIT DEL CLIENTE</strong></TableCell>
                                <TableCell align="center"><strong>NOMBRE DEL CLIENTE</strong></TableCell>
                                <TableCell align="center"><strong>NOMBRE DEL SUPERVISOR</strong></TableCell>
                                <TableCell align="center"><strong>FECHA DE GRABO</strong></TableCell>
                                <TableCell align="center"><strong>HABILITADO</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id} style={{cursor: "pointer"}}>
                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                <EditIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton color="primary" onClick={() => handleMembers(row)}>
                                                <GroupAddIcon/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.numerocontrato}</TableCell>
                                        <TableCell align="center">{row.nitcliente}</TableCell>
                                        <TableCell align="center">{row.nombrecliente}</TableCell>
                                        <TableCell align="center">{row.nombresupervisor}</TableCell>
                                        <TableCell align="center">{formatFecha(row.fechagrabo)}</TableCell>
                                        <TableCell align="center">{row.estado}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    {/* Paginación */}
                    <Box sx={{ display: "flex", justifyContent: "flex-start", padding: "16px 0px" }}>
                        <TablePagination
                            sx={{borderRadius: "10px"}}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="Filas por página"
                            labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
                        />
                    </Box>
                </TableContainer>
            </div>

            {/* Modal de creación */}
            <CustomModal open={openModal} onClose={() => { getContract(); setOpenModal(false);}} title={title}>
                <GroupModal onSuccess={()=>{ getContract(); setOpenModal(false)}} data={selectedRow}/>
            </CustomModal>
            {/* Modal de agregar miembros */}
            <CustomModal open={openModalMembers} onClose={() => { getContract(); setOpenModalMembers(false);}} title={titleMembers}>
                <UserGroupModal onSuccess={()=>{ getContract(); setOpenModalMembers(false)}} data={selectedRow}/>
            </CustomModal>
        </>
    );
};

export default InventoryContractsPage;