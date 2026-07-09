
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server Error" });
        }

        res.status(201).json({
            message: "User Registered Successfully"
        });
    });
};
const login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM user WHERE email=?";

    db.query(sql, [email], async (err, result) => {

        console.log("Request Body:", req.body);

        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server Error" });
        }

        console.log("Query Result:", result);

        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result[0];

        console.log("User:", user);   // ✅ Ab yahan sahi hai
       
const match = await bcrypt.compare(password, user.password);

        

        if (!match) {
    return res.status(401).json({ message: "Invalid Password" });
}

    const token = jwt.sign(
    {
        id: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
   );

   res.json({
    message: "Login Successful",
    token
   });
    });
};
module.exports = { register, login };