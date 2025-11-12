# SmartPark EPMS - Frontend Project

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the frontend-project folder
2. Install dependencies:
```bash
npm install
```

### Development Server

Start the development server:
```bash
npm start
```

The application will run on http://localhost:3000

### Build for Production

Build the optimized production bundle:
```bash
npm run build
```

### Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **User Authentication**: Session-based login system with username and password
- **Employee Management**: Add and view employee records with all details
- **Department Management**: Add and view department information
- **Salary Management**: Create, update, and delete salary records
- **Payroll Reports**: Generate monthly payroll reports with net salary calculations
- **Tailwind CSS**: Modern UI design with responsive components

### Pages

1. **Login Page** - User authentication with register option
2. **Dashboard** - System statistics and quick actions
3. **Employees** - Add new employees and view employee list
4. **Departments** - Add new departments and view department details
5. **Salaries** - Manage salary records (Create, Read, Update, Delete)
6. **Reports** - Generate monthly payroll reports

### Technologies Used

- React 18.2
- React Router v6
- Axios for API calls
- Tailwind CSS for styling
- Vite as build tool
