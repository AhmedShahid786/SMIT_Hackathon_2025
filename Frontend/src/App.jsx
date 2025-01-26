import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Receptionist from "./pages/Receptionist";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/receptionist" element={<Receptionist />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
