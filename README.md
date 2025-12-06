# POS_System

# 🍽️ POS_System | (Point of Sale) Restaurant management System 

## ⭐ Overview 
A restaurant **POS system** helps **take orders**, **manage tables**, and **generate bills** smoothly.
It tracks orders, **handles payments**, and **manages inventory** to make restaurant operations faster and easier


---

A glimpse of the clean and minimal dashboard interface — designed for clarity and productivity.

<img src="https://github.com/DigitalTrailblazer/OrganizeIt-/blob/main/frontend/src/assets/dashboard.png" alt="dashboard preview"/>

---

## Features

### 🔹Core Functionality
* Table Management System — add, update, and track tables easily.
* Add, Edit & Delete Orders — flexible order workflow.
* Billing System — auto-calculated bills with totals.
* Razorpay Integrated Payments — secure online payment gateway.
* Customer Details Management — track order owners.
* Order Status Tracking — pending, preparing, completed.
* Menu & Inventory Management — control items and availability.
* Authentication (JWT + Cookies) — secure login and access.
* Admin Dashboard — centralized control panel.

### 🔹 UI/UX Features
* Fully Responsive (Mobile + Desktop)
* Smooth Animations (Framer-Motion)
* Beautiful Toast Notifications (Notistack)
* Modern TailwindCSS UI
* Skeleton Loaders (React Query)

### 🔹 Advanced Features
Token-based secure APIs
Error-handling middleware
ESLint-managed clean code
Real-time sync using React Query

---

##  Tech Stack

###  Frontend
* React
* Redux Toolkit
* React Query
* Tailwind CSS
* Axios
* React Router DOM
* Framer Motion
* Notistack
* React Icons

###  Backend
* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcrypt
* Razorpay
* dotenv
* CORS
* cookie-parser

---

## Entity Relationship Diagram (ERD)

```
┌──────────────────────────┐          ┌──────────────────────────┐
│         TABLE             │          │         ORDER            │
├──────────────────────────┤          ├──────────────────────────┤
│ _id : ObjectId (PK)       │ 1 ───►   │ tableId : ObjectId (FK)  │
│ tableNo : Number          │          │ items : Array            │
│ seats : Number            │          │ totalPrice : Number      │
│ status : String           │          │ paymentStatus : String   │
└──────────────────────────┘          │ createdAt : Date         │
                                      └──────────────────────────┘

```

---

## 📁 Project Structure

```text
Restaurant-POS-System/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── assets/
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
└── README.md

```

##  Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/arjunpandit45/POS_System
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a .env file in the client directory

```
VITE_BACKEND_URL = http://localhost:1111

VITE_RAZORPAY_KEY_ID = razorpay_key_id
VITE_RAZORPAY_KEY_SECRET = razorpay_key_secret
```

Run the React app:

```bash
npm run dev
```

Now open [http://localhost:5173](http://localhost:5173)
Backend runs on [http://localhost:8000](http://localhost:8000)

---

## 📌 API Endpoints (Summary)

### **Auth Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | Public |
| **POST** | `/api/auth/login` | Login existing user | Public |
| **POST** | `/api/auth/logout` | Logout user |  Protected |
| **GET** | `/api/auth/` | Get current user profile |  Protected |

### **Table Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/tables` | Add a new table |  Protected |
| **GET** | `/api/tables` | Fetch all tables |  Protected |
| **PUT** | `/api/tables/:id` | Update table details |  Protected |


### **Order Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/orders` | Create a new order |  Protected |
| **GET** | `/api/orders` | Fetch all orders |  Protected |
| **GET** | `/api/orders/:id` | Get specific order details |  Protected |
| **PUT** | `/api/orders/:id` | Update order status |  Protected |

### **Payment Routes**

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/payment/create-order` | Initialize Razorpay order | Protected |
| **POST** | `/api/payment/verify-payment` | Verify payment signature | Protected |

---

##  Testing

* Tested with **Postman** for all CRUD APIs.
* Handles invalid input gracefully with appropriate status codes and messages.

---

##  Future Enhancements

* GST Billing Support
* Advanced Analytics Dashboard
* Multi-branch Restaurant Support
* Kitchen Order Ticket (KOT) Printer Integration
* Offline Mode (PWA)
* Staff Roles & Permissions

---

##  Contributing

Contributions are always welcome!
Fork the repo, make changes, and open a PR.

---

## 🧑‍💻 Author

**Arjun Pandit**
* Full Stack Developer
* [Portfolio](yourportfolio.com)
* [Linkedin](https://www.linkedin.com/in/arjun-pandit-3a8270383/)


---

## 🪪 License

Licensed under the **MIT License** — feel free to use & modify.

---
