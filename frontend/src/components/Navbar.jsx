import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        alert("Logged Out");

        navigate("/login");

    };

    return (

        <div>

            <Link to="/dashboard">Dashboard</Link>

            {" | "}

            <button onClick={logout}>
                Logout
            </button>

            <hr />

        </div>

    );

}

export default Navbar;