import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConnectionObject } from "./connection";
import { createPool } from 'mysql2';
const pool = createPool(ConnectionObject);

export default async function handler(req, res) {
    const { method } = req;
    console.log("Request method:", method);

    if (method === 'POST') {
        try {
            const { email, password } = req.body;
            console.log("Received email:", email);

            const q = `SELECT * FROM LoginDetails WHERE email="${email}";`;
            console.log("q value:", q);
            pool.query(q, async (err, result) => {
                if (err) {
                    console.error("Database query error:", err);
                    return res.status(500).json('Internal Server Error');
                }

                console.log("Query result:", result);

                if (result.length !== 0) {
                    const { password: hashed } = result[0];
                    const { username, role } = result[0];
                    const user = {
                        email: email,
                        username: username,
                        role: role
                    };
                    console.log("User found:", user);

                    const match = await bcrypt.compare(password, hashed);
                    console.log("Password match:", match);

                    if (match) {
                        const token = jwt.sign(user, secret('JWT_SECRET'), { expiresIn: '1h' });
                        console.log("JWT token generated:", token);
                        return res.status(200).json({ token: token, user: user });
                    } else {
                        console.warn("Password mismatch");
                        return res.status(401).json('Unauthorized');
                    }
                } else {
                    console.warn("No user found with the provided email");
                    return res.status(401).json('Unauthorized');
                }
            });
        } catch (error) {
            console.error("Unexpected error:", error);
            return res.status(500).json('Internal Server Error');
        }
    } else {
        console.warn("Unauthorized request method");
        return res.status(401).json('Unauthorized');
    }
}