# Starry Night & Comic Superheroes E-Commerce Platform

A MERN stack e-commerce application for superhero-themed t-shirts with a UI inspired by Starry Night. This platform allows users to browse, purchase t-shirts, and manage their orders while providing administrators with tools to manage products, users, orders, and discounts.

## Project Overview

This e-commerce application enables global users to purchase T-shirts featuring superhero designs with an immersive UI inspired by Starry Night and Comic Superheroes. The platform includes a robust admin panel for managing products, users, orders, and discounts. Users have personalized profiles with avatars based on superhero characters.

## Features

### User-Side Functionalities

#### Authentication & Profile Management
- User signup/login with email/password and Google social login
- Profile setup with custom superhero avatars
- Address management for multiple shipping locations
- Order history and tracking

#### Product Catalog & Shopping
- Explore t-shirt categories and comic-based collections
- Advanced search & filtering (size, price, category, design)
- Product details page with images, descriptions, price, and reviews
- Animated superhero-themed UI interactions
- Add to cart & wishlist functionality

#### Checkout & Payment
- Secure payment gateway integration (Stripe, PayPal, Razorpay)
- Apply discount coupons
- Order confirmation & tracking system

#### Customer Engagement
- Reviews & ratings on products
- Notification system for discounts & order updates
- Referral program for discounts

### Admin Panel Functionalities

#### Product Management
- Add, edit, delete t-shirts with detailed descriptions, categories, and price
- Upload multiple images with superhero-themed previews
- Manage stock levels

#### Order & User Management
- View & manage user orders (update status, refunds, cancellations)
- Access user profiles & support queries

#### Discount & Coupon Management
- Create and manage promotional discounts
- Track coupon usage statistics

#### Dashboard & Analytics
- Sales reports & user engagement tracking
- Product popularity & inventory insights

## Product Categories

### T-Shirt Types
- Oversized
- Acid Wash
- Graphic Printed
- Solid Color
- Polo T-Shirts
- Sleeveless
- Long Sleeve
- Henley
- Hooded
- Crop Tops (for women)

### Comic-Based Themes
- Marvel Universe
- DC Comics
- Anime Superheroes
- Classic Comics (Superman, Batman, Spiderman, etc.)
- Sci-Fi & Fantasy (Star Wars, LOTR, etc.)
- Video Game Characters
- Custom Fan Art

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, OAuth for social login
- **Payments**: Stripe, PayPal, Razorpay
- **Storage**: Cloudinary for product images
- **Deployment**: Vercel (frontend), Render (backend), MongoDB Atlas

## Setup and Installation

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB
- npm or yarn

### Installing Dependencies

#### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Update .env with your configuration

# Start the development server
npm run dev