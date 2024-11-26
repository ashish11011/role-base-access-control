# Project Name: **Next.js with MongoDB**

## Project Overview

This project is a dynamic web application built using **Next.js** and **MongoDB**. It features two main pages: the homepage ("/") and an admin dashboard ("/admin"). The app includes a secure user authentication system with hashed passwords, short-lived tokens, and **Role-Based Access Control (RBAC)** to manage user permissions efficiently.

---

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Node.js APIs
- **Database**: MongoDB

---

## Pages

1. **Home ("/")**: The main landing page for the application.
2. **Admin ("/admin")**: A protected route accessible only to authenticated users with the correct role.

---

### Backend APIs

- /api/dict/deleteDictionary
- /api/dict/editDictionary
- /api/user/createNewUser
- /api/user/deleteUser
- /api/user/setUserRole
- /api/user/signinUser

---

## Role-Based Access Control (RBAC)

RBAC is implemented to manage permissions dynamically. Each role is associated with specific actions.

### Role Definitions

```typescript
const ROLES = {
  admin: [
    "edit:dictionary",
    "create:dictionary",
    "edit:dictionary",
    "delete:dictionary",
    "edit:user",
    "delete:user",
  ],
  editDictionary: ["edit:dictionary", "create:dictionary", "edit:dictionary"],
  createDictionary: ["create:dictionary"],
  deleteDictionary: ["edit:dictionary", "delete:dictionary"],
  user: ["view:dictionary"],
  userManager: ["edit:user", "delete:user"],
} as const;
```

### Sample Account

email - bishnoi11011@gmail.com

password - Ashish

## How to Start the Project

Install Dependencies : Run the following command to install all required project dependencies:

```bash
npm install
```

now run the project

```bash
npm run dev
```

open localhost on browser

```bash
http://localhost:3000
```
