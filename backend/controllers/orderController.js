// Order controller with PostgreSQL raw SQL queries
// this file is used to handle order related operations such as placing orders, verifying orders, fetching user orders and listing all orders for admin panel

import pool from "../config/db.js";
import Stripe from "stripe";

// initialize stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://yumio-frontend-7qtx.onrender.com/";

    try {
        const userId = req.body.userId || req.userId;

        // Insert new order
        const orderResult = await pool.query(
            'INSERT INTO orders (userId, items, amount, address) VALUES ($1, $2, $3, $4) RETURNING id',
            [userId, JSON.stringify(req.body.items), req.body.amount, JSON.stringify(req.body.address)]
        );

        const orderId = orderResult.rows[0].id;

        // Clear user's cart
        await pool.query('UPDATE users SET cartdata = $1::jsonb WHERE id = $2', [JSON.stringify({}), userId]);

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // amount in cents
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 2 * 100 // delivery charges amount in cents
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${orderId}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success == "true") {
            await pool.query('UPDATE orders SET payment = $1 WHERE id = $2', [true, orderId]);
            res.json({ success: true, message: "Paid Successfully" });
        } else {
            await pool.query('DELETE FROM orders WHERE id = $1', [orderId]);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE userId = $1 ORDER BY date DESC', [req.body.userId]);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders ORDER BY date DESC');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// api for updating order status for adminPanel
const updateStatus = async (req, res) => {
    try {
        await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [req.body.status, req.body.orderId]);
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
