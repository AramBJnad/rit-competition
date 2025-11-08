# HTTP Response Codes Reference

This document lists all HTTP response codes used in the DRN Backend API and their meanings.

## Response Codes Table

| Status Code | HTTP Status | Meaning | When It's Used | Example Response |
|------------|-------------|---------|----------------|------------------|
| **200** | OK | Request succeeded | Successful GET requests, login, logout, status check, campaign update/delete | `{ "loggedIn": true, "user": {...} }` |
| **201** | Created | Resource created successfully | User registration, campaign creation, donation creation | `{ "id": 1, "Username": "user123" }` |
| **401** | Unauthorized | Authentication required or failed | Missing session, invalid login credentials | `{ "error": "Authentication required. Please log in." }` |
| **403** | Forbidden | Access denied | Admin-only endpoints, reserved username attempts | `{ "error": "Forbidden. Administrator access required." }` |
| **404** | Not Found | Resource not found | Campaign ID doesn't exist | `{ "error": "Campaign not found." }` |
| **409** | Conflict | Resource conflict | Username already exists | `{ "error": "Username already exists." }` |
| **500** | Internal Server Error | Server error | Database errors, unexpected server errors | `{ "error": "Error message" }` |

---

## Detailed Status Code Descriptions

### 200 OK
**Usage**: Standard success response for GET requests and successful operations.

**Occurrences**:
- `GET /api/campaigns` - Returns list of campaigns
- `GET /api/donations` - Returns list of donations
- `GET /api/stats` - Returns statistics
- `POST /api/users/login` - Successful login
- `GET /api/users/status` - Session status check
- `POST /api/users/logout` - Successful logout
- `POST /api/campaigns/:id` - Successful campaign update
- `DELETE /api/campaigns/:id` - Successful campaign deletion

**Response Format**:
```json
{
  "loggedIn": true,
  "user": { "id": 1, "username": "user123", "isAdmin": false }
}
```

---

### 201 Created
**Usage**: Resource successfully created.

**Occurrences**:
- `POST /api/users/register` - New user registered
- `POST /api/campaigns` - New campaign created
- `POST /api/donations` - New donation created

**Response Format**:
```json
{
  "id": 1,
  "Username": "user123"
}
```

---

### 401 Unauthorized
**Usage**: Authentication required or authentication failed.

**Occurrences**:
- Missing session token (via `login_required` middleware)
- Invalid username or password during login
- Attempting authenticated endpoints without being logged in

**Response Format**:
```json
{
  "error": "Authentication required. Please log in."
}
```
or
```json
{
  "error": "Invalid username or password."
}
```

**Endpoints Protected**:
- `POST /api/campaigns` (requires login)
- `POST /api/donations` (requires login)
- `POST /api/campaigns/:id` (requires admin)
- `DELETE /api/campaigns/:id` (requires admin)

---

### 403 Forbidden
**Usage**: Access denied due to insufficient permissions.

**Occurrences**:
- Attempting admin-only operations without admin privileges
- Attempting to register with reserved username "admin"

**Response Format**:
```json
{
  "error": "Forbidden. Administrator access required."
}
```
or
```json
{
  "error": "The username 'admin' is reserved."
}
```

**Admin-Only Endpoints**:
- `POST /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

---

### 404 Not Found
**Usage**: Requested resource not found.

**Occurrences**:
- Campaign ID doesn't exist when updating or deleting
- Invalid resource ID in URL parameters

**Response Format**:
```json
{
  "error": "Campaign not found."
}
```

**Endpoints**:
- `POST /api/campaigns/:id` - Campaign update (if ID doesn't exist)
- `DELETE /api/campaigns/:id` - Campaign deletion (if ID doesn't exist)

---

### 409 Conflict
**Usage**: Resource conflict, typically duplicate entry.

**Occurrences**:
- Username already exists during registration

**Response Format**:
```json
{
  "error": "Username already exists."
}
```

**Endpoints**:
- `POST /api/users/register` - When username is already taken

---

### 500 Internal Server Error
**Usage**: Unexpected server error or database error.

**Occurrences**:
- Database connection failures
- SQL query errors
- Server-side exceptions
- Session destruction failures

**Response Format**:
```json
{
  "error": "Error message"
}
```

**Common Causes**:
- Database connectivity issues
- Invalid SQL queries
- Missing required fields in database
- Server configuration problems

---

## Error Response Format

All error responses follow this consistent format:

```json
{
  "error": "Error message description"
}
```

## Success Response Format

Success responses vary by endpoint but typically include:
- **200 OK**: Returns requested data or operation confirmation
- **201 Created**: Returns created resource with ID

---

## Status Code Quick Reference

| Code | Quick Meaning | Common Use Cases |
|------|---------------|------------------|
| 200 | Success | GET requests, updates, deletions |
| 201 | Created | POST requests creating new resources |
| 401 | Not authenticated | Missing or invalid credentials |
| 403 | Not authorized | Insufficient permissions |
| 404 | Not found | Invalid resource ID |
| 409 | Conflict | Duplicate entries |
| 500 | Server error | Database or server issues |

