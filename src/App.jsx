import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppWrapper from "./components/Spinner/AppWrapper";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
/* View Parametrización */
import User from "./pages/UserPage";
import Rol from "./pages/parametrizacion/RolPage";
import Group from "./pages/parametrizacion/GroupPage";
import Service from "./pages/parametrizacion/ServicesPage";
import Unit from "./pages/parametrizacion/UnitPage";
import Loans from "./pages/parametrizacion/LoansPage";
import Products from "./pages/parametrizacion/ProductsPage";
import Etl from "./pages/parametrizacion/EtlPage";
/* View Processes */
import InventoryContracts from "./pages/processes/InventoryContractsPage";
// import InventoryContracts from "./pages/parametrizacion/InventoryContractsPage";

function App() {

  return (
      <AppWrapper>
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/*View Parametrización*/}
              <Route path="/user" element={<User />} />
              <Route path="/rol" element={<Rol />} />
              <Route path="/group" element={<Group />} />
              <Route path="/services" element={<Service />} />
              <Route path="/unit" element={<Unit />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/products" element={<Products />} />
              <Route path="/etl" element={<Etl />} />
              {/*View Processes*/}
              <Route path="/inventorycontracts" element={<InventoryContracts />} />
            </Route>
          </Route>
        </Routes>
      </AppWrapper>
  );
}

export default App;

