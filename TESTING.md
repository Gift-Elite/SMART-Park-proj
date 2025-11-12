# SmartPark EPMS - Testing Guide

## Testing Checklist

### 1. Authentication Testing

#### Test Case 1.1: User Registration
- [ ] Go to http://localhost:3000/login
- [ ] Click "Create an Account"
- [ ] Enter username: `testuser`
- [ ] Enter password: `password123`
- [ ] Click "Register"
- [ ] Expected: "Registration successful" message
- [ ] Click "Back to Login"

#### Test Case 1.2: User Login
- [ ] Enter username: `testuser`
- [ ] Enter password: `password123`
- [ ] Click "Login"
- [ ] Expected: Redirected to Dashboard

#### Test Case 1.3: Invalid Credentials
- [ ] Enter wrong username/password
- [ ] Click "Login"
- [ ] Expected: "Invalid credentials" error

#### Test Case 1.4: Logout
- [ ] Click "Logout" button in navbar
- [ ] Expected: Redirected to login page

### 2. Employee Management Testing

#### Test Case 2.1: Add Employee
- [ ] Navigate to "Employees"
- [ ] Fill form with:
  - First Name: `John`
  - Last Name: `Doe`
  - Address: `123 Main Street`
  - Position: `Mechanic`
  - Telephone: `0788123456`
  - Gender: `Male`
  - Hired Date: `2025-01-15`
  - Department: `MC (Mechanic)`
- [ ] Click "Add Employee"
- [ ] Expected: "Employee added successfully!" message
- [ ] Employee should appear in the list

#### Test Case 2.2: View Employee List
- [ ] Navigate to "Employees"
- [ ] Should see table with all employees
- [ ] Verify columns: Emp #, Name, Position, Department, Telephone, Gender

#### Test Case 2.3: Add Multiple Employees
- [ ] Add 2-3 more employees with different departments
- [ ] Verify all appear in the list
- [ ] Each should have unique Employee Number

### 3. Department Management Testing

#### Test Case 3.1: View Default Departments
- [ ] Navigate to "Departments"
- [ ] Verify 4 default departments are displayed:
  - CW - Carwash: 300,000 RWF / 20,000 RWF = 280,000 RWF
  - ST - Stock: 200,000 RWF / 5,000 RWF = 195,000 RWF
  - MC - Mechanic: 450,000 RWF / 40,000 RWF = 410,000 RWF
  - ADMS - Administration: 600,000 RWF / 70,000 RWF = 530,000 RWF

#### Test Case 3.2: Add New Department
- [ ] Click form section
- [ ] Fill:
  - Code: `HR`
  - Name: `Human Resources`
  - Gross: `550000`
  - Deduction: `60000`
- [ ] Click "Add Department"
- [ ] Expected: "Department added successfully!" message
- [ ] Department should appear in list

#### Test Case 3.3: Verify Net Salary Calculation
- [ ] Check each department's Net Salary = Gross - Deduction
- [ ] Calculations should be correct

### 4. Salary Management Testing

#### Test Case 4.1: Create Salary Record
- [ ] Navigate to "Salaries"
- [ ] Select Employee: `John Doe (1)`
- [ ] Gross Salary: `450000`
- [ ] Total Deduction: `40000`
- [ ] Month of Payment: `2025-11` (November 2025)
- [ ] Click "Add Salary"
- [ ] Expected: "Salary record created successfully!" message
- [ ] Net Salary should show as 410,000 (calculated automatically)
- [ ] Record should appear in table

#### Test Case 4.2: View Salary Records
- [ ] All salary records should display in table
- [ ] Columns: Employee, Gross, Deduction, Net, Month, Actions

#### Test Case 4.3: Edit Salary Record
- [ ] Click "Edit" button on a salary record
- [ ] Modify the Gross Salary to `460000`
- [ ] Click "Update Salary"
- [ ] Expected: "Salary record updated successfully!" message
- [ ] Net Salary should recalculate to 420,000
- [ ] Table should update

#### Test Case 4.4: Delete Salary Record
- [ ] Click "Delete" button on a salary record
- [ ] Confirm deletion in popup
- [ ] Expected: "Salary record deleted successfully!" message
- [ ] Record should disappear from table

#### Test Case 4.5: Test Net Salary Calculation
- [ ] Create salary with:
  - Gross: 500,000
  - Deduction: 50,000
- [ ] Verify Net shows: 450,000 ✓

### 5. Payroll Reports Testing

#### Test Case 5.1: Generate Monthly Report
- [ ] Navigate to "Reports"
- [ ] Select Month: `November 2025` (2025-11)
- [ ] Click "Search"
- [ ] Expected: All payroll records for November should display
- [ ] Should show: First Name, Last Name, Position, Department, Net Salary

#### Test Case 5.2: Monthly Report Totals
- [ ] Verify total monthly payroll is calculated correctly
- [ ] Sum should equal total of all Net Salaries for that month

#### Test Case 5.3: Empty Month Report
- [ ] Select a month with no data (e.g., January 2025)
- [ ] Click "Search"
- [ ] Expected: "No payroll records found for the selected month"

#### Test Case 5.4: Print Report
- [ ] Generate a report for November
- [ ] Click "Print" button
- [ ] Expected: Browser print dialog opens
- [ ] Should print nicely with all data visible

### 6. Dashboard Testing

#### Test Case 6.1: Dashboard Statistics
- [ ] Navigate to "Dashboard"
- [ ] Verify displayed statistics:
  - Total Employees: (correct count)
  - Departments: 4 or 5 (depending on additions)
  - Salary Records: (correct count)
  - Total Net Salaries: (correct sum in RWF)

#### Test Case 6.2: Quick Action Links
- [ ] All 4 quick action buttons should be clickable
- [ ] Verify links navigate to correct pages

### 7. Navigation Testing

#### Test Case 7.1: Navbar Links
- [ ] Click each navbar link:
  - [ ] Dashboard
  - [ ] Employees
  - [ ] Departments
  - [ ] Salaries
  - [ ] Reports
- [ ] Each should navigate to correct page

#### Test Case 7.2: Active Route
- [ ] Current page should be highlighted/active in navbar

### 8. Responsive Design Testing

#### Test Case 8.1: Desktop (1920px)
- [ ] All elements visible
- [ ] Tables display horizontally
- [ ] Forms properly aligned
- [ ] No scrolling issues

#### Test Case 8.2: Tablet (768px)
- [ ] Elements stack properly
- [ ] Touch-friendly buttons
- [ ] Forms responsive

#### Test Case 8.3: Mobile (375px)
- [ ] Navbar collapses if needed
- [ ] Forms stack vertically
- [ ] Tables scrollable horizontally
- [ ] All buttons accessible

### 9. Error Handling Testing

#### Test Case 9.1: Empty Fields
- [ ] Try to submit form without required fields
- [ ] Expected: Validation error shown

#### Test Case 9.2: Duplicate Data
- [ ] Try to register with existing username
- [ ] Expected: "Username already exists" error

#### Test Case 9.3: Server Error
- [ ] Stop backend server
- [ ] Try any API call
- [ ] Expected: Error message displayed

### 10. Data Persistence Testing

#### Test Case 10.1: Session Persistence
- [ ] Login to system
- [ ] Navigate to different pages
- [ ] Refresh page
- [ ] Expected: Still logged in

#### Test Case 10.2: Database Persistence
- [ ] Add employee record
- [ ] Refresh page or logout/login
- [ ] Navigate to Employees
- [ ] Expected: Employee still in list

#### Test Case 10.3: Report Data Persistence
- [ ] Create salary records
- [ ] Generate report
- [ ] Refresh page
- [ ] Generate same report again
- [ ] Expected: Same data should be displayed

## API Testing with cURL

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"apitest","password":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"username":"apitest","password":"test123"}'
```

### Get All Employees
```bash
curl -X GET http://localhost:5000/api/employees \
  -b cookies.txt
```

### Create Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "firstName":"Jane",
    "lastName":"Smith",
    "address":"456 Oak Ave",
    "position":"Stock Manager",
    "telephone":"0789654321",
    "gender":"Female",
    "hiredDate":"2025-02-01",
    "departmentCode":"ST"
  }'
```

### Get All Salaries
```bash
curl -X GET http://localhost:5000/api/salaries \
  -b cookies.txt
```

### Get Monthly Payroll
```bash
curl -X GET "http://localhost:5000/api/salaries/report/monthly?month=2025-11" \
  -b cookies.txt
```

## Performance Testing

### Load Testing
1. Create 10+ employees
2. Create 10+ salary records
3. Navigate between pages
4. Check for lag or slowness
5. Open browser DevTools → Performance tab
6. Monitor load times

### Database Query Performance
- Check if queries complete within 1-2 seconds
- Verify no N+1 query problems
- Check connection pooling is working

## Browser Compatibility Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Final Checklist

- [ ] All CRUD operations work correctly
- [ ] Authentication works securely
- [ ] Reports generate accurately
- [ ] Database persists data correctly
- [ ] Responsive design works on all sizes
- [ ] No console errors
- [ ] Error messages are user-friendly
- [ ] Performance is acceptable
- [ ] All validations work
- [ ] Session management works properly

## Known Test Data

Use this data for consistent testing:

**Default User:**
- Username: `testuser`
- Password: `password123`

**Test Employee 1:**
- Name: John Doe
- Position: Mechanic
- Department: MC
- Telephone: 0788123456

**Test Employee 2:**
- Name: Jane Smith
- Position: Stock Manager
- Department: ST
- Telephone: 0789654321

**Test Salary Record:**
- Month: November 2025 (2025-11)
- Gross: 450,000 RWF
- Deduction: 40,000 RWF
- Net: 410,000 RWF (auto-calculated)

---

**Testing Status:** Ready for QA
**Last Updated:** November 12, 2025
