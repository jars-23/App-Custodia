import React, { useState, useEffect } from "react";
import { BACKEND_URL } from '../../../config';
import {
    Button, CircularProgress, Typography, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputLabel,
    MenuItem, Select, Paper, Box, TablePagination, IconButton 
} from "@mui/material";
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { formatFecha } from "../../../utils/utils";
import { useAlert } from "../../../components/Alert/AlertContext";

const UserGroupModal = ({ data }) => {

    // #region Environment    
    const [loading, setLoading] = useState(false);
    const {showAlert} = useAlert();
    const [user, setUser] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);  
    const [formData, setFormData] = useState({
        id: 0,
        idgrupo: 0,
        idfuncionario: 0,
        estado: "",
        idusuario: 0,
        usuario: "",
        fechagrabo: "",
    });

    //#region Methods-Get

    const getFuncionarios = async (userData = null) => {
        const obj = {
            id: 0,
            nombres: "",
            apellidos: "",
            foto: "",
            image: null,
            imagePreview: null,
            email: "",
            idrol: 0,
            telefono: "",
            celular: "",
            login: "",
            pass: "",
            fechaexpiracion: "2025-04-03T16:58:55.735Z",
            aut_remota: "",
            habilitado: "",
            horainicial: "",
            horafinal: "",
            sesion_activa: "",
            numero_sesiones: 0,
            idtema: 0,
            idtipomenu: 0,
            idusuario: 0,
            usuario: "",
            fechagrabo: "2025-04-03T16:58:55.735Z",
            idcliente: 0,
            direccioncliente: "",
            ldap: "",
            firmap12llave: "",
            firmap12filtro: ""
        };
    
        try {
            const response = await fetch(`${BACKEND_URL}Administracion/FuncionarioObtener`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
    
            const data = await response.json();
    
            if (Array.isArray(data.objetos)) {
                const sortedData = [...data.objetos].sort((a, b) => a.id - b.id);
                setUser(sortedData);

                if (userData !== null) {
                    await getUserGroup(userData);
                }

            } else {
                console.error("Error: data.objetos no es un array.");
                setUser([]);
            }
    
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setUser([]);
        }
    };
    
    const getUserGroup = async (dataSource = null, idgrupo = 0) => {

        const obj = {
            idgrupo: 0,
            estado: "SI",
            usuario: "custodia-adm"
        }

        fetch(`${BACKEND_URL}Configuracion/UsuariosGruposObtener`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.objetos)) {

                    if(idgrupo === 0){

                        const sortedData = [...data.objetos].filter((item) => item.idgrupo === dataSource.id && item.estado === "SI").sort((a, b) => a.id - b.id);
                        setRows(sortedData);

                        setFormData({
                            ...dataSource,
                            idgrupo: parseInt(dataSource.id || 0),
                            fechagrabo: dataSource.fechagrabo || new Date().toISOString(),
                        });
                    }else{
                        formData.idfuncionario = null;
                        const sortedData = [...data.objetos].filter((item) => item.idgrupo === idgrupo && item.estado === "SI").sort((a, b) => a.id - b.id);
                        setRows(sortedData);
                    }                                 

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
    const handleChange = (e) => {
        if (!e.target) return;

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value ?? ""
        }));
    };
    const handleUnlink = async (rowData) => {

        setLoading(true);

        try {
           
            const dataToSend = {
                ...rowData,
                id: rowData.id ?? 0,
                idgrupo: rowData.idgrupo ?? 0,
                idfuncionario: rowData.idfuncionario ?? 0,
                idusuario: rowData.idusuario ?? 1,
                usuario: rowData.usuario ?? "custodia-adm",
                fechagrabo: new Date().toISOString(),
                estado: "NO",
            };

            var title = "¡Desvinculación exitosa!";
            var message = "¡El funcionario ha sido desvinculado de forma exitosa!";
            
            const response = await fetch(`${BACKEND_URL}Configuracion/AgregarEditarUsuariosGrupos`, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {

                const data = await response.json();

                if (data.respuesta) {
                    showAlert({
                        type: "success",
                        title: title,
                        message: message,
                        onConfirm: () => {
                            getUserGroup(null, dataToSend.idgrupo);
                        }
                    });
                }else{
                    showAlert({
                        type: "warning",
                        title: "¡Alerta!",
                        message: data.mensaje,
                        onConfirm: () => {
                            getUserGroup(null, dataToSend.idgrupo);
                        }
                    });
                }

                

            } else {
                showAlert({
                    type: "error",
                    title: "¡Error!",
                    message: "¡Se presento un error al ejecutar este proceso!"
                });
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
        finally {
            setLoading(false);
        }

    }; 
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            const dataToSend = {
                ...formData,
                id: formData.id ?? 0,
                idgrupo: formData.idgrupo ?? 0,
                idfuncionario: formData.idfuncionario ?? 0,
                idusuario: formData.idusuario ?? 1,
                usuario: formData.usuario ?? "custodia-adm",
                fechagrabo: new Date().toISOString(),
                estado: "SI",
            };

            var title = "Vinculación exitosa!";
            var message = "¡El funcionario ha sido vinculado de forma exitosa!";

            const response = await fetch(`${BACKEND_URL}Configuracion/AgregarEditarUsuariosGrupos`, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.respuesta) {
                    showAlert({
                        type: "success",
                        title: title,
                        message: message,
                        onConfirm: () => {
                            getUserGroup(null, dataToSend.idgrupo);
                        }
                    });
                }else{
                    showAlert({
                        type: "warning",
                        title: "¡Alerta!",
                        message: data.mensaje,
                        onConfirm: () => {
                            getUserGroup(null, dataToSend.idgrupo);
                        }
                    });
                }

            } else {
                showAlert({
                    type: "error",
                    title: "¡Error!",
                    message: "¡Se presento un error al ejecutar este proceso!"
                });
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
        finally {
            setLoading(false);
        }
    };

    //#region useEffect
    useEffect(() => {
        if (data) {
            getFuncionarios(data);
        }
    }, [data]);

    //#region View
    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading}>
                    <div className="container pt-5">
                        <div className="row g-3 pt-0">
                            <Typography variant="label">Incluye los funcionarios que forman parte del grupo:</Typography>
                        </div>

                        <div className="row g-3 pt-4">
                            <div className="col-12 col-sm-6 col-md-8">
                                <FormControl variant="outlined" sx={{ width: '100%' }}>
                                    <InputLabel>Funcionario*</InputLabel>
                                    <Select
                                        name="idfuncionario"
                                        value={formData.idfuncionario || ""}
                                        onChange={handleChange}
                                        label="Funcionario*"
                                        required
                                    >
                                        {user.map((u) => (
                                            <MenuItem key={u.id} value={u.id}>
                                                {u.nombres}{' '}{u.apellidos}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div className="col-12 col-sm-6 col-md-4">
                                <Button type="submit" className="w-100 m-1" variant="contained" color="primary" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
                                    {loading ? "Vinculando..." : "Vincular"}
                                </Button>
                            </div>

                            <div className="col-lg-12">
                                <TableContainer component={Paper} sx={{ padding: 3, borderRadius: 3 }}>

                                    {/* Tabla */}
                                    <Table>
                                        <TableHead style={{ backgroundColor: "#f0f0f0" }}>
                                            <TableRow style={{ borderRadius: "10px 10px 0 0" }}>
                                                <TableCell align="center"><strong>DESVINCULAR</strong></TableCell>
                                                <TableCell align="center"><strong>ID</strong></TableCell>
                                                <TableCell align="center"><strong>FUNCIONARIO</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => (
                                                    <TableRow key={row.id} style={{ cursor: "pointer" }}>
                                                        <TableCell align="center">
                                                            <IconButton color="primary" onClick={() => handleUnlink(row)}>
                                                                <PersonRemoveAlt1Icon />
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell align="center">{row.id}</TableCell>
                                                        <TableCell align="center">{row.idfuncionario}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>

                                    {/* Paginación */}
                                    <Box sx={{ display: "flex", justifyContent: "flex-start", padding: "16px 0px" }}>
                                        <TablePagination
                                            sx={{ borderRadius: "10px" }}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={rows.length}
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

                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    );

};

export default UserGroupModal;