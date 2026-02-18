# YUMIO - Food Delivery Platform

**A Full-Stack Web Application for Online Food Ordering,Recipe Viewing and Delivery**

## Executive Summary

Yumio is a comprehensive, production-ready food delivery platform built with modern web technologies. The application enables users to order food items, see recipe (if we want to make ourself), make secure payments, and track their orders in real-time. The platform includes a customer-facing frontend application, an admin management panel, and a robust backend. This project demonstrates enterprise-level software development practices including secure authentication, payment processing, database management, and cloud deployment.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture & System Design](#architecture--system-design)
4. [Key Features](#key-features)
5. [Module Descriptions](#module-descriptions)
6. [Authentication & Security](#authentication--security)
7. [Payment Integration](#payment-integration)
8. [Database Schema](#database-schema)
9. [API Endpoints](#api-endpoints)
10. [Deployment & Hosting](#deployment--hosting)
11. [Installation & Setup](#installation--setup)
12. [Project Structure](#project-structure)
13. [Conclusion](#conclusion)

---

## Project Overview

### Purpose

Yumio addresses the growing demand for convenient online food delivery services. The platform provides:
- **For Customers**: Easy-to-use interface to browse, select, and order food with secure payment options
- **For Administrators**: Comprehensive management dashboard to manage inventory, track orders, and monitor business metrics
- **For Business**: Scalable architecture supporting high traffic and real-time operations

### Live Deployment

- **Frontend**   : https://yumio-frontend-7qtx.onrender.com/ (deployed on Render)
- **Admin Panel**: https://yumio-admin-wd3p.onrender.com/ (deployed on Render)
- **Backend**    : https://yumio-backend-x187.onrender.com/ (deployed on Render)

### Project Duration

- **Started**: Dec 2025
- **Conversion to PostgreSQL**: Feb 2026
- **Deployment**: Feb 2026

---

## Tech Stack

### Frontend (Customer Application)

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI library for building interactive user interfaces |
| **React Router DOM** | 7.11.0 | Client-side routing and navigation |
| **Axios** | 1.13.4 | HTTP client for API communication |
| **Vite** | 7.2.4 | Modern frontend build tool and dev server |
| **CSS3** | Latest | Styling and responsive design |

### Admin Panel

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI framework for admin interface |
| **React Router DOM** | 7.12.0 | Page routing and navigation |
| **Axios** | 1.13.2 | API requests to backend |
| **React Toastify** | 11.0.5 | User notifications and alerts |
| **Vite** | 7.2.5 | Build and development server |

### Backend API

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest LTS | Runtime environment |
| **Express.js** | 5.2.1 | Web framework and routing |
| **PostgreSQL** | 15+ | Relational database |
| **pg (node-postgres)** | 8.11.3 | PostgreSQL driver for Node.js |
| **JWT (jsonwebtoken)** | 9.0.3 | Token-based authentication |
| **Bcrypt** | 6.0.0 | Password hashing and security |
| **Multer** | 2.0.2 | File upload handling |
| **Stripe** | 20.2.0 | Payment processing |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Dotenv** | 17.2.3 | Environment variable management |

### DevOps & Deployment

| Tool | Purpose |
|------|---------|
| **Render** | Cloud hosting platform for frontend, backend, and database |
| **PostgreSQL Managed Database** | Render-hosted database service |
| **Git/GitHub** | Version control and repository management |
| **npm** | Package manager |

---

## Architecture & System Design

### System Architecture Diagram

<!-- [INSERT SYSTEM ARCHITECTURE DIAGRAM HERE - Show Frontend, Admin Panel, Backend API, and Database with arrows showing data flow] -->

![yumio-architecture](https://github.com/user-attachments/assets/176cbfe7-22d4-461f-ab17-73a87dcea2db)



### Application Flow

```
Customer                    Admin                      Backend                      Database
   |                          |                            |                            |
   |-- Login/Register --------|                           |                            |
   |                          |                      (JWT Auth)                        |
   |                          |                            |                            |
   |-- Browse Foods -------> API Request ----------> Food List Query ----------> PostgreSQL
   |                          |                            |                            |
   |-- Add to Cart ---------> API Request ----------> Update Cart ----> Query ---> PostgreSQL
   |                          |                            |                            |
   |-- Place Order ---------> API Request ----------> Create Order ---> Insert --> PostgreSQL
   |                          |                            |                            |
   |-- Stripe Payment -----> Stripe API <---------- Process Payment                    |
   |                          |                            |                            |
   |                      Manage Items -------> Add/Edit/Delete Items ----------> PostgreSQL
   |                      View Orders ---------> Fetch Orders ------------> Query -> PostgreSQL
   |                      Update Status -------> Update Order Status ----> Update -> PostgreSQL
```


![flow_and_archi](https://github.com/user-attachments/assets/160935a1-1d0b-476d-bc23-55cec1a51f4c)



### Three-Tier Architecture

1. **Presentation Layer**: React frontends (customer + admin)
2. **Business Logic Layer**: Node.js/Express backend
3. **Data Layer**: PostgreSQL database

---

## Key Features

### 1. **User Authentication & Authorization**
- Secure JWT-based authentication
- Password hashing with bcrypt
- User registration and login
- Token-based session management
- Protected routes for authenticated users

### 2. **Food Browsing & Discovery**
- Dynamic food catalog with categories
- Search functionality across food items
- Food details including description, price, and recipe steps
- Category-based filtering (Salads, Rolls, Desserts, etc.)

### 3. **Shopping Cart Management**
- Add/remove items from cart
- Real-time cart updates
- Cart persistence (saved to database)
- Cart total calculation
- Delivery fee calculation

### 4. **Secure Payment Processing**
- Stripe integration for secure payments
- One-time payment processing
- Payment verification and order confirmation
- Transaction logging

### 5. **Order Management**
- Order placement with delivery details
- Order history viewing
- Real-time order status tracking
- Order confirmation emails (via system)

### 6. **Admin Dashboard**
- Food inventory management (Add/Edit/Remove)
- Order monitoring and management
- Order status updates (Food Processing → Out for Delivery → Delivered)
- Sales analytics overview
- User management interface

### 7. **Advanced Features**
- Recipe steps for each food item
- Interactive recipe modal (overlay view)
- Responsive design for mobile and desktop
- Profile management
- Delivery tracking

---

## Module Descriptions

### Frontend Application (Customer Portal)

#### Key Pages:

**1. Home Page**
- Header banner with promotional content
- Navigation menu
- Explore menu with category filters
- Featured food items display
- App download section

**2. Menu/Explore Section**
- Filter foods by category (Salad, Rolls, Desserts, Sandwich, Cake, Pure Veg, Pasta, Noodles)
- Search bar to find specific items
- Food item cards with prices and ratings
- Add to cart buttons

**3. Food Item Card**
- Food image
- Name and rating
- Short description
- Price display
- Add/Remove from cart functionality
- **View Recipe button** - Opens interactive recipe modal with cooking steps

**4. Recipe Modal**
- Z-index overlay with dark background
- Food name and cooking title
- Numbered recipe steps with visual styling
- Close button (X or click outside)
- Responsive design

**5. Cart Page**
- Itemized cart list with quantities
- Item removal functionality
- Cart total with subtotal and delivery fee
- Promo code section
- Proceed to checkout button

**6. Checkout/Place Order Page**
- Delivery address form (name, email, address, phone)
- Cart summary
- Total amount display
- Stripe payment integration
- Place order button

**7. Payment Verification Page**
- Loading spinner
- Automatic payment verification
- Redirect to My Orders on success
- Redirect to home on failure

**8. My Orders Page**
- Order history display
- Order items listing
- Order amounts and status
- Order tracking button
- Status indicators (Food Processing, Out for Delivery, Delivered)

**9. User Profile**
- Login/Register modal popup
- Profile icon with dropdown menu
- Logout functionality

#### Components:
- Navbar (with search and cart icon)
- Header
- ExploreMenu
- FoodDisplay
- FoodItem (with recipe button)
- RecipeModal
- LoginPopup
- Footer

#### Few Screenshots:

<img width="1694" height="806" alt="image" src="https://github.com/user-attachments/assets/79ec58a4-d5e9-4986-abc6-7ee1a988f06d" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1654" height="477" alt="image" src="https://github.com/user-attachments/assets/e126983c-a144-4098-9517-b37eda42d968" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1641" height="688" alt="image" src="https://github.com/user-attachments/assets/af135415-868e-4505-a53e-67e2ec17ab84" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1693" height="860" alt="image" src="https://github.com/user-attachments/assets/622f36aa-b43c-4b35-8bc5-7d5b79b43df2" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1741" height="809" alt="image" src="https://github.com/user-attachments/assets/08c8a0e3-4a52-4a11-ad4b-80a6c262201a" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1663" height="778" alt="image" src="https://github.com/user-attachments/assets/2cbb83ab-96d0-4e61-bd49-0717447b5157" />




### Admin Panel

#### Key Pages:

**1. Add Food Item**
- Input fields: Name, Description, Category
- Price input
- Image upload with preview
- **Recipe steps textarea** - Enter one step per line
- Form validation
- Success/Error notifications

**2. List/Manage Inventory**
- Table view of all food items
- Food image thumbnails
- Item details (name, category, price)
- Delete button with confirmation
- Real-time inventory sync

**3. Orders Management**
- Table of all customer orders
- Order details: Items, Customer name, Address, Phone
- Order amount and item count
- Status dropdown (Food Processing → Out for Delivery → Delivered)
- Real-time order updates

#### Admin Features:
- Responsive dashboard layout
- Sidebar navigation
- Toast notifications for actions
- Secure admin access
- Real-time data updates

---

#### Few Screenshots:

<img width="1800" height="855" alt="image" src="https://github.com/user-attachments/assets/b1c88c5b-6357-4e7b-a444-6c3c147c58c9" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1783" height="837" alt="image" src="https://github.com/user-attachments/assets/1b190196-05c1-4bf3-ae52-dc5e9afab752" />
----------------------------------------------------------------------------------------------------------------------------------
<img width="1748" height="858" alt="image" src="https://github.com/user-attachments/assets/0b89bac1-5fb6-453c-bd77-3e1ed60827fe" />




## Authentication & Security

### JWT (JSON Web Token) Implementation

#### How It Works:

```
1. User logs in with email and password
2. Backend verifies credentials against database
3. Backend generates JWT token containing user ID
4. Token is sent to frontend and stored in localStorage
5. All subsequent requests include token in Authorization header
6. Backend middleware validates token before processing request
7. Token expires based on JWT_SECRET configuration
```

#### Token Structure:
```javascript
// Payload
{
  id: user_id,
  iat: issued_at_timestamp
}

// Signed with JWT_SECRET for verification
```

### Password Security

- **Bcrypt Hashing**: Passwords are hashed using bcrypt with salt rounds = 10
- **Never Stored in Plain Text**: Only hashed passwords stored in database
- **Comparison**: During login, entered password is compared with stored hash
- **Salt Rounds**: 10 iterations ensure strong security without excessive slowdown

### Protected Routes/Endpoints

The following endpoints require valid JWT token:

**Cart Operations**:
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/get` - Retrieve user's cart

**Order Operations**:
- `POST /api/order/place` - Create new order
- `POST /api/order/userorders` - Get user's order history

**Authentication Flow**:
```
Frontend                          Backend
  |                                 |
  |-- POST /api/user/register ----> |
  |    (email, password, name)       |
  |                                  |
  |<-- JWT Token -------------------|
  |                                  |
  |-- Call Protected Endpoint -----> |
  |    (with token in headers)        |
  |                                  |
  |<-- Verified Response ------------|
```

### Security Best Practices Implemented

1. **SQL Injection Prevention**: Parameterized queries with `$1, $2` placeholders
2. **Password Hashing**: Bcrypt with 10 salt rounds
3. **JWT Tokens**: Secure token-based authentication
4. **CORS Protection**: Configured CORS to allow only authorized origins
5. **HTTPS**: All deployed services use HTTPS
6. **Environment Variables**: Sensitive data stored in `.env` file
7. **Token Expiration**: JWT tokens can be configured with expiration
8. **Secure Headers**: Express middleware for security headers

### Environment Variables Setup

```bash
# Database Configuration
DB_HOST=dpg-xxxxx.postgresql.render.com
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_secure_password
DB_NAME=yumio_database

# Authentication
JWT_SECRET=your_very_secure_secret_key_here

# Payment Processing
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxx

# Server
PORT=10000 (Render sets this automatically)
```

---

## Payment Integration

### Stripe Payment System

#### Overview

Yumio integrates with Stripe to provide secure, PCI-compliant payment processing for online food orders.

#### Screenshot:
<img width="1327" height="969" alt="image" src="https://github.com/user-attachments/assets/4b77ff6a-f890-416a-873d-4115a1c0a45c" />



#### Payment Flow

```
Customer                    Frontend                    Backend                    Stripe API
   |                           |                           |                           |
   |-- Enter Details ---------> |                           |                           |
   |                   Click "Proceed to Payment"           |                           |
   |                            |-- Order Request -------> |                           |
   |                            |  (items, amount)          |                           |
   |                            |                      Create Session --------> |
   |                            |<-- Session URL ----------|<-- Success --------|
   |                            |                                               |
   |<-- Redirect to Stripe |                                                   |
   |                            |                                               |
   |-- Enter Card Details ------|--- Stripe Hosted Page ------> Process Payment |
   |    (Stripe Page)           |                                               |
   |                            |                                               |
   |<-- Verify Page ------------|<-- Callback URL ------{ Token }              |
   |                            |                           |                   |
   |                            |-- Verify Payment --------->                   |
   |                            |    (orderId, token)        |                   |
   |                            |                        Update DB              |
   |                            |<-- Confirmation ----------|                   |
   |                                                                            |
   |<-- Order Confirmation ----|<-- Success Page ------------|                   |
```

#### Implementation Details

**1. Create Payment Session**
```javascript
// Backend creates Stripe checkout session
const session = await stripe.checkout.sessions.create({
  line_items: [
    { price_data, quantity }  // For each food item
  ],
  mode: 'payment',
  success_url: 'http://frontend/verify?success=true&orderId=123',
  cancel_url: 'http://frontend/verify?success=false&orderId=123'
});
```

**2. Order Placement with Payment**
```javascript
// Frontend sends order data
POST /api/order/place
{
  items: [
    { id, name, price, quantity }
  ],
  amount: total_amount,
  address: {
    firstName, lastName, email,
    street, city, state, zipcode, country, phone
  }
}
```

**3. Payment Verification**
```javascript
// After user completes payment, verify
POST /api/order/verify
{
  orderId: order_id,
  success: true/false
}

// Updates payment status in database
UPDATE orders SET payment = TRUE where id = orderId
```

#### Key Features

- **PCI Compliance**: Card details never touch your server - handled by Stripe
- **Secure Transactions**: HTTPS with encryption
- **Real-time Verification**: Immediate payment confirmation
- **Automatic Cart Clearing**: Cart emptied after successful payment
- **Delivery Fee**: Automatically added to order total ($2)
- **Transaction Logging**: All payments recorded in database

#### Error Handling

- Payment failures are captured and logged
- Users are redirected to appropriate pages (success vs. failure)
- Order deletion on failed payment to maintain data integrity
- User-friendly error messages via frontend notifications

#### Testing

- Use Stripe test card: `4242 4242 4242 4242`
- Any future expiration date and any CVC
- Test successful and failed payments in test mode

---

## Database Schema

### PostgreSQL Database Structure

#### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cartdata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Stores user account information and shopping cart data

**Key Fields**:
- `id`: Unique user identifier
- `email`: Used for login and unique identification
- `password`: Bcrypt-hashed password
- `cartdata`: JSONB format storing cart items and quantities
  ```json
  {
    "1": 2,      // Food item ID: quantity
    "5": 1,
    "12": 3
  }
  ```

#### Food Table
```sql
CREATE TABLE food (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    recipe JSONB DEFAULT '{"steps": []}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Stores all food items available in the catalog

**Key Fields**:
- `id`: Unique food item identifier
- `price`: Food price in decimal format (supports cents)
- `category`: Category classification (Salad, Rolls, etc.)
- `recipe`: JSONB array of cooking steps
  ```json
  {
    "steps": [
      "Wash and chop vegetables",
      "Heat oil in pan",
      "Add ingredients and cook"
    ]
  }
  ```
- `image`: Filename stored in server's uploads folder

#### Orders Table
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    items JSONB NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    address JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'Food Processing',
    payment BOOLEAN DEFAULT FALSE,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

**Purpose**: Stores all customer orders and delivery information

**Design Note**: This table uses **hybrid storage** combining relational (FK to users) and document-style (JSONB items). Items are denormalized snapshots captured at order time, which:
- Preserves historical pricing (important for accounting)
- Avoids complex joins for order queries
- Stores complete item data even if food item is later deleted
- Trade-off: No referential integrity constraints on food items

**Key Fields**:
- `userId`: Foreign key linking to users table
- `items`: JSONB array of ordered items with quantities
  ```json
  {
    "items": [
      {
        "id": 1,
        "name": "Greek Salad",
        "price": 12,
        "quantity": 2
      }
    ]
  }
  ```
- `address`: JSONB object with complete delivery address
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  }
  ```
- `status`: Current order status (Food Processing → Out for delivery → Delivered)
- `payment`: Boolean indicating payment completion
- `date`: Order timestamp for tracking

### Data Relationships

```
┌─────────────────┐                    ┌─────────────────┐
│   Users Table   │                    │  Food Table     │
├─────────────────┤                    ├─────────────────┤
│ id (PK)         │                    │ id (PK)         │
│ name            │                    │ name            │
│ email (UNIQUE)  │                    │ description     │
│ password        │                    │ price           │
│ cartdata (JSONB)│                    │ image           │
└────────┬────────┘                    │ category        │
         │ (1:Many)                    │ recipe (JSONB)  │
         │                             └─────────────────┘
         │                                      ▲
         │                            ┌─────────┘ (Indirect: via JSONB items.id)
         │                            │
┌────────▼──────────┐                 │
│   Orders Table    │                 │
├───────────────────┤                 │
│ id (PK)           │                 │
│ userId (FK) ──────┼─→ Users.id      │
│ items (JSONB) ────┼─────────────────┘
│ amount            │   (Contains food IDs and snapshots)
│ address (JSONB)   │
│ status            │
│ payment           │
│ date              │
└───────────────────┘
```

**Note on Relationships**:
- **Direct FK**: `orders.userId` → `users.id` (enforced constraint)
- **Indirect Relationship**: `orders.items[].id` references `food.id` (no FK constraint)
  - Items are stored as denormalized JSONB snapshots
  - Preserves historical pricing at time of order
  - Uses document-style storage like MongoDB
  - Trade-off: No referential integrity checks for food items

---

## API Endpoints

### Base URL

**Production**: ` https://yumio-backend-x187.onrender.com/`

### User Authentication Endpoints

#### Register User
```http
POST /api/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Food Endpoints

#### Get All Food Items
```http
GET /api/food/list

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Greek Salad",
      "description": "Fresh vegetables with feta cheese",
      "price": 12.00,
      "image": "food_1.png",
      "category": "Salad",
      "recipe": ["Step 1", "Step 2", "Step 3"]
    },
    ...
  ]
}
```

#### Add Food Item (Admin Only)
```http
POST /api/food/add
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "New Dish",
  "description": "Description here",
  "price": "15.00",
  "category": "Rolls",
  "image": [binary file],
  "recipe": ["Cook vegetables", "Add spices", "Mix well"]
}

Response:
{
  "success": true,
  "message": "Food Item Added Successfully"
}
```

#### Remove Food Item (Admin Only)
```http
POST /api/food/remove
Content-Type: application/json

{
  "id": 1
}

Response:
{
  "success": true,
  "message": "Food Removed"
}
```

### Cart Endpoints (Protected - Requires Token)

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": 1
}

Response:
{
  "success": true,
  "message": "Item added to cart"
}
```

#### Remove from Cart
```http
POST /api/cart/remove
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": 1
}

Response:
{
  "success": true,
  "message": "Item removed from cart"
}
```

#### Get Cart
```http
POST /api/cart/get
Authorization: Bearer {token}
Content-Type: application/json

Response:
{
  "success": true,
  "cartData": {
    "1": 2,
    "5": 1,
    "12": 3
  }
}
```

### Order Endpoints (Protected - Requires Token)

#### Place Order
```http
POST /api/order/place
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [
    {
      "id": 1,
      "name": "Greek Salad",
      "price": 12,
      "quantity": 2
    }
  ],
  "amount": 26,
  "address": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipcode": "10001",
    "country": "USA",
    "phone": "+1234567890"
  }
}

Response:
{
  "success": true,
  "session_url": "https://checkout.stripe.com/..."
}
```

#### Verify Payment
```http
POST /api/order/verify
Content-Type: application/json

{
  "orderId": 1,
  "success": true
}

Response:
{
  "success": true,
  "message": "Paid Successfully"
}
```

#### Get User Orders
```http
POST /api/order/userorders
Authorization: Bearer {token}
Content-Type: application/json

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "items": [...],
      "amount": 26,
      "status": "Food Processing",
      "date": "2024-02-13T10:30:00Z"
    }
  ]
}
```

#### Get All Orders (Admin Only)
```http
GET /api/order/list

Response:
{
  "success": true,
  "data": [...]
}
```

#### Update Order Status (Admin Only)
```http
POST /api/order/status
Content-Type: application/json

{
  "orderId": 1,
  "status": "Out for delivery"
}

Response:
{
  "success": true,
  "message": "Status Updated"
}
```

---

## Deployment & Hosting

### Deployment Architecture

<!-- [INSERT DEPLOYMENT DIAGRAM - Show three services on Render with GitHub integration] -->


![yumio-deployment](https://github.com/user-attachments/assets/3e194659-3bf7-4bdd-b210-b9d5f64c00ee)



### Render Deployment Setup

#### Frontend Deployment
- **Service**: Static Site 
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview` (for static) or served via Render
- **Environment**: Production Node environment

#### Admin Panel Deployment
- **Service**: Static Site
- **Build Command**: `npm run build`
- **Environment Variables**: Backend URL pointing to deployed API

#### Backend API Deployment
- **Service**: Web Service
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Port**: 10000 (Render automatically sets `process.env.PORT`)
- **Environment Variables**:
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
  - `JWT_SECRET`
  - `STRIPE_SECRET_KEY`
  - `SSL` enabled for database connections

#### PostgreSQL Database
- **Service**: Managed PostgreSQL on Render
- **Plan**: Free Plan
- **Automatic SSL**: Enabled for secure connections
- **Backups**: Regular automated backups

### GitHub Integration

```
┌─────────────┐
│   GitHub    │
│  Repository │
└──────┬──────┘
       │ (git push)
       │
       ▼
   ┌── Webhook ──┐
   │             │
   ├─────────────┼──────────────┐
   │             │              │
   ▼             ▼              ▼
Frontend     Admin Panel     Backend
(Render)      (Render)       (Render)
   │             │              │
   │ Redeploy    │ Redeploy     │ Redeploy
   └─────────────┴──────────────┘
```

### Deployment Process

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Feature: Add recipe modal"
   git push origin main
   ```

2. **Automatic Deployment Triggered**
   - Render receives webhook from GitHub
   - Pulls latest code
   - Runs build command
   - Deploys new version

3. **Health Checks**
   - Render monitors service health
   - Automatic restart on failure
   - Status dashboard for monitoring

### Database Migration to Render

To migrate local data to Render PostgreSQL:

```bash
# Export local database
pg_dump -U postgres -d yumio > yumio_backup.sql

# Restore to Render (use Render connection string)
psql [RENDER_DATABASE_URL] < yumio_backup.sql

# Or use:
pg_restore -h [host] -U [user] -d [database] yumio_backup.dump
```

### Environment Variables Configuration

**On Render Dashboard** → **Settings** → **Environment**:

```
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_secure_password
JWT_SECRET=your_very_secure_secret_key
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

---

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Git
- Stripe account (for payment processing)
- Render account (for deployment)

### Local Development Setup

#### 1. Clone Repository
```bash
git clone https://github.com/yourusername/Yumio-PostgreSQL.git
cd Yumio-PostgreSQL
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
nano .env
# Or use your editor to set:
#   DB_HOST=localhost
#   DB_PORT=5432
#   DB_USER=postgres
#   DB_PASSWORD=your_password
#   DB_NAME=yumio
#   JWT_SECRET=your_secret_key
#   STRIPE_SECRET_KEY=sk_test_xxxxx

# Start backend server
npm run server
# Server runs on http://localhost:4000
```

#### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Update StoreContext.jsx for local development
# Change the url in src/context/StoreContext.jsx to:
# const url = "http://localhost:4000";

# Start development server
npm run dev
# Access at http://localhost:5173
```

#### 4. Admin Panel Setup
```bash
cd ../admin

# Install dependencies
npm install

# Update App.jsx for local development
# Change the url in src/App.jsx to:
# const url = "http://localhost:4000";

# Start admin panel
npm run dev
# Access at http://localhost:5174
```

### Database Setup

#### Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE yumio;

# Exit
\q

# The backend will automatically create tables on first run
```

#### Add Sample Data (Optional)
```bash
# Use admin panel to add food items, or
# Restore from backup
psql -U postgres -d yumio < yumio_backup.sql
```

### Testing the Application Locally

1. **Register a new account**
   - Open frontend at http://localhost:5173
   - Click "Sign in" → "Create Account"
   - Fill in name, email, password
   - Submit

2. **Browse food items**
   - Home page displays available items
   - Click category to filter
   - Use search to find specific items

3. **Add items to cart**
   - Click "Add" button on food items
   - View recipe by clicking "👨‍🍳 View Recipe"

4. **Test payment (using Stripe test mode)**
   - Go to cart → Proceed to checkout
   - Fill in delivery address
   - Use test card: `4242 4242 4242 4242`
   - Any future date and any CVC
   - Complete payment

5. **Test admin panel**
   - Open http://localhost:5174
   - Go to "Add Items" to add food
   - Go to "List Items" to manage inventory
   - Go to "Orders" to manage orders

---

## Project Structure

```
Yumio-PostgreSQL/
│
├── frontend/                          # Customer-facing application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Navbar/
│   │   │   ├── FoodItem/
│   │   │   ├── FoodDisplay/
│   │   │   ├── RecipeModal/           # NEW: Recipe display modal
│   │   │   ├── LoginPopup/
│   │   │   ├── Footer/
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home/                  # Homepage with menu and items
│   │   │   ├── Cart/                  # Shopping cart page
│   │   │   ├── PlaceOrder/            # Checkout page
│   │   │   ├── MyOrders/              # Order history page
│   │   │   └── Verify/                # Payment verification page
│   │   ├── context/
│   │   │   └── StoreContext.jsx       # Global state management
│   │   ├── assets/
│   │   │   ├── assets.js              # Asset imports and data
│   │   │   ├── header_img.jpg
│   │   │   ├── food_*.png             # Food images
│   │   │   └── ...
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── admin/                             # Admin dashboard for management
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   └── Sidebar/
│   │   ├── pages/
│   │   │   ├── Add/                   # Add new food items (with recipes)
│   │   │   ├── List/                  # List and manage food items
│   │   │   └── Orders/                # Manage customer orders
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                           # Node.js/Express API
│   ├── config/
│   │   └── db.js                      # PostgreSQL connection & initialization
│   ├── controllers/
│   │   ├── userController.js          # Auth logic (register, login)
│   │   ├── foodController.js          # Food CRUD operations
│   │   ├── cartController.js          # Cart management
│   │   └── orderController.js         # Order & payment handling
│   ├── middleware/
│   │   └── auth.js                    # JWT authentication middleware
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── foodRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   ├── uploads/                       # Food images storage
│   ├── server.js                      # Express server entry point
│   ├── package.json
│   ├── .env.example                   # Environment variables template
│   └── .env                           # Actual env variables (gitignored)
│
└── README.md                          # This file
```

### Key Files Overview

| File | Purpose |
|------|---------|
| `frontend/src/context/StoreContext.jsx` | Global state: food list, cart, user auth |
| `backend/config/db.js` | Database connection and table initialization |
| `backend/controllers/*.js` | Business logic for each feature |
| `backend/middleware/auth.js` | JWT token validation |
| `frontend/src/components/RecipeModal/` | Recipe display component |
| `backend/.env` | Database and API credentials |

---

## Conclusion

### Project Achievements

1. **Full-Stack Application**: Successfully built customer app, admin panel, and backend API
2. **Secure Payment Processing**: Integrated Stripe for safe, PCI-compliant transactions
3. **Robust Authentication**: JWT-based secure user authentication with password hashing
4. **Modern Database**: Migrated from MongoDB to PostgreSQL with proper schema design
5. **Cloud Deployment**: Deployed all services on Render with automatic CI/CD
6. **Advanced Features**: Implemented recipe modal, order tracking, and admin controls
7. **Professional Documentation**: Comprehensive README for project understanding

### Future Enhancements

- **Email Notifications**: Send order confirmations and status updates via email
- **Real-time Notifications**: WebSocket integration for live order updates
- **Analytics Dashboard**: Visual reports on sales, popular items, and customer behavior
- **Rating & Reviews**: Allow customers to rate food and leave reviews
- **Multiple Payment Methods**: Add alternative payment options (PayPal, Apple Pay)
- **Push Notifications**: Mobile app notifications for order status
- **AI Recommendations**: Suggest items based on browsing history
- **Subscription Model**: Offer meal plans and subscriptions
- **Multi-language Support**: Internationalization for global reach

### Lessons Learned

1. **Database Migration**: Careful planning required when switching from MongoDB to PostgreSQL
2. **Environment Configuration**: Proper environment management is crucial for deployment
3. **Payment Integration**: Stripe provides excellent documentation and test infrastructure
4. **Responsive Design**: CSS and modern web standards ensure good UX across devices
5. **API Design**: RESTful architecture simplifies client-server communication
6. **Security**: JWT, bcrypt, and parameterized queries are essential for protection

### Team & Credits

**Project Duration**: 2 months  
**Technology Stack**: PERN (PostgreSQL, Express, React, Node.js)  
**Deployment Platform**: Render  


## Contributors

<a href="https://github.com/sunil0x">
  <img src="https://github.com/sunil0x.png" width="50px" style="border-radius:50%;" alt="Your Name" />
</a>
<a href="https://github.com/Shishir-129">
  <img src="https://github.com/Shishir-129.png" width="50px" style="border-radius:50%;" alt="Friend's Name" />
</a>
<a href="https://github.com/SandeepThapaChhetri">
  <img src="https://github.com/SandeepThapaChhetri.png" width="50px" style="border-radius:50%;" alt="Friend's Name" />
</a>

---

## Contact & Support

- **GitHub Repository**: https://github.com/Shishir-129/Yumio-The_Food_Delivery_App
- **Live Website frontend**: https://yumio-frontend-7qtx.onrender.com/
- **Live Website admin-panel**: https://yumio-admin-wd3p.onrender.com/
- **Live Website backend**: https://yumio-backend-x187.onrender.com/
- **Issues & Bug Reports**: Open an issue on GitHub

---

**Last Updated**: February, 2026  
**Version**: 2.0 (PostgreSQL Migration Complete)  
**Status**: Production Ready ✅
