import React, { useState, useEffect } from "react";
import { BACKEND_URL } from '../../config'; 
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
    Paper, IconButton, TablePagination, TextField, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TitleComponent from "../../components/TitleComponent";
import CustomModal from "../../components/CustomModalComponents";
import EtlModal from "../modals/parametrizacion/EtlModal";
import { formatFecha } from "../../utils/utils";

const EtlPage = () => {

    // #region Environment
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState("");
    const [filterEnabled, setFilterEnabled] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState("Agregar nueva clase de ETL");
    const [rows, setRows] = useState([]);    
    const [selectedRow, setSelectedRow] = useState(null);

    //#region Methods-Get    
    const getEtl = () => {
        const obj = {
            id: 0,
            nombre: "",
            estado: "",
            idusuario: 0,
            usuario: "",
            fechagrabo: "2025-04-03T16:58:55.735Z"
        }
        
        fetch(`${BACKEND_URL}Administracion/TipoETLObtener`, {
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
        setTitle("Editar clase de ETL");
        setSelectedRow(rowData);
        setOpenModal(true);
      };    

     // #region Methods-Varied 
    const filteredRows = rows.filter((row) => {
        
        if (!rows || rows.length === 0) return [];
        
        const searchText = search?.toLowerCase() || '';
    
        const matchesSearch = row.nombre?.toLowerCase().includes(searchText);
    
        const matchesEnabled = filterEnabled ? row.estado?.toLowerCase() === filterEnabled.toLowerCase() : true;
    
        return matchesSearch && matchesEnabled;
    }, [rows, search, filterEnabled]);

    const openModals = () => {
        setTitle("Agregar nueva clase de ETL");
        setSelectedRow([]);
        setOpenModal(true);
      };

    //#region useEffect
    useEffect(() => {
        getEtl();
      }, []);

    return (

        <>

            {/* Titulo de la page */}
            <TitleComponent firstTitle={"Parametrización"} secondTitle={"Clases de ETL"} btnTitle="Agregar" onBtnClick={() => openModals()}></TitleComponent>

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
                                <TableCell align="center"><strong>ID</strong></TableCell>
                                <TableCell align="center"><strong>CLASE DE ETL</strong></TableCell>
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
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.nombre}</TableCell>
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
            <CustomModal open={openModal} onClose={() => { getEtl(); setOpenModal(false);}} title={title}>
                <EtlModal onSuccess={()=>{ getEtl(); setOpenModal(false)}} data={selectedRow}/>
            </CustomModal>
        </>
    );
};

export default EtlPage;