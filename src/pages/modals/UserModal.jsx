import React, { useEffect, useState } from "react";
import DatePicker from '../../components/DatePickerComponent';
import { BACKEND_URL } from '../../config'; 
import {
    Modal, Box, Typography, Button, CircularProgress, TextField,
    FormControl, InputLabel, Select, MenuItem,
    FormLabel, FormControlLabel, Switch , Avatar
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../components/Alert/AlertContext";

const UserModal = ({ onSuccess, data }) => {

    // #region Environment
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
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
        firmap12filtro: "",
    });

    //#region Methods-Get
    const getRol = async (userData) => {
        const obj = {
            id: 0,
            nombre: "",
            estado: "",
            idusuario: 0,
            usuario: "",
            fechagrabo: "2025-04-03T16:58:55.735Z"
        };
    
        fetch(`${BACKEND_URL}Administracion/RolObtener`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(res => res.json())
            .then(resData => {
                if (Array.isArray(resData.objetos)) {
                    const sortedData = [...resData.objetos].sort((a, b) => a.id - b.id);
                    setRoles(sortedData);
    
                    setFormData({
                        ...userData,
                        idrol: parseInt(userData.idrol || 0),
                        fechagrabo: userData.fechagrabo || new Date().toISOString(),
                    });
    
                } else {
                    console.error("Error: data.objetos no es un array.");
                    setRoles([]);
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                setRoles([]);
            });
    };    

    // #region Methods-Handle
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({
                ...formData,
                foto:file.name,
                image: file,
                imagePreview: imageUrl
            });
        }
    };
    const handleChange = (e) => {
        if (!e.target) return;

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "idrol" ? parseInt(value) : value,
        }));
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key !== "imagenPreview") {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {

            // console.log("Formulario enviado correctamente", formData);
           // console.log("Datos a enviar:", JSON.stringify(formData, null, 2));

           var title = formData.id > 0 ? "¡Actualización exitosa!" : "¡Registro exitoso!";
           var message = formData.id > 0 ? "¡El funcionario ha sido editado de forma correcta!" : "¡El funcionario se ha registrado de forma correcta!";
           

            const response = await fetch(`${BACKEND_URL}Administracion/AgregarEditarFuncionarios`, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                if (formData.image) {
                    const uploadFormData = new FormData();
                    uploadFormData.append("fotoFile", formData.image);
            
                    const nombreArchivo = formData.foto;
                    const modulo = "funcionarios"; 
            
                    const imageUploadResponse = await fetch(
                      `${BACKEND_URL}Administracion/GuardarFoto?NOMBREFILE=${encodeURIComponent(nombreArchivo)}&MODULO=${encodeURIComponent(modulo)}`,
                      {
                        method: "POST",
                        mode: 'no-cors',
                        body: uploadFormData,
                      }
                    );
            
                    if (!imageUploadResponse.ok) {
                      console.error("Error al subir la imagen");
                    }
                  }
            
                  showAlert({
                    type: "success",
                    title: title,
                    message: message,
                    onConfirm: () => {
                      if (onSuccess) onSuccess();
                    }
                  });

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
            getRol(data);            
        }
    }, [data]);

    //#region View
    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading}>
                    <div className="container py-4">
                        <div className="row g-3">

                            <div className="col-12 col-sm-12 col-md-12">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 g-3">

                                        <div className="custom-container">
                                            <span className="floating-label">Foto de perfil</span>
                                            <div className="content d-flex justify-content-center align-items-center ">

                                                <input
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    id="upload-photo"
                                                    type="file"
                                                    onChange={handleImageChange}
                                                />

                                                {/* Avatar con la imagen seleccionada */}
                                                <label htmlFor="upload-photo">
                                                    <div style={{ position: "relative", display: "inline-block", cursor: "pointer" }}>
                                                        {formData.imagePreview ? (
                                                            <img
                                                                src={formData.imagePreview}
                                                                alt="Avatar Preview"
                                                                style={{
                                                                    width: 100,
                                                                    height: 100,
                                                                    borderRadius: "50%",
                                                                    objectFit: "cover",
                                                                    border: "2px solid #ccc"
                                                                }}
                                                            />
                                                        ) : (
                                                            <div style={{
                                                                width: 100,
                                                                height: 100,
                                                                borderRadius: "50%",
                                                                backgroundColor: "#ddd",
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center"
                                                            }}>
                                                                <span className="text-center span-img">
                                                                    <label>Cargar Imagen</label>
                                                                    <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ fontSize: "20px" }} />
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </label></div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-8 d-flex align-items-center ">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 g-3">
                                                <TextField fullWidth label="Nombre(s)" value={formData.nombres || ""} name="nombres" required onChange={handleChange} />
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 g-3">
                                                <TextField fullWidth label="Apellidos(s)" value={formData.apellidos || ""} name="apellidos" required onChange={handleChange} />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 g-3">
                                                <TextField fullWidth label="Correo electrónico" value={formData.email || ""} name="email" required onChange={handleChange} type="email" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4">
                                <FormControl fullWidth>
                                    <InputLabel>Rol</InputLabel>
                                    <Select
                                        name="idrol"
                                        value={formData.idrol || ""}
                                        onChange={handleChange}
                                        label="Rol"
                                    >
                                        <MenuItem value="">Seleccione un rol</MenuItem>
                                        {roles.map((rol) => (
                                            <MenuItem key={rol.id} value={rol.id}>
                                                {rol.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                                <TextField fullWidth label="Nombre de usuario (Login)" value={formData.login || ""} name="login" required onChange={handleChange} />
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                                <TextField fullWidth label="Contraseña" value={formData.pass || ""} name="pass" required onChange={handleChange} type="password" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-12">
                                <TextField fullWidth label="Dirección" value={formData.direccioncliente || ""} name="direccioncliente" required onChange={handleChange} />
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                                <TextField fullWidth label="Teléfono Fijo" value={formData.telefono || ""} name="telefono" required onChange={handleChange} type="number" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                                <TextField fullWidth label="Teléfono Móvil" value={formData.celular || ""} name="celular" required onChange={handleChange} type="number" />
                            </div>
                            {/* <div className="col-12 col-sm-6 col-md-4">
                                <FormControl fullWidth>
                                    <InputLabel>Filtrar por Entidad</InputLabel>
                                    <Select
                                        name="login"
                                        value={formData.login || ""}
                                        onChange={handleChange}
                                        label="Filtrar por Entidad"
                                    >
                                        <MenuItem value="">Todos</MenuItem>
                                        <MenuItem value="Administrador Custodia">Administrador Custodia</MenuItem>
                                        <MenuItem value="Gestor Operativo">Gestor Operativo</MenuItem>
                                        <MenuItem value="Cliente Custodia">Cliente Custodia</MenuItem>
                                    </Select>
                                </FormControl>
                            </div> */}
                            <div className="col-12 col-sm-6 col-md-4">
                                <FormControl fullWidth>
                                    <DatePicker label={"Fecha de expiración"} value={formData.fechaexpiracion || ""} name="fechaexpiracion" onChange={handleChange} />
                                </FormControl>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="custom-container">
                                    <span className="floating-label">Habilitado</span>
                                    <div className="content content-padding d-flex justify-content-center align-items-center ">
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={formData.habilitado === "SI"}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            habilitado: e.target.checked ? "SI" : "NO",
                                                        })
                                                    }
                                                    name="habilitado"
                                                    color="primary"
                                                />
                                            }
                                            label={formData.habilitado === "SI" ? "Habilitado" : "Deshabilitado"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="d-flex justify-content-end mt-3">
                            <Button type="submit" variant="contained" color="primary" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
                                {loading ? "Guardando..." : "Guardar"}
                            </Button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    );
};

export default UserModal;