import React, { useEffect } from "react";
import { BACKEND_URL } from '../config';
import {
  Typography, TextField, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import TitleComponent from "../components/TitleComponent";
import CardComponent from "../components/CardComponent";

const DashboardPage = () => {

  // #region Environment

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

  // #region Methods-Varied 

  //#region useEffect
  useEffect(() => {
  }, []);

  return (

    <>

      {/* Titulo de la page */}
      <TitleComponent firstTitle={"Inicio"} secondTitle={"Dashboard"}></TitleComponent>

      <div className="row mx-1">
        <div className="col-lg-12 card card--modify p-4">
          <Typography variant="label" align="center" style={{margin:"0px", cursor:"default"}}>
            Hola, bienvenido al módulo de custodia:
          </Typography>
        </div>

        <div className="col-lg-12 mt-4 p-0">
          <div className="row">
            <div className="col-lg-4">
              <CardComponent number={12} text={"Prestamos realizados"} type={"prestamos"}></CardComponent>
            </div>
            <div className="col-lg-4">
              <CardComponent number={12} text={"Devoluciones realizadas"} type={"devoluciones"}></CardComponent>
            </div>
            <div className="col-lg-4">
              <CardComponent number={24} text={"Procesos totales"} type={"total"}></CardComponent>
            </div>

          </div>
        </div>

      </div>


    </>
  );
};

export default DashboardPage;