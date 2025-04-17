import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from '../config'; 
import { Card, CardContent, TextField, InputAdornment, Button, Typography, Box } from "@mui/material";
import { FaUser, FaLock } from "react-icons/fa";
import LoadingButton from "../components/LoadingButton";
import { useAlert } from "../components/Alert/AlertContext";

const LoginPage = () => {

  // #region Environment  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textBtn, setTextBtn] = useState("Iniciar");
  const [textLoading, setTextLoading] = useState("");
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // #region Methods-Handle
  const handleLogin = async (e) => {
    e.preventDefault();

    setTextLoading("Ingresando...");
    setLoading(true);

    const params = new URLSearchParams({
      Login: username,
      Password: password
    });

    try {

      const response = await fetch(`${BACKEND_URL}Acceso/Ingresar?${params.toString()}`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
      
        const data = await response.json();
        
        if(data.respuesta){
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
          setTextBtn("¡Bienvenido!");
          await new Promise((resolve) => setTimeout(resolve, 1000));
          localStorage.setItem("auth", "true");
          navigate("/dashboard");
          setTextBtn("Iniciar");
        }else{
          setLoading(false);
          showAlert({
            type: "error",
            title: "Credenciales incorrectas",
            message: data.mensaje,
          })
        }
        

      } else {
        setLoading(false);
        showAlert({
          type: "error",
          title: "¡Error!",
          message: "Ocurrió un error inesperado. ¡Por favor intente de nuevo más tarde!",
        })
      }

    } catch (error) {
      setLoading(false);
      alert("Ocurrió un error inesperado. Intenta de nuevo más tarde.");
    }
  };

  //#region View
  return (
    <Box sx={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw", backgroundImage: "linear-gradient(135deg, #240871, #397bb1, #0b0da3)", // 🔹 Corrección aquí
      backgroundSize: "cover", padding: 2
    }}>
      <Card sx={{ width: 500, p: 5, borderRadius: 5 }}>
        <CardContent>

          <div className="d-flex justify-content-center my-4">
            <img src={`${import.meta.env.BASE_URL}img/logo-entidad.png`}
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                width: "auto",
                height: "auto",
                objectFit: "contain"
              }} alt="Logo de Entidad" />
          </div>

          <Typography variant="h5" align="center" gutterBottom>
            Módulo de custodia
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              required
              autoComplete="off"
              label="Usuario"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              slotProps={
                {
                  input:
                  {
                    startAdornment:
                      <InputAdornment position='start'>
                        <FaUser size={18} color="#002d7c" />
                      </InputAdornment>
                  }
                }
              }
            />
            <TextField
              fullWidth
              required
              autoComplete="off"
              className="mb-4"
              type="password"
              label="Contraseña"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={
                {
                  input:
                  {
                    startAdornment:
                      <InputAdornment position='start'>
                        <FaLock size={18} color="#002d7c" />
                      </InputAdornment>
                  }
                }
              }
            />
            <LoadingButton type="submit" loading={loading} textLoading={textLoading}>
              {textBtn}
            </LoadingButton>
            <Button fullWidth variant="contained" color="secondary" type="submit">
              Recuperar credenciales
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
