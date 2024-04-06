import { Link } from "react-router-dom";
import "../../css/Navbar.css"; // Import your CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}