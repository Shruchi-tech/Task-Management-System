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
                password
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

        <div>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

                <br /><br />

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>

            </form>

        </div>

    );

}

export default Login;