# Blog Application REST API 🚀

Blog Application REST API is a **Node.js + Express + Sequelize** REST API for a blog management application with three access levels: **Guest, User, and Admin**.

The API provides authentication, user management, blog CRUD operations, role-based authorization, validation, account activation/deactivation, and public blog search and filtering.

---

## 🎯 Purpose

The API is designed to demonstrate a complete role-based blog management system with:

* User registration and JWT-based authentication
* Secure password hashing with bcrypt
* Role-based access control for Guest, User, and Admin
* User profile and password management
* Admin user management and account activation/deactivation
* Blog creation, reading, updating, and deletion
* Blog ownership-based authorization
* Public blog search and category filtering
* Centralized error handling and input validation
* MySQL database persistence using Sequelize

---

## 🔗 API Under Test

* **Base URL:** `http://localhost:5000`
* **API Base Path:** `/api`

### 📚 API Documentation

A complete written API reference is available in:

`docs/API.md`

The Postman collection is available in the repository:

`postman/Blog-API.postman_collection.json`

The Postman environment is available in:

`postman/Blog-API.postman_environment.json`

To generate a public Postman documentation URL:

**Postman → Open Collection → View documentation → Publish**

Then add the generated documentation URL to this section.

---

## ✅ What Gets Tested

1. Register a new user through the public registration endpoint
2. Log in with valid credentials and receive a JWT
3. Use the JWT to access protected user and blog endpoints
4. Allow users to view and update their own profile
5. Allow users to create and manage their own blogs
6. Prevent users from modifying another user's blogs
7. Allow admins to manage users and all blogs
8. Activate or deactivate user accounts through admin controls
9. Prevent deactivated users from logging in
10. Search public blogs by partial title
11. Filter public blogs by category
12. Combine title search and category filtering

---

## ✨ Features

* **JWT Authentication** — Secure token-based authentication with 1-day token expiration
* **Role-Based Authorization** — Separate permissions for Guest, User, and Admin
* **Secure Password Storage** — Passwords are hashed using bcrypt
* **Blog Ownership Protection** — Users can only update or delete their own blogs
* **Admin Privileges** — Admins can manage users and any blog
* **Account Status Management** — Admins can activate or deactivate user accounts
* **Public Blog Search** — Search blogs using partial title matching
* **Category Filtering** — Filter blogs by category
* **Combined Filtering** — Search by title and category simultaneously
* **Centralized Error Handling** — Consistent API error responses
* **Environment-Based Configuration** — Database credentials and JWT secret are kept outside the repository
* **Postman Collection** — Ready-to-use API requests and environment configuration

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* Sequelize
* MySQL
* mysql2
* JSON Web Token (`jsonwebtoken`)
* bcrypt
* ES Modules

---

## 📦 NPM Packages Used

* `express`
* `sequelize`
* `mysql2`
* `jsonwebtoken`
* `bcrypt`
* `dotenv`

---

## 📁 Project Structure

```text
.
├── app.js                         # Express app, JSON parser, and route mounting
├── server.js                      # Database connection, sync, and server startup
│
├── config/
│   └── db.js                      # Sequelize database configuration
│
├── models/
│   ├── User.js                    # User model
│   ├── Blog.js                    # Blog model
│   └── associations               # Model relationships
│
├── controller/
│   ├── authController.js          # Authentication handlers
│   ├── userController.js          # User management handlers
│   └── blogController.js          # Blog CRUD handlers
│
├── services/
│   ├── authService.js             # Authentication business logic
│   ├── userService.js             # User business rules
│   └── blogService.js             # Blog business rules
│
├── middlewares/
│   ├── auth.js                    # JWT authentication and authorization
│   ├── error.js                   # Centralized error handling
│   └── idParser.js                # ID validation/parsing
│
├── routes/
│   ├── auth.js                    # /api/auth routes
│   ├── users.js                   # /api/users routes
│   └── blogs.js                   # /api/blogs routes
│
├── scripts/
│   └── seed-admin.js              # Create or update admin account
│
├── docs/
│   └── API.md                     # Detailed API reference
│
├── postman/
│   ├── Blog-API.postman_collection.json
│   └── Blog-API.postman_environment.json
│
├── .env.example                   # Environment variable template
├── .gitignore
└── package.json
```

> Adjust the individual filenames under `controller/`, `services/`, and `models/` if your actual repository uses different filenames.

---

## ⚙️ Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Create the MySQL database

Make sure MySQL is installed and running, then create the database:

```sql
CREATE DATABASE blogdb;
```

### 3. Configure environment variables

Copy the environment template:

```bash
copy .env.example .env
```

Or on macOS/Linux:

```bash
cp .env.example .env
```

Configure your MySQL credentials and a strong random `SECRET_KEY`.

Example:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blogdb
DB_PORT=3306

SECRET_KEY=your_long_random_secret_key
```

### 4. Install dependencies

```bash
npm install
```

### 5. Create the admin account

```bash
npm run seed:admin
```

The seed script creates or updates an active admin account:

| Field    | Value               |
| -------- | ------------------- |
| Email    | `admin@example.com` |
| Password | `password123`       |
| Role     | `admin`             |
| Status   | Active              |

> For a real deployment, change the default admin password immediately and use a strong secret.

### 6. Start the development server

```bash
npm run dev
```

The API will be available at:

`http://localhost:5000`

---

## ▶️ Scripts

```bash
npm install             # Install dependencies
npm run seed:admin      # Create/update the admin account
npm run dev             # Start the development server
```

---

## 🔐 Authentication

Protected endpoints require a valid JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

### Login Flow

1. Register using:

```http
POST /api/auth/register
```

2. Login using:

```http
POST /api/auth/login
```

3. Copy the returned JWT.

4. Include the token when accessing protected endpoints:

```http
Authorization: Bearer <token>
```

Tokens expire after **1 day**.

Deactivated users cannot log in, and existing tokens stop working once the associated account is deactivated.

---

## 👥 Access Levels

The API supports three access levels:

| Role      | Description                                   |
| --------- | --------------------------------------------- |
| **Guest** | Can register, log in, and access public blogs |
| **User**  | Can manage their own profile and blogs        |
| **Admin** | Can manage users and all blogs                |

---

## 📌 API Endpoints

| #  | Method | Endpoint                    | Access     | Purpose                    |
| -- | ------ | --------------------------- | ---------- | -------------------------- |
| 1  | POST   | `/api/auth/register`        | Public     | Register a new user        |
| 2  | POST   | `/api/auth/login`           | Public     | Login and receive a JWT    |
| 3  | GET    | `/api/users`                | Admin      | Get all users              |
| 4  | GET    | `/api/users/:id`            | Admin      | Get a specific user        |
| 5  | PATCH  | `/api/users/:id/status`     | Admin      | Activate/deactivate a user |
| 6  | GET    | `/api/users/profile`        | User/Admin | Get own profile            |
| 7  | PUT    | `/api/users/profile/update` | User/Admin | Update own profile         |
| 8  | PATCH  | `/api/users/password`       | User/Admin | Update own password        |
| 9  | POST   | `/api/blogs/create`         | User/Admin | Create a blog              |
| 10 | GET    | `/api/blogs`                | Public     | List/search/filter blogs   |
| 11 | GET    | `/api/blogs/:id`            | Public     | Get a specific blog        |
| 12 | PUT    | `/api/blogs/update/:id`     | User/Admin | Update a blog              |
| 13 | DELETE | `/api/blogs/delete/:id`     | User/Admin | Delete a blog              |
| 14 | DELETE | `/api/blogs/:id`            | User/Admin | Alternative delete route   |

---

## 🔎 Blog Search & Filtering

The blog listing endpoint is publicly accessible.

### Get all blogs

```http
GET /api/blogs
```

### Search by title

```http
GET /api/blogs?title=playwright
```

The title search supports **partial matching**.

### Filter by category

```http
GET /api/blogs?category=Testing
```

### Search and filter together

```http
GET /api/blogs?title=playwright&category=Testing
```

Guests do not need authentication to use any of these endpoints.

---

## 🔒 Authorization Matrix

| Action                     | Guest | User | Admin |
| -------------------------- | :---: | :--: | :---: |
| Register / Login           |   ✅   |   ✅  |   ✅   |
| View blogs                 |   ✅   |   ✅  |   ✅   |
| Search / Filter blogs      |   ✅   |   ✅  |   ✅   |
| Create blog                |   ❌   |   ✅  |   ✅   |
| Update own blog            |   ❌   |   ✅  |   ✅   |
| Delete own blog            |   ❌   |   ✅  |   ✅   |
| Update another user's blog |   ❌   |   ❌  |   ✅   |
| Delete another user's blog |   ❌   |   ❌  |   ✅   |
| View own profile           |   ❌   |   ✅  |   ✅   |
| Update own profile         |   ❌   |   ✅  |   ✅   |
| Change own password        |   ❌   |   ✅  |   ✅   |
| List users                 |   ❌   |   ❌  |   ✅   |
| Get specific user          |   ❌   |   ❌  |   ✅   |
| Activate/deactivate user   |   ❌   |   ❌  |   ✅   |

---

## 📊 HTTP Status Codes

| Code  | Meaning                                  |
| ----- | ---------------------------------------- |
| `200` | Successful read, update, or delete       |
| `201` | Successful registration or blog creation |
| `400` | Invalid input                            |
| `401` | Missing/invalid token or bad credentials |
| `403` | Authenticated but not authorized         |
| `404` | User, blog, or route not found           |
| `409` | Duplicate email                          |
| `500` | Unexpected server error                  |

### Example Forbidden Response

```json
{
  "message": "You are not authorized to update this blog."
}
```

---

## 🛡️ Security

The API includes several security and authorization controls:

* Passwords are hashed with **bcrypt** before being stored.
* Password hashes are never returned through API responses.
* JWTs are required for protected endpoints.
* Blog `userId` is taken from the authenticated JWT rather than the request body.
* Users cannot register themselves as `admin`.
* Registration cannot set `role` or `isActive`.
* Profile updates cannot modify `role`, `isActive`, `password`, or `id`.
* Users cannot modify or delete blogs owned by another user.
* Admin authorization is required for user-management operations.
* Deactivated users cannot authenticate.
* Existing authentication tokens become invalid when the associated account is deactivated.
* Sensitive configuration values are stored in `.env`.

---

## 📮 Postman Collection

The project includes a complete Postman collection for testing the API.

### Import the collection

```text
postman/Blog-API.postman_collection.json
```

### Import the environment

```text
postman/Blog-API.postman_environment.json
```

The default environment contains:

```text
baseUrl = http://localhost:5000
```

The Postman requests automatically store important values such as:

* JWT token
* User IDs
* Blog IDs

This makes it possible to execute the API workflow without manually copying IDs between requests.

---

## 🧪 Suggested API Test Flow

A typical end-to-end API test flow is:

```text
Register User
     ↓
Login
     ↓
Receive JWT
     ↓
View Profile
     ↓
Update Profile
     ↓
Create Blog
     ↓
View Blog
     ↓
Update Own Blog
     ↓
Attempt Unauthorized Update
     ↓
Delete Own Blog
     ↓
Admin Login
     ↓
Manage Users
     ↓
Activate / Deactivate User
```

This flow can be executed through the included Postman collection.

---

## 📝 Notes

* The API runs on port `5000` by default.
* MySQL must be running before starting the server.
* The database name used by default is `blogdb`.
* `npm run seed:admin` creates or updates the admin account.
* The default development admin credentials should not be used in production.
* `.env` and `node_modules` are excluded through `.gitignore`.
* The detailed request/response documentation is available in `docs/API.md`.
* The Postman collection can be used for manual API verification and regression testing.

---

## ✍️ Author

**Your Name**

GitHub: `https://github.com/<your-username>`
