# SmartPark EPMS - Backend Project

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm

### Installation

1. Navigate to the backend-project folder
2. Install dependencies:
```bash
npm install
```

3. Configure `.env` file with your database credentials

4. Start the server:
```bash
npm start
```

For development with hot reload:
```bash
npm run dev
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check-session` - Check if user is authenticated

#### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `GET /api/employees/:id` - Get employee by ID

#### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department
- `GET /api/departments/:code` - Get department by code

#### Salaries
- `GET /api/salaries` - Get all salaries
- `POST /api/salaries` - Create new salary
- `GET /api/salaries/:id` - Get salary by ID
- `PUT /api/salaries/:id` - Update salary
- `DELETE /api/salaries/:id` - Delete salary
- `GET /api/salaries/report/monthly` - Get monthly payroll report

### Database Schema

The application automatically creates the following tables:
- Department
- Employee
- Salary
- User
