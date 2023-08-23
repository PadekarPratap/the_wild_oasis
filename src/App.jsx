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

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/guests" element={<Guests />} />
          </Route>
        </Routes>
        <Toaster
          position="top-right"
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
