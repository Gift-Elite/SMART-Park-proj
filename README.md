# SmartPark EPMS - Employee Payroll Management System

## Project Overview

SmartPark EPMS is a comprehensive web-based application designed to manage employee payroll efficiently. It replaces the manual, paper-based system with a digital solution that allows human resources to manage employee records, departments, and payroll operations with ease.

**Company:** SmartPark - Rubavu District, Western Province, Rwanda
**Developed By:** Gfit Elite
**Project Date:** November 2025

## Features

### 1. User Authentication
- Session-based login system
- User registration capability
- Secure password handling with bcryptjs
- Session management with express-session

### 2. Employee Management
- Add new employee records
- View all employee details including:
  - Employee Number (auto-generated)
  - First Name & Last Name
  - Address
  - Position
  - Telephone
  - Gender
  - Hired Date
  - Department Assignment

### 3. Department Management
- Pre-loaded default departments:
  - **CW** - Carwash (300,000 RWF / 20,000 RWF deduction)
  - **ST** - Stock (200,000 RWF / 5,000 RWF deduction)
  - **MC** - Mechanic (450,000 RWF / 40,000 RWF deduction)
  - **ADMS** - Administration Staff (600,000 RWF / 70,000 RWF deduction)
- Add new departments with custom salary structures

### 4. Salary Management (CRUD Operations)
- **Create**: Add new salary records
- **Read**: View all salary records with employee details
- **Update**: Modify existing salary records
- **Delete**: Remove salary records
- Automatic net salary calculation (Gross Salary - Total Deduction)

### 5. Monthly Payroll Reports
- Generate payroll reports by month
- Display: First Name, Last Name, Position, Department, Net Salary
- Print functionality for reports
- Total payroll calculation

## Project Structure

```
Gfit_Elite_National_Practical_Exam_2025/
├── backend-project/
│   ├── config/
│   │   ├── db.js                 # Database connection pool
│   │   └── initDb.js             # Database initialization
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── employeeController.js # Employee CRUD
│   │   ├── departmentController.js # Department CRUD
│   │   └── salaryController.js   # Salary CRUD & Reports
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── employees.js          # Employee endpoints
│   │   ├── departments.js        # Department endpoints
│   │   └── salaries.js           # Salary endpoints
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── .env                      # Environment variables
│   ├── package.json              # Dependencies
│   ├── server.js                 # Main server file
│   └── README.md                 # Backend documentation
│
└── frontend-project/
    ├── src/
    │   ├── api/
    │   │   └── axios.js          # API client configuration
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   └── ProtectedRoute.jsx # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Dashboard.jsx     # Dashboard
    │   │   ├── Employees.jsx     # Employee management
    │   │   ├── Departments.jsx   # Department management
    │   │   ├── Salaries.jsx      # Salary management
    │   │   ├── Reports.jsx       # Payroll reports
    │   │   └── NotFound.jsx      # 404 page
    │   ├── App.jsx               # Main app component
    │   ├── index.jsx             # React entry point
    │   └── index.css             # Global styles
    ├── index.html                # HTML entry point
    ├── package.json              # Dependencies
    ├── tailwind.config.js        # Tailwind configuration
    ├── postcss.config.js         # PostCSS configuration
    ├── vite.config.js            # Vite configuration
    └── README.md                 # Frontend documentation
```

## Technology Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL 5.7+
- **Authentication:** bcryptjs, express-session
- **API:** RESTful API with CORS support
- **Port:** 5000

### Frontend
- **Library:** React 18.2
- **Router:** React Router v6
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Port:** 3000

### Database
- **DBMS:** MySQL
- **Database Name:** EPMS
- **Tables:** Employee, Department, Salary, User

## Installation & Setup

### Prerequisites
- Node.js v14 or higher
- MySQL v5.7 or higher
- npm (comes with Node.js)

### Step 1: Backend Setup

1. Navigate to backend-project:
```bash
cd Gfit_Elite_National_Practical_Exam_2025/backend-project
```

2. Install dependencies:
```bash
npm install
```

3. Configure `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=EPMS
DB_PORT=3306
SESSION_SECRET=your_secret_key
NODE_ENV=development
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Step 2: Frontend Setup

1. Open a new terminal and navigate to frontend-project:
```bash
cd Gfit_Elite_National_Practical_Exam_2025/frontend-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at http://localhost:3000

## Database Setup

The backend automatically creates and initializes the database on startup. The following tables are created:

### Employee Table
- EmployeeNumber (INT, Auto-increment, Primary Key)
- FirstName (VARCHAR)
- LastName (VARCHAR)
- Address (VARCHAR)
- Position (VARCHAR)
- Telephone (VARCHAR)
- Gender (VARCHAR)
- HiredDate (DATE)
- DepartmentCode (VARCHAR, Foreign Key)

### Department Table
- DepartmentCode (VARCHAR, Primary Key)
- DepartmentName (VARCHAR)
- GrossSalary (DECIMAL)
- TotalDeduction (DECIMAL)

### Salary Table
- SalaryID (INT, Auto-increment, Primary Key)
- EmployeeNumber (INT, Foreign Key)
- GrossSalary (DECIMAL)
- TotalDeduction (DECIMAL)
- NetSalary (DECIMAL) - Auto-calculated
- MonthOfPayment (VARCHAR)

### User Table
- UserID (INT, Auto-increment, Primary Key)
- Username (VARCHAR, Unique)
- Password (VARCHAR, Encrypted)
- CreatedAt (TIMESTAMP)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check-session` - Check authentication status

### Employees (Insert Only)
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/:id` - Get employee by ID

### Departments (Insert Only)
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department
- `GET /api/departments/:code` - Get department by code

### Salaries (Full CRUD)
- `GET /api/salaries` - Get all salaries
- `POST /api/salaries` - Create new salary
- `GET /api/salaries/:id` - Get salary by ID
- `PUT /api/salaries/:id` - Update salary
- `DELETE /api/salaries/:id` - Delete salary
- `GET /api/salaries/report/monthly?month=YYYY-MM` - Get monthly payroll report

## Usage Instructions

### 1. First Time Setup

1. Start both backend and frontend servers
2. The database will be automatically initialized
3. Go to the login page
4. Click "Create an Account" to register a new user
5. Use your credentials to login

### 2. Adding Employees

1. Click "Employees" in the navigation
2. Fill in all employee details
3. Select department from dropdown
4. Click "Add Employee"
5. View the employee list below the form

### 3. Managing Departments

1. Click "Departments" in the navigation
2. Add new departments with salary structure
3. View all departments in the table
4. Default departments are pre-loaded

### 4. Creating Salary Records

1. Click "Salaries" in the navigation
2. Select an employee
3. Enter gross salary and deduction amounts
4. Select month of payment
5. Click "Add Salary" - Net salary calculates automatically
6. Edit or delete records as needed

### 5. Generating Reports

1. Click "Reports" in the navigation
2. Select a month using the date picker
3. Click "Search" to generate report
4. View all employees' payroll for that month
5. Click "Print" to print the report

## Key Features Implemented

✅ **Database Creation** - EPMS database with all required tables
✅ **Insert Operations** - Employee, Department, and Salary records
✅ **Update Operations** - Salary records only
✅ **Delete Operations** - Salary records only
✅ **Read Operations** - All tables
✅ **Authentication** - Session-based login with username/password
✅ **Responsive Design** - Mobile, tablet, and desktop support
✅ **Monthly Reports** - Payroll reports with net salary calculations
✅ **Tailwind CSS** - Modern, responsive UI design
✅ **Axios Integration** - Frontend-backend communication

## Security Features

- Password encryption using bcryptjs
- Session-based authentication
- Protected routes requiring authentication
- CORS configuration for API security
- Input validation on both frontend and backend
- SQL connection pooling

## Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1366px and above)
- Tablet (768px to 1024px)
- Mobile (320px to 767px)

All forms and tables adapt to screen size automatically using Tailwind CSS breakpoints.

## Troubleshooting

### Connection Issues
- Ensure MySQL is running on localhost:3306
- Check `.env` file for correct database credentials
- Verify backend server is running on port 5000

### Login Issues
- First time users must register
- Use the "Create an Account" link on login page
- Ensure cookies are enabled in browser

### CORS Errors
- Backend must have CORS configured for http://localhost:3000
- Check origin setting in server.js

## Performance Considerations

- Database connection pooling for efficiency
- Optimized queries with proper indexing
- Frontend lazy loading through React Router
- Tailwind CSS for lightweight styling

## Future Enhancements

- Email notifications for payroll
- Attendance tracking integration
- Leave management system
- Performance reviews
- Advance salary requests
- Tax calculations
- Bank integration for salary transfers

## Support & Maintenance

For technical support or questions:
- Review backend README.md for API details
- Review frontend README.md for component details
- Check database schema in initDb.js
- Verify environment configuration in .env file

## License

© 2025 SmartPark. All rights reserved.
Project developed for Rubavu District, Rwanda.

---

**Project Status:** ✅ Complete
**Last Updated:** November 12, 2025
**Version:** 1.0.0
