
# Leave Management System

## Features
- Email & password authentication
- Role-based access (Employee / Manager)
- Protected routes via middleware
- Leave request submission and approval workflow

## Authentication
- Secure login page
- Employees can view dashboard and request leaves
- Managers can view, approve, or reject all leave requests

## Dashboard
- **Employee**
  - Leave balances (Vacation, Sick, Other)
  - Personal leave requests with status
- **Manager**
  - Access to Manage Leaves page

## Leave Requests
- Leave type, date range, and reason
- Required field validation
- Server Actions for secure submission

## Leave Management
- View all employee leave requests
- Approve or reject requests
- Real-time status updates using `revalidatePath`

## Database
- **User**: user details and role (EMPLOYEE / MANAGER)
- **LeaveRequest**: leave data and status (PENDING / APPROVED / REJECTED)
- **LeaveBalance**: available leave days per user

## Verification
- Builds successfully (`npm run build`)
- Prisma migrations and seed data applied
- Full TypeScript support with Prisma types

## Run Locally
1. Configure `.env`:
   ```env
   DATABASE_URL=your_database_url
   AUTH_SECRET=your_auth_secret
````

2. Start the server:

   ```bash
   npm run dev
   ```

## Test Credentials

**Manager**

* Email: `manager@example.com`
* Password: `password123`

**Employee**

* Email: `employee@example.com`
* Password: `password123`


