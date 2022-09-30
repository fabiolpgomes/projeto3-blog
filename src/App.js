import "./App.css";

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/Profile";
import UsersPage from "./pages/UsersPage";
import ProtectRoute from "./components/ProtectRoute";

import { Toaster } from "react-hot-toast";

import { AuthContextComponent } from "./contexts/authContext";

function App() {
  return (
    <div className="App">
      <Toaster />
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProtectRoute Component={ProfilePage} />}
          />
          <Route
            path="/users/:idUser"
            element={<ProtectRoute Component={UsersPage} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
