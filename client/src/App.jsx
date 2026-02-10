import React, { useContext } from "react";
import { EthProvider } from "./contexts/EthContext";
import EthContext from "./contexts/EthContext/EthContext";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import useAuth from "./contexts/AuthContext/useAuth";
import Login from "./components/Auth/Login";
import { AlertProvider } from "./contexts/AlertContext/AlertContext";
import { useRoutes, Navigate } from "react-router-dom";
import routes from "./routes"; // Verify this import points to the correct file
import Register from "./components/Register";

window.global = window;

function AppContent() {
  const { state } = useContext(EthContext);
  const { user } = useAuth();
  
  // FIX: Added a safety check to ensure routes is an array before passing to useRoutes
  const routesArray = Array.isArray(routes) ? routes : [];
  const content = useRoutes(routesArray);

  if (state.loading) {
    return <div style={{ textAlign: "center", marginTop: "20%" }}>Loading Blockchain Data...</div>;
  }

  // Allow public access to home ('/') without login, otherwise require login
  const path = window.location.pathname || "/";
  if (!user && path !== "/") {
    return <Login />;
  }

  if (state.role === "unknown" && path !== "/") {
    return <Register />;
  }

  // Redirect logic to send doctors/patients to their specific dashboards when on root
  if (path === "/") {
    if (user && state.role === "doctor") return <Navigate to="/doctor" replace />;
    if (user && state.role === "patient") return <Navigate to="/patient" replace />;
  }

  return <div id="App">{content}</div>;
}

function App() {
  return (
    <EthProvider>
      <AuthProvider>
        <AlertProvider>
          <AppContent />
        </AlertProvider>
      </AuthProvider>
    </EthProvider>
  );
}

export default App;