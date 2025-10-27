import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import StaffList from "../components/staff/index";
import StaffCreate from "../components/staff/create";

function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Main app pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserForm />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/staff" element={<StaffList />} />
        <Route path="/staff/create" element={<StaffCreate />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
