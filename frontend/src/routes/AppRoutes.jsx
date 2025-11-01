import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import UserView from "../components/user/UserView";
import StaffList from "../components/staff/Index";
import StaffCreate from "../components/staff/Create";
import StaffView from "../components/staff/View";

import Reports from "../components/reports/Index";
import Settings from "../components/settings/Index";
// import reports from "../components/reports/Create";
// import reports from "../components/reports/View";

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
        <Route path="/users/edit/:id" element={<UserForm />} />
        <Route path="/users/view/:id" element={<UserView />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/staffs" element={<StaffList />} />
        <Route path="/staffs/create" element={<StaffCreate />} />
        <Route path="/staffs/view/:id" element={<StaffView />} />
        <Route path="/staffs/edit/:id" element={<StaffCreate />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="/settings" element={<Settings />} />
      </Route>
      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
