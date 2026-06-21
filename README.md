# Berdevision Website - Backend

Complete backend infrastructure for the Berdevision portfolio website.

## 🚀 Features

- **Express.js Server** - RESTful API endpoints
- **MongoDB Database** - Store portfolio items and contact messages
- **Contact Form** - Email integration with nodemailer
- **Portfolio Management** - CRUD operations for portfolio items
- **Admin Authentication** - JWT-based authentication system
- **Admin Dashboard API** - Statistics and content management

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB Atlas account (free tier available)
- Email service (Gmail, SendGrid, etc.)

## 🔧 Setup Instructions

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Required configurations:**

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/berdevision

# Email (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Server
PORT=5000
JWT_SECRET=your-secret-key

# Admin
ADMIN_EMAIL=admin@berdevision.com
```

### 3. Start Development Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## 📚 API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `PATCH /api/contact/:id/read` - Mark as read
- `DELETE /api/contact/:id` - Delete message

### Portfolio
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single item
- `POST /api/portfolio` - Create item (admin)
- `PUT /api/portfolio/:id` - Update item (admin)
- `DELETE /api/portfolio/:id` - Delete item (admin)

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user

### Admin Dashboard
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/contacts` - All messages
- `GET /api/admin/portfolio` - All portfolio items
- `POST /api/admin/portfolio` - Create portfolio item
- `PUT /api/admin/portfolio/:id` - Update portfolio item
- `DELETE /api/admin/portfolio/:id` - Delete portfolio item

## 🗄️ Database Schema

### Contact Model
```javascript
{
  name: String,
  email: String,
  subject: String,
  message: String,
  read: Boolean,
  createdAt: Date
}
```

### Portfolio Model
```javascript
{
  title: String,
  category: 'video' | 'photo' | 'motion' | 'commercial' | 'other',
  description: String,
  thumbnail: String (URL),
  videoUrl: String (URL),
  tags: [String],
  featured: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  email: String,
  password: String (hashed),
  role: 'admin' | 'editor',
  createdAt: Date
}
```

## 🔐 Authentication

JWT tokens are required for admin endpoints. Include in headers:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📧 Email Setup

### Gmail Setup
1. Enable 2-factor authentication
2. Generate app-specific password
3. Use the app password in `EMAIL_PASS`

### Other Services
- SendGrid
- Mailgun
- AWS SES

## 🚀 Deployment

### Netlify Functions
1. Create `netlify/functions/api.js`
2. Export the Express app
3. Set environment variables in Netlify dashboard

### Vercel
1. Move server code to `api/` directory
2. Export handler functions
3. Configure in `vercel.json`

### Traditional Hosting
1. Set `NODE_ENV=production`
2. Configure domain DNS
3. Set environment variables on host

## 🛠️ Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start with nodemon (development)
npm run build      # Build command
```

## 📝 License

MIT License - feel free to use this template!

## 🤝 Support

For issues or questions, contact: admin@berdevision.com
