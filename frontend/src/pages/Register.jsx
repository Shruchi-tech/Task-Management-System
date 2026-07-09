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
                password
            });

            alert("Registration Successful");

            navigate("/");

        } catch (err) {

            console.log(err);

            alert(err.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div>

            <h1>Register</h1>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

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
                    Register
                </button>

                <br /><br />

                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    Back to Login
                </button>

            </form>

        </div>

    );

}

export default Register;