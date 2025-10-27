import UserList from "../components/user/UserList";
import UserForm from "../components/user/UserForm";
import UserView from "../components/user/UserView";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

const routeConfig = [
  { path: "/", element: <Dashboard /> },
  { path: "/users", element: <UserList /> },
  { path: "/users/create", element: <UserForm /> },
  { path: "/users/edit/:id", element: <UserForm /> },
  { path: "/users/view/:id", element: <UserView /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> }, // fallback
];

export default routeConfig;
