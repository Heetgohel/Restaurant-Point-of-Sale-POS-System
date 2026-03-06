# 🍽️ Restaurant Point of Sale (POS) System

A full-stack **Restaurant POS System** built to manage real-time orders, billing, menu items, table management, and kitchen operations — across three dedicated React interfaces powered by a shared Node.js + MongoDB backend.

---

## 🎯 Overview

The system is split into three separate frontends, each serving a distinct role in the restaurant workflow:

| Interface | Role | Port |
|---|---|---|
| `restaurant-frontend` | Customer/Waiter — browse menu, place orders, view bill | `3000` |
| `restaurant-frontend-admin` | Admin — manage menu, tables, and view orders | `3001` |
| `restaurant-frontend-kitchen` | Kitchen Staff — view and update live order statuses | `3002` |

All three connect to a single Express REST API backed by MongoDB.

---

## 🗂️ Project Structure

```
Restaurant-Point-of-Sale-POS-System/
│
├── restaurant-backend/                        # Node.js + Express REST API
│   ├── models/
│   │   ├── Category.js                        # Category schema (name, icon, sortOrder, isVisible)
│   │   ├── MenuItem.js                        # Menu item schema (name, price, category, jainAvailable)
│   │   ├── Order.js                           # Order schema (tableNumber, items[], per-item status)
│   │   ├── OrderHistory.js                    # Completed order history (bill snapshot on checkout)
│   │   └── Table.js                           # Table schema (number, active/inactive status)
│   ├── routes/
│   │   ├── menuRoutes.js                      # CRUD for menu items + availability toggle
│   │   ├── categoryRoutes.js                  # CRUD for categories
│   │   ├── orderRoutes.js                     # Place orders, status updates, bill, clear table
│   │   ├── orderHistoryRoutes.js              # Save & retrieve completed order history
│   │   ├── tableRoutes.js                     # Add/delete/activate/deactivate tables
│   │   └── stats.js                           # Dashboard stats (revenue, most-sold items)
│   ├── index.js                               # App entry point, MongoDB connection, route mounting
│   └── package.json
│
├── restaurant-frontend/                       # Customer / Waiter Interface (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TableEntery.jsx                # Manual table number entry (dev/testing)
│   │   │   ├── Start.jsx                      # QR code landing — reads ?table= param, sets session
│   │   │   ├── Menu.jsx                       # Menu browser with category filter + floating cart
│   │   │   ├── Cart.jsx                       # Cart review + quantity controls + order placement
│   │   │   ├── Bill.jsx                       # Full order history with per-item status + total
│   │   │   ├── OrderSuccess.jsx               # Order confirmation screen
│   │   │   └── OrderHistory.jsx               # Item summary for current table session
│   │   ├── components/
│   │   │   ├── MenuItemCard.jsx               # Individual menu item display card
│   │   │   └── Button.jsx                     # Reusable button component
│   │   ├── styles/                            # CSS per page (menu, cart, bill, orderHistory)
│   │   └── api.js                             # Axios instance (baseURL config)
│   └── package.json
│
├── restaurant-frontend-admin/                 # Admin Dashboard (React)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Menu.jsx                       # View, add, edit, delete menu items + toggle availability
│   │   │   ├── OrdersByTable.jsx              # Live view of pending orders grouped by table
│   │   │   ├── TableList.jsx                  # View all tables with status
│   │   │   ├── TableManagMent.jsx             # Add/delete tables, toggle active/inactive
│   │   │   └── Dashboard.jsx                  # Sales stats (currently uses mock data)
│   │   ├── components/
│   │   │   ├── Layout.jsx                     # Sidebar + navigation wrapper
│   │   │   ├── MenuItemCard.jsx               # Admin menu card with edit/delete actions
│   │   │   ├── AddCategoryModal.jsx           # Modal to add a new category
│   │   │   └── EditMenuItemModal.jsx          # Modal to edit an existing menu item
│   │   ├── styles/                            # CSS per page
│   │   └── api.js                             # Axios instance (baseURL config)
│   └── package.json
│
├── restaurant-frontend-kitchen/               # Kitchen Display (React)
│   ├── src/
│   │   ├── pages/
│   │   │   └── KitchenView.jsx                # Live feed of pending/preparing items with status controls
│   │   ├── styles/
│   │   │   └── kitchen.css
│   │   └── api.js                             # Axios instance (baseURL config)
│   └── package.json
│
├── frontend(old)/                             # Archived Vite + React prototype (unused)
│
├── menuItems.json                             # Sample menu data for DB seeding
├── restaurantDB.menuitems.json                # MongoDB collection export
├── tables.json                                # Sample table data for DB seeding
├── .gitignore
└── README.md
```

---

## ✨ Features

### 🛒 Customer / Waiter Interface
- Session starts via **QR code scan** (`/start?table=X`) or manual table entry
- Browse full menu filtered by category
- Add items to cart with quantity controls (stored in `localStorage`)
- Place orders — sent to backend and pushed to kitchen in real time
- View live **bill** with per-item status (pending / preparing / served / cancelled)

### 🧑‍💼 Admin Panel
- Add, edit, delete menu items with price, category, description, image, and Jain option
- Toggle item availability on/off
- Manage categories (add, delete, reorder)
- Add/delete tables and toggle them active or inactive
- View all **pending orders grouped by table** in real time

### 👨‍🍳 Kitchen Display
- Live feed of all **pending** and **preparing** items across all tables
- Filter items by category
- Update each item's status: `pending → preparing → served` or `cancelled`
- Auto-polls every **5 seconds** for new orders

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Axios, React Icons |
| Backend | Node.js, Express 5, Mongoose 8 |
| Database | MongoDB |
| Dev Tools | Nodemon, dotenv |
| Image Storage | Firebase (Admin SDK — used in admin frontend) |
| Build Tool | Create React App (all three frontends) |

---

## ⚙️ Order Item Status Flow

```
pending  →  preparing  →  served
                       ↘  cancelled
```

Each item in an order carries its own independent status, updated live by kitchen staff.

---

## 🚀 Run Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Heetgohel/Restaurant-Point-of-Sale-POS-System.git
cd Restaurant-Point-of-Sale-POS-System
```

### 2. Configure & Start the Backend
```bash
cd restaurant-backend
npm install
```

Create a `.env` file inside `restaurant-backend/`:
```env
MONGO_URI=mongodb://localhost:27017/restaurantDB
PORT=5000
```

```bash
npm run dev      # development (nodemon)
# or
npm start        # production
```

> Backend runs at `http://localhost:5000`

---

### 3. Seed the Database *(optional)*
```bash
mongoimport --db restaurantDB --collection menuitems --file menuItems.json --jsonArray
mongoimport --db restaurantDB --collection tables --file tables.json --jsonArray
```

---

### 4. Configure API URLs in Each Frontend

Before starting any frontend, open its `src/api.js` and set the `baseURL` to your running backend:

```js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

---

### 5. Start All Three Frontends

Run each in a separate terminal:

```bash
# Terminal 1 — Customer Interface
cd restaurant-frontend
npm install && npm start        # → http://localhost:3000

# Terminal 2 — Admin Panel
cd restaurant-frontend-admin
npm install && npm start        # → http://localhost:3001

# Terminal 3 — Kitchen Display
cd restaurant-frontend-kitchen
npm install && npm start        # → http://localhost:3002
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu/available` | Get only available items |
| POST | `/api/menu` | Add a menu item |
| PUT | `/api/menu/:id` | Update a menu item |
| PATCH | `/api/menu/:id/availability` | Toggle availability |
| DELETE | `/api/menu/:id` | Delete a menu item |
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Add a category |
| DELETE | `/api/categories/:id` | Delete a category |
| POST | `/api/orders/place` | Place a new order |
| GET | `/api/orders/by-table` | Get pending orders grouped by table |
| GET | `/api/orders/pending-preparing-items` | Get live kitchen feed |
| PATCH | `/api/orders/update-status` | Update a single item's status |
| GET | `/api/orders/details/:tableNumber` | Get full bill for a table |
| DELETE | `/api/orders/clear/:tableNumber` | Clear orders after billing |
| GET | `/api/tables/all` | Get all tables |
| POST | `/api/tables/add` | Add a new table |
| PATCH | `/api/tables/:id` | Toggle table active/inactive |
| DELETE | `/api/tables/:id` | Delete a table |
| GET | `/api/stats/dashboard` | Revenue & most-sold items |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
