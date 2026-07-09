import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");

    };

    return (

        <nav className="custom-navbar">

            <div className="navbar-content">

                <Link to="/dashboard" className="logo">

                    <i className="bi bi-check2-square"></i>

                    <span>Task Management</span>

                </Link>

                <button
                    className="logout-btn"
                    onClick={logout}
                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;