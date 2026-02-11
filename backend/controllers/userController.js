// User authentication controller with PostgreSQL raw SQL queries

import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user api
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Finding user by email using raw SQL
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const user = userResult.rows[0];

        // Comparing entered password with the stored password in database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user.id); // Creating token for user (using user.id instead of user._id)
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// token is used to verify user identity and provide access to protected routes
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); // Creating token using JWT
};

// register user api
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // checking if user already exists
        const existsResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (existsResult.rows.length > 0) {
            return res.json({ success: false, message: "User already exists" });
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email !" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user with raw SQL INSERT
        const result = await pool.query(
            'INSERT INTO users (name, email, password, cartData) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, hashedPassword, JSON.stringify({})]
        );

        const userId = result.rows[0].id;
        const token = createToken(userId); // Creating token for user

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { loginUser, registerUser };