import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
