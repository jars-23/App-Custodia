import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { FormProvider } from "./context/FormContext";
import { AuthProvider } from "./context/AuthContext";
import AlertProvider from "./components/Alert/AlertProvider";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <BrowserRouter basename="/CustodiaApp">
          <AuthProvider>
            <FormProvider>
              <App />
            </FormProvider>
          </AuthProvider>
        </BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>,
)
