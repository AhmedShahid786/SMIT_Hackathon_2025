import { useContext, useState } from "react";
import {
  Heart,
  Mail,
  Lock,
  Menu,
  X,
  ChevronRight,
  Phone,
  MapPin,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from "../constants/routes";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    setLoading(true);

    try {
      const response = await axios.post(routes.login, data);
      console.log(response.data);

      if (response.data.success) {
        const { user, token } = response.data.data;
        Cookies.set("token", token);
        setUser(user);
        setToken(token);
        navigate("./admin/Dashboard");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Login failed.";
      setError("root", { message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <img
                src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
                alt="Saylani Welfare"
                className="h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-[#8dc63f] transition-colors duration-200"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#8dc63f] transition-colors duration-200"
              >
                Programs
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-[#8dc63f] transition-colors duration-200"
              >
                Contact
              </a>
              <button className="bg-[#0066b3] text-white px-6 py-2 rounded-full hover:bg-[#005294] transition-colors duration-200 flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-[#8dc63f]"
              >
                About US
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-[#8dc63f]"
              >
                Programs
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-[#8dc63f]"
              >
                Contact
              </a>
              <button className="w-full mt-2 bg-[#0066b3] text-white px-6 py-2 rounded-full hover:bg-[#005294] flex items-center justify-center">
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0066b3]/90 to-[#8dc63f]/90 z-10" />
        <div
          className="relative min-h-[450px] flex items-center justify-center bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Empowering Communities Through Compassion
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join us in making a difference in the lives of millions through
              education, healthcare, and social welfare programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#0066b3] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                Learn More
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
              <button className="bg-[#8dc63f] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7db535] transition-colors duration-200 flex items-center justify-center">
                <Heart className="w-5 h-5 mr-2" />
                Support Our Cause
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="max-w-md mx-auto -mt-20 relative z-30 px-4 sm:px-0 pt-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Login to Your Account
            </h2>
            <p className="text-gray-600 mt-2">
              Access your dashboard to manage resources
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent outline-none transition-all duration-200`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  {...register("password")}
                  className={`w-full pl-10 pr-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-[#8dc63f] focus:border-transparent outline-none transition-all duration-200`}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {errors.root && (
              <div className="text-center">
                <p className="text-red-500 text-sm">{errors.root.message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0066b3] to-[#8dc63f] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-50 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8 text-[#0066b3]" />
              <div>
                <h3 className="font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600">+92 111 729 526</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-8 h-8 text-[#0066b3]" />
              <div>
                <h3 className="font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600">info@saylaniwelfare.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="w-8 h-8 text-[#0066b3]" />
              <div>
                <h3 className="font-semibold text-gray-800">Visit Us</h3>
                <p className="text-gray-600">A-25, Bahadurabad, Karachi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0066b3] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://saylaniwelfare.com/static/media/logo_saylaniwelfare.22bf709605809177256c.png"
            alt="Saylani Welfare"
            className="h-12 w-auto mx-auto mb-4 brightness-0 invert"
          />
          <p className="text-white/80">
            © {new Date().getFullYear()} Saylani Welfare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
