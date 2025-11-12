# SmartPark EPMS Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Web Browser                              │
│                      (http://localhost:3000)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────▼────────────┐
                │   React Frontend        │
                │  ┌──────────────────┐   │
                │  │  Pages           │   │
                │  │ - Login          │   │
                │  │ - Dashboard      │   │
                │  │ - Employees      │   │
                │  │ - Departments    │   │
                │  │ - Salaries       │   │
                │  │ - Reports        │   │
                │  └──────────────────┘   │
                │                         │
                │  ┌──────────────────┐   │
                │  │  Components      │   │
                │  │ - Navbar         │   │
                │  │ - Forms          │   │
                │  │ - Tables         │   │
                │  └──────────────────┘   │
                │                         │
                │  ┌──────────────────┐   │
                │  │  Services        │   │
                │  │ - Axios API      │   │
                │  │ - Context Auth   │   │
                │  └──────────────────┘   │
                └────────────┬────────────┘
                             │ HTTP/REST
                  ┌──────────▼───────────┐
                  │  Express.js Server   │
                  │ (http://localhost:5000)
                  │                      │
                  │  ┌────────────────┐  │
                  │  │  Routes        │  │
                  │  │ /auth          │  │
                  │  │ /employees     │  │
                  │  │ /departments   │  │
                  │  │ /salaries      │  │
                  │  └────────────────┘  │
                  │                      │
                  │  ┌────────────────┐  │
                  │  │ Controllers    │  │
                  │  │ Business Logic │  │
                  │  │ Validation     │  │
                  │  └────────────────┘  │
                  │                      │
                  │  ┌────────────────┐  │
                  │  │ Middleware     │  │
                  │  │ Authentication │  │
                  │  │ Error Handler  │  │
                  │  └────────────────┘  │
                  └──────────┬───────────┘
                             │ SQL Queries
                  ┌──────────▼───────────┐
                  │   MySQL Database     │
                  │   EPMS               │
                  │                      │
                  │  ┌────────────────┐  │
                  │  │ Tables         │  │
                  │  │ - User         │  │
                  │  │ - Employee     │  │
                  │  │ - Department   │  │
                  │  │ - Salary       │  │
                  │  └────────────────┘  │
                  └──────────────────────┘
```

## Data Flow

### Employee Creation Flow
```
User Input Form
     │
     ▼
React Component (Employees.jsx)
     │ handleSubmit()
     ▼
Axios API Call: POST /api/employees
     │
     ▼
Express Route Handler
     │ /routes/employees.js
     ▼
Controller: createEmployee()
     │ Validation
     ▼
MySQL Database
     │ INSERT
     ▼
Response to Frontend
     │
     ▼
Update UI with new Employee
```

### Salary Report Generation Flow
```
User Selects Month & Clicks Search
     │
     ▼
React Component (Reports.jsx)
     │ handleSearch()
     ▼
Axios API Call: GET /api/salaries/report/monthly?month=YYYY-MM
     │
     ▼
Express Route Handler
     │ /routes/salaries.js
     ▼
Controller: getMonthlyPayroll(month)
     │ SQL Query with JOINs
     ▼
MySQL Database Query
     │ SELECT with JOINs
     ▼
Response: Payroll Data Array
     │
     ▼
Display Report Table
     │
     ▼
User can Print Report
```

## Authentication Flow

```
┌─────────────────────────────────────────────┐
│            Login Page (Login.jsx)            │
│  ┌─────────────────────────────────────┐   │
│  │ Username: [ _____________ ]        │   │
│  │ Password: [ _____________ ]        │   │
│  │ [Login] [Create Account]          │   │
│  └─────────────────────────────────────┘   │
└────────┬─────────────────────────────┬──────┘
         │                             │
    Login Request             Register Request
         │                             │
         ▼                             ▼
POST /api/auth/login      POST /api/auth/register
     │                             │
     ▼                             ▼
Hash Password (bcryptjs)   Hash Password (bcryptjs)
     │                             │
     ▼                             ▼
Compare with DB           Store in DB
     │                             │
     ▼                             ▼
Create Session            Return Success
     │
     ▼
Set Session Cookie
     │
     ▼
Redirect to Dashboard
     │
     ▼
Protected Routes Check Session
     │
     ▼
Access Granted / Denied
```

## Database Schema Relationships

```
┌──────────────────────────────────────────────────────────┐
│                       User Table                         │
│  ┌──────────┬──────────┬──────────┬──────────────┐     │
│  │ UserID   │ Username │ Password │ CreatedAt    │     │
│  │ (PK)     │ (UNIQUE) │ (Hashed) │ (Timestamp)  │     │
│  └──────────┴──────────┴──────────┴──────────────┘     │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                   Department Table                       │
│  ┌───────────────┬──────────────┬────────┬──────────┐   │
│  │ DeptCode (PK) │ DeptName     │ Gross  │ Deduct   │   │
│  └───────────────┴──────────────┴────────┴──────────┘   │
│         ▲                                                 │
│         │ (1:N)                                          │
│         │                                                 │
│  ┌──────┴───────────────────────────────────────────┐   │
│  │                Employee Table                     │   │
│  │  ┌──────────┬─────────┬──────────┬────────────┐  │   │
│  │  │ EmpNum   │ FirstN  │ LastN    │ DeptCode   │  │   │
│  │  │ (PK)     │         │          │ (FK)       │  │   │
│  │  │ Address  │ Position│Telephone │ Gender     │  │   │
│  │  │ HiredDate│         │          │            │  │   │
│  │  └──────────┴─────────┴──────────┴────────────┘  │   │
│  │         ▲                                         │   │
│  │         │ (1:N)                                  │   │
│  │         │                                         │   │
│  │  ┌──────┴─────────────────────────────────────┐  │   │
│  │  │           Salary Table                      │  │   │
│  │  │  ┌────────┬─────────┬────────┬──────────┐  │  │   │
│  │  │  │SalaryID│EmpNum   │Gross   │Deduction │  │  │   │
│  │  │  │(PK)    │(FK)     │        │          │  │  │   │
│  │  │  │ NetSal │ MonthPay│        │          │  │  │   │
│  │  │  └────────┴─────────┴────────┴──────────┘  │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

## Response Examples

### Successful Employee Creation
```json
{
  "message": "Employee created successfully",
  "employeeNumber": 1
}
```

### Monthly Payroll Report
```json
[
  {
    "FirstName": "John",
    "LastName": "Doe",
    "Position": "Mechanic",
    "DepartmentName": "Mechanic",
    "NetSalary": 410000,
    "MonthOfPayment": "2025-11"
  },
  {
    "FirstName": "Jane",
    "LastName": "Smith",
    "Position": "Manager",
    "DepartmentName": "Administration Staff",
    "NetSalary": 530000,
    "MonthOfPayment": "2025-11"
  }
]
```

### Error Response
```json
{
  "error": "All fields are required"
}
```

---

This architecture ensures:
- **Separation of Concerns**: Frontend, Backend, and Database are separate
- **Scalability**: Easy to add new features
- **Security**: Authentication middleware protects routes
- **Maintainability**: Clear folder structure and naming conventions
