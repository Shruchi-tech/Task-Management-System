import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await registerUser({
                name,
                email,
                password,
            });

            alert("Registration Successful");

            navigate("/");
        } catch (err) {
            console.log(err);

            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div
            className="container-fluid vh-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#2d3036" }}
        >
            <div
                className="card border-0 shadow-lg p-5"
                style={{
                    width: "430px",
                    borderRadius: "18px",
                }}
            >
                <div className="text-center mb-4">
                    <i
                        className="bi bi-person-plus-fill text-success"
                        style={{ fontSize: "55px" }}
                    ></i>

                    <h2 className="fw-bold text-success mt-2">
                        Create Account
                    </h2>

                    <p className="text-muted">
                        Register to start managing your tasks
                    </p>
                </div>

                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Full Name
                        </label>

                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success btn-lg w-100"
                    >
                        <i className="bi bi-person-check me-2"></i>
                        Register
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-primary btn-lg w-100 mt-3"
                        onClick={() => navigate("/")}
                    >
                        <i className="bi bi-arrow-left-circle me-2"></i>
                        Back to Login
                    </button>
                </form>

                <div className="text-center mt-4 text-muted">
                    <small>© 2026 Task Management System</small>
                </div>
            </div>
        </div>
    );
}

export default Register;         