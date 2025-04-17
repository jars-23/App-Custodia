import React, { useState, useEffect } from "react";
import { BACKEND_URL } from '../../../config';
import {
    Button, CircularProgress, TextField, FormControl, FormLabel, FormControlLabel, Switch
} from "@mui/material";
import { useAlert } from "../../../components/Alert/AlertContext";

const GroupModal = ({ onSuccess, data }) => {

    // #region Environment    
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        id: 0,
        nombre: "",
        estado: "",
        idusuario: 0,
        usuario: "",
        fechagrabo: "",
    });

    // #region Methods-Handle
    const handleChange = (e) => {
        if (!e.target) return;

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value ?? ""
        }));
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {

            var title = formData.id > 0 ? "¡Actualización exitosa!" : "¡Registro exitoso!";
            var message = formData.id > 0 ? "¡El grupo ha sido editado de forma correcta!" : "¡El grupo se ha registrado de forma correcta!";
            
            const dataToSend = {
                ...formData,
                id: formData.id ?? 0,
                idusuario: formData.idusuario ?? 1,
                usuario: formData.usuario ?? "custodia-adm",
                fechagrabo: new Date().toISOString(),
                estado: formData.estado ?? "NO",
            };

            const response = await fetch(`${BACKEND_URL}Administracion/AgregarEditarGrupos`, {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const data = await response.json(); 

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
            setFormData({
                ...data,
                fechagrabo: data.fechagrabo || new Date().toISOString(),
            });
        }
    }, [data]);

    //#region View
    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset disabled={loading}>
                    <div className="container pt-5">
                        <div className="row g-3">
                            <div className="col-12 col-sm-6 col-md-4">
                                <TextField fullWidth label="Id" value={formData.id || 0} name="id" disabled onChange={handleChange} type="number" />
                            </div>
                        </div>

                        <div className="row g-3 pt-4">
                        <div className="col-12 col-sm-6 col-md-8">
                                <TextField fullWidth label="Nombre del grupo" value={formData.nombre || ""} name="nombre" required onChange={handleChange} />
                            </div>
                            <div className="col-12 col-sm-6 col-md-4">

                                <div className="custom-container">
                                    <span className="floating-label">Estado</span>
                                    <div className="content content-padding d-flex justify-content-center align-items-center ">
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={formData.estado === "SI"}
                                                    onChange={(e) =>
                                                        setFormData({
                                                            ...formData,
                                                            estado: e.target.checked ? "SI" : "NO",
                                                        })
                                                    }
                                                    name="habilitado"
                                                    color="primary"
                                                />
                                            }
                                            label={formData.estado === "SI" ? "Habilitado" : "Deshabilitado"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="row d-flex justify-content-center mt-4">
                            <div className="col-md-3">
                            <Button type="submit" className="w-100" variant="contained" color="primary" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
                                {loading ? "Guardando..." : "Guardar"}
                            </Button>
                            </div> 
                        </div>
                    </div>
                </fieldset>
            </form>
        </>
    );

};

export default GroupModal;