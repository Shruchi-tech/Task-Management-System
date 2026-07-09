import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);

            alert("Login Successful");

            navigate("/dashboard");
        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Invalid Email or Password");
        }
    };

    return (
        <div
            className="container-fluid vh-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "#f4f7fc" }}
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
                        className="bi bi-check2-square text-primary"
                        style={{ fontSize: "55px" }}
                    ></i>

                    <h2 className="fw-bold text-primary mt-2">
                        Task Management
                    </h2>

                    <p className="text-muted">
                        Login to manage your daily tasks
                    </p>
                </div>

                <form onSubmit={handleLogin}>
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
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100"
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Login
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-primary btn-lg w-100 mt-3"
                        onClick={() => navigate("/register")}
                    >
                        <i className="bi bi-person-plus me-2"></i>
                        Create New Account
                    </button>
                </form>

                <div className="text-center mt-4 text-muted">
                    <small>© 2026 Task Management System</small>
                </div>
            </div>
        </div>
    );
}

export default Login;