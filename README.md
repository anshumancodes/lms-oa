# Leave Management System – Walkthrough

I have successfully implemented the **Leave Management System** using **Next.js**, **PostgreSQL (Neon)**, and **Prisma**.

---

##  Features Implemented

### 1. User Authentication
- **Login Page**: Secure login using email and password.
- **Role-Based Access Control**:
  - **Employees**
    - View their dashboard
    - Submit leave requests
  - **Managers**
    - View all leave requests
    - Approve or reject requests
- **Middleware**
  - Protects routes based on authentication status.

---

### 2. Dashboard

#### Employee View
- Displays leave balances:
  - Vacation
  - Sick
  - Other
- Lists personal leave requests with their status.

#### Manager View
- Includes a link to the **Manage Leaves** page.

---

### 3. Leave Request Submission
- **Form**
  - Select leave type
  - Choose start and end dates
  - Enter reason for leave
- **Validation**
  - Ensures all required fields are filled.
- **Server Actions**
  - Handles leave submission securely.

---

### 4. Leave Management (Admin)
- **Admin Page**
  - Lists all leave requests from employees.
- **Approval Workflow**
  - Managers can **Approve** or **Reject** requests.
- **Status Updates**
  - Real-time updates using **Server Actions** and `revalidatePath`.

---

## 🗄️ Database Schema

- **User**
  - Stores user details and role (`EMPLOYEE` / `MANAGER`)
- **LeaveRequest**
  - Stores leave details and status (`PENDING`, `APPROVED`, `REJECTED`)
- **LeaveBalance**
  - Tracks available leave days for each user

---

## ✅ Verification

- **Build**
  - Project builds successfully using `npm run build`
- **Database**
  - Prisma migrations applied
  - Seed data inserted
- **Type Safety**
  - Full TypeScript support with Prisma-generated types

---

## ▶️ How to Run

1. Ensure `.env` contains the correct values:
   ```env
   DATABASE_URL=your_database_url
   AUTH_SECRET=your_auth_secret
