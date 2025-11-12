# SmartPark EPMS - Quick Start Guide

## System Requirements

- **Operating System:** Windows, macOS, or Linux
- **Node.js:** v14.0.0 or higher
- **MySQL:** v5.7 or higher
- **RAM:** Minimum 2GB
- **Disk Space:** Minimum 500MB

## Quick Start (5 Minutes)

### Step 1: Verify Prerequisites

Check if Node.js is installed:
```bash
node --version
npm --version
```

Check if MySQL is installed:
```bash
mysql --version
```

### Step 2: Install Backend Dependencies

```bash
cd Gfit_Elite_National_Practical_Exam_2025\backend-project
npm install
```

**Expected packages installed:**
- express (v4.18.2)
- mysql2 (v3.6.0)
- bcryptjs (v2.4.3)
- express-session (v1.17.3)
- cors (v2.8.5)
- dotenv (v16.3.1)
- nodemon (dev)

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend-project
npm install
```

**Expected packages installed:**
- react (v18.2.0)
- react-dom (v18.2.0)
- react-router-dom (v6.17.0)
- axios (v1.6.0)
- tailwindcss (v3.3.0)
- vite (v5.0.0)

### Step 4: Configure Environment

1. Open `.env` in `backend-project` folder
2. Update database credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=EPMS
```

### Step 5: Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend-project
npm start
```
Expected output: `Server running on port 5000`

**Terminal 2 - Frontend Server:**
```bash
cd frontend-project
npm start
```
Expected output: `Local: http://localhost:3000`

### Step 6: Access the Application

1. Open browser
2. Go to http://localhost:3000
3. Click "Create an Account"
4. Register with username and password
5. Login and start using the system

## First Time User Workflow

1. **Register** → Create an account
2. **Login** → Use your credentials
3. **Dashboard** → View system statistics
4. **Employees** → Add employee records
5. **Departments** → View department salary structures
6. **Salaries** → Create salary records
7. **Reports** → Generate monthly payroll reports

## Default Departments (Pre-loaded)

| Code | Department | Gross Salary | Deduction | Net |
|------|-----------|-------------|-----------|-----|
| CW   | Carwash | 300,000 RWF | 20,000 RWF | 280,000 RWF |
| ST   | Stock | 200,000 RWF | 5,000 RWF | 195,000 RWF |
| MC   | Mechanic | 450,000 RWF | 40,000 RWF | 410,000 RWF |
| ADMS | Administration Staff | 600,000 RWF | 70,000 RWF | 530,000 RWF |

## Common Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with hot reload
npm stop           # Stop server
```

### Frontend
```bash
npm start          # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Troubleshooting

### Issue: "Cannot connect to database"
**Solution:**
1. Ensure MySQL is running
2. Check credentials in `.env`
3. Verify database name is "EPMS"

### Issue: "Port 3000 or 5000 already in use"
**Solution:**
1. Kill process using the port
2. Or change port in configuration

### Issue: "Dependencies not installed"
**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Issue: "Login not working"
**Solution:**
1. Ensure backend is running on http://localhost:5000
2. Register a new account first
3. Check browser console for errors

## API Testing

Test API endpoints using curl or Postman:

```bash
# Check if backend is running
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

## Performance Tips

1. **Database**: Use indexes on frequently queried columns
2. **Frontend**: Browser caching is enabled for static assets
3. **Backend**: Connection pooling limits database load
4. **Network**: Use production build for better performance

## Security Reminders

⚠️ **Before Deployment:**
1. Change `SESSION_SECRET` in `.env`
2. Set `NODE_ENV=production`
3. Use strong database password
4. Enable HTTPS
5. Add rate limiting
6. Implement CSRF protection

## Support Resources

- **Backend API Docs**: See `backend-project/README.md`
- **Frontend Docs**: See `frontend-project/README.md`
- **Main README**: See `README.md` in root directory
- **Database Schema**: See `backend-project/config/initDb.js`

## Next Steps

1. ✅ Installation complete
2. 👥 Add employees to the system
3. 💰 Create salary records
4. 📊 Generate monthly reports
5. 🔐 Change login credentials regularly

---

**Happy using SmartPark EPMS!** 🎉
