// PostgreSQL connection configuration and table initialization
// this file is used to set up the connection to the PostgreSQL database and initialize the required tables for the application (users, food, orders) if they do not already exist. It also exports the connection pool for use in other parts of the application.

import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool for PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,  // default PostgreSQL port
    database: process.env.DB_NAME || 'yumio',
    ssl: process.env.DB_HOST !== 'localhost' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 10000,
});

// Test connection
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});

// Initialize database tables
export const connectDB = async () => {
    try {
        // Log connection details (without password)
        console.log("Attempting DB connection with:", {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: process.env.DB_NAME || 'yumio',
            user: process.env.DB_USER || 'postgres'
        });
        
        // Test connection
        const client = await pool.connect();
        console.log("Connected to PostgreSQL");
        client.release();

        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                cartdata JSONB DEFAULT '{}',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Users table created/verified");

        // Create food table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS food (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image VARCHAR(255) NOT NULL,  -- stores image's URL(filepath) which is fetched from backend's uploads/ directory
                category VARCHAR(255) NOT NULL,
                recipe JSONB DEFAULT '{"steps": []}',  -- stores recipe steps as JSON array
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Food table created/verified");

        // Create orders table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                userId INTEGER NOT NULL,
                items JSONB NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                address JSONB NOT NULL,
                status VARCHAR(50) DEFAULT 'Food Processing',
                payment BOOLEAN DEFAULT FALSE,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        console.log("Orders table created/verified");

        console.log("DB Connected and initialized successfully");
    } catch (error) {
        console.error("Database connection error:");
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Full error:", error);
    }
};

export default pool;