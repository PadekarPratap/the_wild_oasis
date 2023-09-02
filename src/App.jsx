import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Guests from "./pages/Guests";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateUser from "./pages/CreateUser";
import Account from "./pages/Account";
import ThemeProvider from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <Router>
        <ThemeProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<AppLayout />}>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/booking/:bookingId" element={<Booking />} />
                <Route path="/checkin/:bookingId" element={<Checkin />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/account" element={<Account />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
        <Toaster
          position="bottom-right"
          gutter={12}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              maxWidth: "500px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
            },
          }}
          containerStyle={{ margin: "12px" }}
        />
      </Router>
    </>
  );
};

export default App;
