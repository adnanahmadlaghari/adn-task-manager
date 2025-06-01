import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import { useGlobalVar } from "./GlobalContext/Global";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";

const App = () => {
  const { user } = useGlobalVar();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="/login" replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
