import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "../layout/Header";
import Footer from "../layout/Footer";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12 text-center">
        <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-purple-300 mb-4">Order Placed Successfully!</h1>
        <p className="text-slate-300 mb-6">Thank you for your purchase. You'll receive a confirmation email soon.</p>
        <Link
          to="/products"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg inline-flex items-center"
        >
          Continue Shopping
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;