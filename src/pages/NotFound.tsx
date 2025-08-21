import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center p-8 rounded-2xl bg-white shadow-xl"
            >
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Oops! The page you’re looking for doesn’t exist.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                >
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}
