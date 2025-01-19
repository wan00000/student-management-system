import mysql2 from 'mysql2';
import { ConnectionObject } from "./connection"
const pool = mysql2.createPool(ConnectionObject);
import { verify } from 'jsonwebtoken';

export default async function handler(req, res) {
    const { method } = req;
    const { token } = req.cookies;
    console.log("Request method:", method);
    console.log("Token received:", token);

    if (method === 'POST') {
        verify(token, secret('JWT_SECRET'), async (err, user) => {
            if (err) {
                console.error("JWT verification error:", err);
                return res.status(401).json({ 'Unauthorized': err });
            }
            console.log("User verified:", user);

            if (user.role === 'student') {
                console.warn("Unauthorized access attempt by student");
                return res.status(401).json({ 'Unauthorized': 'Student' });
            } else if (user) {
                const { email } = req.body;
                console.log("Email from request body:", email);

                try {
                    const [rows, fields] = await pool.promise().query(`SELECT * FROM UserInfo WHERE email = '${email}'`);
                    console.log("Query result:", rows);

                    if (rows.length === 0) {
                        // create new user
                        const { regno, tutor, department, year, address, phone } = req.body;
                        console.log("Creating new user with data:", req.body);

                        pool.query(`INSERT INTO UserInfo (regNo,email,tutor,department,year,address,phone) VALUES("${regno}","${email}","${tutor}","${department}","${year}","${address}","${phone}")`, (err, result) => {
                            if (err) {
                                console.error("Error inserting new user:", err);
                                return res.status(500).json({ 'Error': err });
                            }
                            console.log("New user created successfully:", result);
                            res.status(200).json({ 'Success': 'New User Created', msg: result });
                        });
                    } else {
                        const { regNo, tutor, department, year, address, phone } = rows[0];
                        console.log("User already exists, returning data:", rows[0]);
                        res.status(200).json({ regNo, tutor, department, year, address, phone });
                    }
                } catch (queryError) {
                    console.error("Database query error:", queryError);
                    res.status(500).json({ 'Error': queryError });
                }
            }
        });
    } else if (method === 'GET') {
        verify(token, secret('JWT_SECRET'), async (err, user) => {
            if (err) {
                console.error("JWT verification error:", err, "\nJWT_SECRET:", secret('JWT_SECRET'));
                return res.status(401).json({ 'Unauthorized': err });
            }
            console.log("User verified:", user);

            try {
                if (user.role === 'student') {
                    const { email } = user;
                    console.log("Fetching data for student with email:", email);

                    const [rows] = await pool.promise().query(`SELECT * FROM UserInfo WHERE email = '${email}'`);
                    console.log("Query result for student:", rows);
                    res.status(200).json(rows[0]);
                } else if (user) {
                    console.log("Fetching data for all users");

                    const [rows] = await pool.promise().query(`SELECT * FROM UserInfo`);
                    console.log("Query result for all users:", rows);
                    res.status(200).json(rows[0]);
                }
            } catch (queryError) {
                console.error("Database query error:", queryError);
                res.status(500).json({ 'Error': queryError });
            }
        });
    }
}
