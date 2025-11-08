# DRN Backend API Documentation

This document provides details on the API endpoints for the Disaster Response Network (DRN) backend.

**Base URL**: `http://localhost:3001/api`

> **Note**: For a complete reference of HTTP response codes used in this API, see [RESPONSE_CODES.md](./RESPONSE_CODES.md)

---

## Campaigns API

Endpoint: `/api/campaigns`

### Get All Campaigns

- **Method**: `GET`
- **Path**: `/` 
- **Description**: Retrieves a list of all active campaigns.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `[ { "ID": 1, "Title": "Flood Relief", "Location": "Coastal Region", ... } ]`

### Create a New Campaign

- **Method**: `POST`
- **Path**: `/`
- **Description**: Creates a new disaster relief campaign. **(Authentication required)**
- **Request Body**:
  ```json
  {
    "Title": "string",
    "Location": "string",
    "Urgency": "string",
    "Description": "string",
    "Image": "string (url)",
    "Goal": number,
    "Due": "2025-12-31" // Must be a valid date in YYYY-MM-DD format
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**: `{ "id": 1, "Title": "New Campaign", ... }`
- **Error Response**:
  - **Code**: `401 Unauthorized`
    - **Content**: `{ "error": "Authentication required. Please log in." }`
  - **Code**: `500 Internal Server Error`
    - **Content**: `{ "error": "Error message" }`

### Update a Campaign (Admin Only)

- **Method**: `POST`
- **Path**: `/api/campaigns/[id]`
- **Description**: Updates the details of a specific campaign. **(Admin access required)**
- **Request Body**: (Same as Create a New Campaign)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ "message": "Campaign updated successfully." }`
- **Error Response**:
  - **Code**: `403 Forbidden`
    - **Content**: `{ "error": "Forbidden. Administrator access required." }`
  - **Code**: `404 Not Found`
    - **Content**: `{ "error": "Campaign not found." }`

### Delete a Campaign (Admin Only)

- **Method**: `DELETE`
- **Path**: `/api/campaigns/[id]`
- **Description**: Deletes a specific campaign. **(Admin access required)**
- **Authentication**: Required (Admin user session)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ "message": "Campaign deleted successfully." }`
- **Error Response**:
  - **Code**: `403 Forbidden`
    - **Content**: `{ "error": "Forbidden. Administrator access required." }`
  - **Code**: `404 Not Found`
    - **Content**: `{ "error": "Campaign not found." }`
  - **Code**: `401 Unauthorized`
    - **Content**: `{ "error": "Authentication required. Please log in." }`

---

## Users API

Endpoint: `/api/users`

### Register a New User

- **Method**: `POST`
- **Path**: `/register`
- **Description**: Registers a new user account. The password will be securely hashed.
- **Request Body**:
  ```json
  {
    "Username": "string",
    "Password": "string"
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**: `{ "id": 1, "Username": "testuser" }`
- **Error Response**:
  - **Code**: `409 Conflict` (if username already exists)
    - **Content**: `{ "error": "Username already exists." }`
- **Code**: `403 Forbidden` (if username is 'admin')
  - **Content**: `{ "error": "The username 'admin' is reserved." }`

### User Login

- **Method**: `POST`
- **Path**: `/login`
- **Description**: Authenticates a user and creates a session.
- **Request Body**:
  ```json
  {
    "Username": "string",
    "Password": "string"
  }
  ```
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ "message": "Login successful.", "user": { "id": 1, "username": "testuser", "isAdmin": false } }`
- **Error Response**:
  - **Code**: `401 Unauthorized`
  - **Content**: `{ "error": "Invalid username or password." }`

### Check Session Status

- **Method**: `GET`
- **Path**: `/status`
- **Description**: Checks if a user is currently logged in.
- **Success Response (Logged In)**:
  - **Code**: `200 OK`
  - **Content**: `{ "loggedIn": true, "user": { "id": 1, "username": "testuser", "isAdmin": false } }`
- **Success Response (Logged Out)**:
  - **Code**: `200 OK`
  - **Content**: `{ "loggedIn": false }`

### User Logout

- **Method**: `POST`
- **Path**: `/logout`
- **Description**: Destroys the current session.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ "message": "Logout successful." }`
  - **Code**: `500 Internal Server Error`
    - **Content**: `{ "error": "Error message" }`

---

## Donations API

Endpoint: `/api/donations`

### Get All Donations

- **Method**: `GET`
- **Path**: `/`
- **Description**: Retrieves a list of all donations made, ordered by ID (newest first). Includes donor username from the Users table.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: 
    ```json
    [
      {
        "ID": 1,
        "Amount": 100.00,
        "Supplies": ["Water bottles", "blankets"],
        "Donor": 1,
        "DonorUsername": "testuser",
        "CampaignID": 1,
        "CreatedAt": "2025-01-09T10:30:00.000Z"
      }
    ]
    ```
- **Response Fields**:
  - `ID` (number): Donation ID
  - `Amount` (number): Donation amount
  - `Supplies` (array): Array of supply names as strings
  - `Donor` (number): User ID of the donor
  - `DonorUsername` (string): Username of the donor (from Users table JOIN)
  - `CampaignID` (number): ID of the campaign this donation is for
  - `CreatedAt` (string, optional): Timestamp when the donation was created

### Create a New Donation

- **Method**: `POST`
- **Path**: `/`
- **Description**: Records a new donation for the currently logged-in user and a specific campaign. **(Authentication required)**
- **Authentication**: Required (user session)
- **Request Body**:
  ```json
  {
    "Amount": number,
    "Supplies": ["string", "string"],  // Array of strings (optional)
    "CampaignID": number  // Campaign ID (required)
  }
  ```
  > **Note**: The `Donor` field is **NOT** included in the request body. The donor ID is automatically retrieved from the authenticated user's session.
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**: 
    ```json
    {
      "id": 1,
      "Amount": 100.00,
      "Supplies": ["Water bottles", "blankets"],
      "Donor": 1,
      "CampaignID": 1
    }
    ```
- **Error Response**:
  - **Code**: `400 Bad Request`
    - **Content**: `{ "error": "Amount is required and must be greater than 0." }`
    - **Content**: `{ "error": "CampaignID is required." }`
  - **Code**: `401 Unauthorized`
    - **Content**: `{ "error": "Authentication required. Please log in." }`
  - **Code**: `404 Not Found`
    - **Content**: `{ "error": "Campaign not found." }`
  - **Code**: `500 Internal Server Error`
    - **Content**: `{ "error": "Error message" }`

---

## Stats API

Endpoint: `/api/stats`

### Get Statistics

- **Method**: `GET`
- **Path**: `/`
- **Description**: Retrieves aggregate statistics about donations, supplies, donors, and campaigns.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: 
    ```json
    {
      "totalDonations": 5000.00,
      "numberOfSupplies": 150,
      "donors": 25,
      "activeCampaigns": 10
    }
    ```
- **Response Fields**:
  - `totalDonations` (number): Sum of all donation amounts
  - `numberOfSupplies` (number): Total count of all supplies across all donations (sum of Supplies array lengths)
  - `donors` (number): Number of unique users who have made at least one donation
  - `activeCampaigns` (number): Total number of campaigns in the database
- **Error Response**:
  - **Code**: `500 Internal Server Error`
    - **Content**: `{ "error": "Error message" }`
