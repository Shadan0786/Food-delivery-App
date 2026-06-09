# 🍔 Food Delivery App

A modern food delivery application that allows users to browse restaurants, order food online, track deliveries, and manage their orders seamlessly.

## 📋 Features

### 👤 User Features
- User Registration and Login
- Secure Authentication (JWT)
- Browse Restaurants and Menus
- Search and Filter Food Items
- Add Items to Cart
- Place Orders Online
- Order History
- Real-time Order Tracking
- Profile Management

### 🍽️ Restaurant Features
- Restaurant Registration
- Manage Menu Items
- Update Food Availability
- View and Process Orders
- Order Status Management

### 🚚 Delivery Features
- Delivery Partner Login
- View Assigned Orders
- Update Delivery Status
- Track Delivery Progress

### 🛠️ Admin Features
- Manage Users
- Manage Restaurants
- Manage Orders
- Dashboard and Analytics

## 🏗️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JSON Web Token (JWT)
- bcrypt.js

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shadan0786/Food-delivery-App.git
   cd Food-delivery-App
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../admin
   npm install
   ```

4. **Environment Variables**
   Create a `.env` file in the backend directory with the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the Application**
   
   Backend:
   ```bash
   cd backend
   npm start
   ```

   Frontend:
   ```bash
   cd admin
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📁 Project Structure

```
Food-delivery-App/
├── backend/              # Node.js/Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── admin/                # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔐 Authentication

- Users can register and login with email and password
- Passwords are hashed using bcrypt.js for security
- JWT tokens are used for session management
- Protected routes require valid JWT tokens

## 📦 API Endpoints

### User Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile

### Restaurant Routes
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (admin)
- `PUT /api/restaurants/:id` - Update restaurant

### Order Routes
- `POST /api/orders` - Place an order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - Get all user orders
- `PUT /api/orders/:id` - Update order status

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License. See the LICENSE file for more details.

## 👨‍💻 Author

**Shadan0786** - [GitHub Profile](https://github.com/Shadan0786)

## 📧 Support

For issues, questions, or feedback, please:
- Open an issue on the [GitHub repository](https://github.com/Shadan0786/Food-delivery-App/issues)
- Contact the author directly

## 🎯 Future Enhancements

- Payment gateway integration (Stripe, Razorpay)
- Email notifications
- SMS notifications
- Advanced analytics dashboard
- Mobile app development
- Multi-language support
- Rating and review system

---

**Last Updated**: June 2026
