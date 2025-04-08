const dotenv = require("dotenv");
const express = require('express');
const authRoutes = require('./routes/auth');
const googleRoutes = require('./routes/google');
const cors = require('cors');
const connectDB = require('./config/db');
const helmet = require('helmet')
const authMiddleware = require('./middleware/authenticateToken')
dotenv.config();
const app = express();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend's origin (React app)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials to be sent with requests
  };

  app.use(helmet());

// Set a more lenient CSP that allows favicon.ico and other resources
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],  // Allow the page itself to load resources
      imgSrc: ["'self'", "http://localhost:5002"],  // Allow images from the same origin and backend
      connectSrc: ["'self'", "http://localhost:5002"],  // Allow backend connections
      scriptSrc: ["'self'"],  // Allow scripts from the same origin
      styleSrc: ["'self'", "'unsafe-inline'"],  // Allow styles from the same origin and inline styles
      fontSrc: ["'self'"],  // Allow fonts from the same origin
    },
  })
);
app.use(cors(corsOptions));
// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/google', googleRoutes);
const PORT = process.env.PORT || 5002;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
