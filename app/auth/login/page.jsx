"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "./loading";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/api/login", formData);

      if (response.data.status) {
        const userData = response.data.data.user;
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Check user role and redirect accordingly
        if (userData.role === 'doctor') {
          router.push('/dashboard');
        } else {
          router.push("/main-site");
        }
      } else {
        setError(response.data.message || "فشل تسجيل الدخول");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "حدث خطأ في تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.push("../auth/register");
    }, 500);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      <motion.div
        className="bg-white rounded-[50px] shadow-xl overflow-hidden max-w-4xl w-full mx-4"
        animate={{
          x: isAnimating ? "100%" : 0,
          opacity: isAnimating ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Welcome Section */}
          <motion.div
            className="bg-blue-500 text-white p-16 md:w-1/2 flex flex-col justify-center items-center text-center rounded-r-[50px]"
            animate={{
              x: isAnimating ? "100%" : 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h2 className="text-4xl font-bold mb-4">Hello, Welcome!</h2>
            <p className="mb-6 text-blue-100">Don't have an account?</p>
            <button
              onClick={handleRegisterClick}
              className="px-10 py-2.5 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-500 transition-all duration-300"
            >
              Register
            </button>
          </motion.div>

          {/* Right Side - Login Form */}
          <div className="p-16 md:w-1/2">
            <h2 className="text-3xl font-bold mb-10 text-center">Login</h2>

            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Username"
                  className="w-full px-6 py-3.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full px-6 py-3.5 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Login
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">
                  or login with social platforms
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="p-3 border rounded-full hover:bg-gray-50 transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 border rounded-full hover:bg-gray-50 transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 border rounded-full hover:bg-gray-50 transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="p-3 border rounded-full hover:bg-gray-50 transition-colors duration-300"
                  >
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
