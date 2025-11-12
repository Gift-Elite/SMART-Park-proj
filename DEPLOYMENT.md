# SmartPark EPMS - Deployment Guide

## Pre-Deployment Checklist

- [ ] All tests passed (see TESTING.md)
- [ ] Environment variables configured
- [ ] Database backed up
- [ ] Session secret changed
- [ ] HTTPS certificate ready (for production)
- [ ] Domain name configured
- [ ] Email notifications set up (optional)
- [ ] Logging configured
- [ ] Monitoring set up

## Environment Configuration

### Development (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=dev_password
DB_NAME=EPMS
DB_PORT=3306
SESSION_SECRET=dev_secret_key
NODE_ENV=development
PORT=5000
```

### Production (.env)
```env
DB_HOST=prod-db-server.com
DB_USER=epms_user
DB_PASSWORD=strong_password_here
DB_NAME=EPMS_PROD
DB_PORT=3306
SESSION_SECRET=generate_random_long_string_here
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
```

## Deployment Options

### Option 1: Local Server Deployment

#### Step 1: Install on Server
```bash
# SSH into server
ssh user@server-ip

# Clone or transfer project
cd /opt
git clone your-repo.git
# OR
scp -r Gfit_Elite_National_Practical_Exam_2025 user@server-ip:/opt/
```

#### Step 2: Install Dependencies
```bash
cd backend-project
npm install --production

cd ../frontend-project
npm install --production
```

#### Step 3: Build Frontend
```bash
cd frontend-project
npm run build
```

#### Step 4: Start Services
```bash
# Backend (with process manager like PM2)
pm2 start server.js --name "epms-backend"

# Frontend (serve dist folder with nginx or apache)
# Copy dist folder to web root
```

#### Step 5: Setup Web Server (Nginx Example)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/epms-frontend/dist;
        try_files $uri /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 2: Docker Deployment

#### Create Backend Dockerfile
```dockerfile
FROM node:18

WORKDIR /app

COPY backend-project/package*.json ./

RUN npm install --production

COPY backend-project .

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Create Frontend Dockerfile
```dockerfile
FROM node:18 as build

WORKDIR /app

COPY frontend-project/package*.json ./

RUN npm install

COPY frontend-project .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: EPMS
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build:
      context: .
      dockerfile: backend-project/Dockerfile
    ports:
      - "5000:5000"
    environment:
      DB_HOST: mysql
      DB_USER: root
      DB_PASSWORD: your_password
      DB_NAME: EPMS
    depends_on:
      - mysql

  frontend:
    build:
      context: .
      dockerfile: frontend-project/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql_data:
```

### Option 3: Cloud Deployment

#### Heroku Deployment

1. **Create Procfile** (backend-project/)
```
web: npm start
```

2. **Deploy Backend**
```bash
heroku create epms-backend
heroku config:set DB_HOST=your-db-host
heroku config:set DB_PASSWORD=your-db-password
git push heroku main
```

3. **Deploy Frontend to Vercel**
```bash
npm install -g vercel
vercel --prod
```

#### AWS Deployment

1. **Backend on EC2**
```bash
# Launch EC2 instance (Ubuntu)
# SSH into instance
sudo apt update
sudo apt install nodejs npm mysql-client

# Transfer files
scp -i key.pem -r backend-project ec2-user@ec2-ip:/home/ubuntu/

# Install and run
npm install
npm start
```

2. **Frontend on CloudFront + S3**
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket/

# Configure CloudFront distribution
```

3. **Database on RDS**
- Create MySQL instance on RDS
- Update .env with RDS endpoint
- Run migrations/initialization

## SSL/HTTPS Setup

### Using Let's Encrypt (Nginx)

```bash
sudo apt-get install certbot python3-certbot-nginx

sudo certbot certonly --nginx -d yourdomain.com

# Configure Nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # ... rest of config
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

## Database Backup & Recovery

### MySQL Backup
```bash
# Full backup
mysqldump -u root -p EPMS > epms_backup_$(date +%Y%m%d).sql

# Backup with compression
mysqldump -u root -p EPMS | gzip > epms_backup_$(date +%Y%m%d).sql.gz

# Restore from backup
mysql -u root -p EPMS < epms_backup.sql

# Restore from compressed backup
gunzip < epms_backup.sql.gz | mysql -u root -p EPMS
```

### Automated Backups
```bash
#!/bin/bash
# backup.sh - Add to crontab for daily backups

BACKUP_DIR="/backups/epms"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/epms_$DATE.sql.gz"

mysqldump -u root -p$MYSQL_PASSWORD EPMS | gzip > $BACKUP_FILE

# Keep only last 7 days
find $BACKUP_DIR -type f -name "*.sql.gz" -mtime +7 -delete
```

### Crontab Setup
```bash
# Edit crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /home/user/backup.sh
```

## Performance Optimization

### Backend Optimization

1. **Enable Caching**
```javascript
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=3600');
  next();
});
```

2. **Add Request Logging**
```bash
npm install morgan
```

3. **Enable Gzip Compression**
```bash
npm install compression
```

### Frontend Optimization

1. **Code Splitting** (Already in React Router)
2. **Image Optimization**
3. **Build minification** (Vite handles this)

### Database Optimization

1. **Add Indexes**
```sql
CREATE INDEX idx_emp_dept ON Employee(DepartmentCode);
CREATE INDEX idx_salary_month ON Salary(MonthOfPayment);
CREATE INDEX idx_user_username ON User(Username);
```

2. **Query Optimization**
- Use connection pooling (already enabled)
- Optimize JOIN queries
- Add pagination for large result sets

## Monitoring & Logging

### PM2 Monitoring
```bash
npm install -g pm2

# Start with PM2
pm2 start server.js --name "epms"

# Monitor
pm2 monit

# View logs
pm2 logs epms
```

### Error Logging
```bash
npm install winston
```

### Application Monitoring
- NewRelic
- DataDog
- Sentry (for frontend)

## Security Hardening

### Backend Security
1. **Rate Limiting**
```bash
npm install express-rate-limit
```

2. **Helmet for HTTP Headers**
```bash
npm install helmet
```

3. **Input Validation**
- Validate all inputs
- Sanitize data
- Use prepared statements (mysql2 does this)

### Frontend Security
1. **Content Security Policy headers**
2. **X-Frame-Options headers**
3. **Remove sensitive logs in production**

### Database Security
1. **Use strong passwords**
2. **Restrict database user privileges**
3. **Enable database logging**
4. **Regular security updates**

## Scaling Strategy

### Phase 1: Basic Deployment (Current)
- Single server
- MySQL database
- Frontend static hosting

### Phase 2: Load Balancing
- Multiple backend instances
- Load balancer (Nginx/HAProxy)
- Database replication

### Phase 3: Advanced Scaling
- Microservices
- Caching layer (Redis)
- Separate read/write databases
- CDN for static content

## Troubleshooting Production Issues

### High CPU Usage
```bash
# Check processes
top

# Check database queries
mysql -u root -p
SHOW PROCESSLIST;

# Optimize queries
EXPLAIN SELECT ...;
```

### Database Connection Issues
```bash
# Check connection status
netstat -an | grep 3306

# Restart MySQL
sudo service mysql restart
```

### Memory Leaks
```bash
# Monitor with PM2
pm2 monit

# Check node process
ps aux | grep node
```

### High Latency
- Check network connectivity
- Monitor database performance
- Check API response times
- Review server resources

## Rollback Procedure

### If Deployment Fails

1. **Backup Current State**
```bash
git stash
git tag deployment_backup_$(date +%s)
```

2. **Rollback to Previous Version**
```bash
git checkout previous-version-tag
npm install
npm start
```

3. **Database Rollback**
```bash
mysql -u root -p EPMS < previous_backup.sql
```

## Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify database connectivity
- [ ] Check SSL certificate validity
- [ ] Monitor error logs
- [ ] Verify backups are working
- [ ] Set up monitoring alerts
- [ ] Document deployment details
- [ ] Update deployment documentation
- [ ] Communicate deployment to team
- [ ] Plan next maintenance window

## Maintenance Schedule

| Task | Frequency | Duration |
|------|-----------|----------|
| Database backup | Daily | 5-10 min |
| Security updates | Weekly | 30 min |
| Database optimization | Weekly | 15 min |
| Full system backup | Monthly | 1 hour |
| Performance review | Weekly | 30 min |
| Log cleanup | Monthly | 15 min |

## Support & On-Call

- **Email Alert:** errors@smartpark.com
- **Slack:** #epms-alerts
- **On-Call:** 24/7 rotation
- **Escalation:** Senior DevOps after 1 hour

---

**Deployment Status:** Ready
**Last Updated:** November 12, 2025
**Version:** 1.0.0
