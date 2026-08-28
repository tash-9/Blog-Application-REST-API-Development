# API reference

Base URL: `http://localhost:5000`

Send JSON with `Content-Type: application/json`. Protected routes need `Authorization: Bearer <token>`.

## Auth

### POST `/api/auth/register` — Public — 201

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Email must be unique (409). Password is hashed. Role is always `user`. `role` / `isActive` in the body returns 403.

### POST `/api/auth/login` — Public — 200

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Returns `{ "message", "token", "data" }`. Invalid credentials: 401. Deactivated: 403.

Admin login uses the same path with `admin@example.com` / `password123` after `npm run seed:admin`.

## Users (admin)

All require an admin JWT.

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/users` | 200, passwords omitted |
| GET | `/api/users/:id` | 200 or 404 |
| PATCH | `/api/users/:id/status` | 200; body `{ "isActive": false }` |

## Profile (user and admin)

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/users/profile` | Own row from the token |
| PUT | `/api/users/profile/update` | `firstname`, `lastname`, `email` only |
| PATCH | `/api/users/password` | `{ "password": "newPassword123" }` |

## Blogs

### Public

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/blogs` | List with author `{ id, firstname, lastname }` |
| GET | `/api/blogs?title=playwright` | Partial title match |
| GET | `/api/blogs?category=Testing` | Exact category |
| GET | `/api/blogs?title=playwright&category=Testing` | Combined |
| GET | `/api/blogs/:id` | 404 if missing |

### Authenticated

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/blogs/create` | 201; `userId` from token |
| PUT | `/api/blogs/update/:id` | Owner or admin |
| DELETE | `/api/blogs/delete/:id` | Owner or admin; also `DELETE /api/blogs/:id` |

Owner mismatch for a normal user: 403 `{ "message": "You are not authorized to update this blog." }` (or delete).
