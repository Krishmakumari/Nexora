# Mock E-Commerce Cart - Full Stack Application

A complete full-stack shopping cart application built for Vibe Commerce screening assignment.

## 🚀 Features

- **Product Catalog**: Display 5+ mock products with prices
- **Shopping Cart**: Add/remove items, view totals
- **Checkout Process**: Customer form with name/email
- **Order Receipt**: Mock receipt with timestamp
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Proper error handling throughout
- **Security**: CORS protection, input validation, helmet security

## 🛠️ Tech Stack

**Frontend:**
- React 19 with Vite
- Tailwind CSS for styling
- Axios for API calls
- Responsive design

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- CORS and Helmet for security
- Environment variables

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local installation)

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create `.env` file in backend directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexora
FRONTEND_URL=http://localhost:5173
```

## 🔗 API Endpoints

- `GET /api/products` - Get all products
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items and total
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout
- `GET /api/seed` - Seed initial products (run once)

## 🎯 Usage

1. **Start MongoDB** service on your system
2. **Run Backend**: `cd backend && npm start`
3. **Seed Products**: Visit `http://localhost:5000/api/seed`
4. **Run Frontend**: `cd frontend && npm run dev`
5. **Open Browser**: Visit `http://localhost:5173`

## 📱 Application Flow

1. **Products Page**: Browse available products and add to cart
2. **Cart View**: Review items, quantities, and total
3. **Checkout**: Enter customer information
4. **Receipt**: View order confirmation

## 🔒 Security Features

- CORS protection with specific origin
- Helmet.js security headers
- Input validation and sanitization
- Error handling with proper status codes
- Request size limits

## 📸 Screenshots

### Products Grid
- Clean product display with "Add to Cart" buttons
- Responsive grid layout

### Shopping Cart
- Item list with quantities and prices
- Remove functionality
- Running total calculation

### Checkout Form
- Customer information form
- Order summary
- Form validation

### Order Receipt
- Success confirmation
- Order details and timestamp
- Option to start new order

## 🎥 Demo Video

[Demo video link will be provided]

## 👨‍💻 Developer

Built by [Your Name] for Vibe Commerce internship screening.

## 📝 Assignment Requirements Completed

✅ Backend APIs (products, cart, checkout)  
✅ Frontend React components  
✅ MongoDB integration  
✅ Responsive design  
✅ Error handling  
✅ Mock checkout process  
✅ GitHub repository with proper structure  
✅ README with setup instructions  

## 🚀 Deployment

The application is ready for deployment. Backend can be deployed to services like Railway, Render, or Heroku. Frontend can be deployed to Vercel, Netlify, or similar platforms.