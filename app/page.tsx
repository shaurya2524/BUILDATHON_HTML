"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners"; // A common loading spinner for React

// Unified type for all form fields, with fields optional as needed
type FormFields = {
  email?: string;
  contact?: string;
  password?: string;
  confirmPassword?: string;
};

// Custom Message Box component to replace `alert()`
const MessageBox = ({
  message,
  onClose,
  isError = false,
}: {
  message: string;
  onClose: () => void;
  isError?: boolean;
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div
      className={`relative rounded-lg p-6 shadow-xl ${
        isError ? "bg-red-500" : "bg-green-500"
      } text-white max-w-sm mx-4`}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white hover:text-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <p className="font-semibold text-lg">{message}</p>
    </div>
  </div>
);

// ---------------- COMPONENT ----------------
export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [inputMode, setInputMode] = useState<"email" | "phone">("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(
    null,
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormFields>();

  // Use a custom function to handle the message box state
  const showAlert = (text: string, isError: boolean = false) => {
    setMessage({ text, isError });
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // This console.log will fire only if all validation rules pass.
    console.log("onSubmit function called. Data:", data);

    setLoading(true);
    setMessage(null); // Clear previous messages

    try {
      if (mode === "signup") {
        // Password confirmation check for signup
        if (data.password !== data.confirmPassword) {
          showAlert("Passwords do not match.", true);
          setLoading(false);
          return;
        }

        // Make API request to the server-side auth endpoint
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "signup", data }),
        });

        const result = await response.json();

        if (response.ok) {
          showAlert(result.message);
          router.push("/dashboard");
        } else {
          showAlert(result.message || "Sign up failed.", true);
        }
      } else {
        // Login logic
        const loginData = {
          identifier: inputMode === "email" ? data.email : data.contact,
          password: data.password,
        };

        const response = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mode: "login", data: loginData }),
        });

        const result = await response.json();

        if (response.ok) {
          showAlert(result.message);
          router.push("/dashboard");
        } else {
          showAlert(result.message || "Login failed.", true);
        }
      }
    } catch (error) {
      // This will log any network or other unexpected errors
      console.error("Fetch or data parsing error:", error);
      showAlert("Something went wrong. Please try again later.", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-inter">
      <div className="max-w-md w-full space-y-6 bg-white shadow-lg rounded-[30px] p-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 bg-[#00BDAA] rounded-full flex items-center justify-center text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c-1.105 0-2 .895-2 2v3h4v-3c0-1.105-.895-2-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 11V7a6 6 0 1112 0v4M5 11h14v10H5V11z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Polisync</h1>
          <p className="text-gray-600 text-sm">Professional Insurance Management</p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl text-black font-semibold">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h2>
          <p className="text-gray-600 text-sm">
            {mode === "login"
              ? "Sign in to your advisor dashboard"
              : "Start managing your policies with us"}
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="relative flex rounded-md overflow-hidden border">
          <motion.div
            layout
            className="absolute top-0 bottom-0 w-1/2 bg-[#00BDAA]"
            animate={{ x: mode === "login" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            onClick={() => setMode("login")}
            type="button"
            className={`flex-1 py-2 text-sm font-medium relative z-10 ${
              mode === "login" ? "text-white" : "text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            type="button"
            className={`flex-1 py-2 text-sm font-medium relative z-10 ${
              mode === "signup" ? "text-white" : "text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === "login" ? (
            <>
              {/* Login Input Mode Toggle */}
              <div className="relative flex rounded-md overflow-hidden border">
                <motion.div
                  layout
                  className="absolute top-0 bottom-0 w-1/2 bg-[#00BDAA]"
                  animate={{ x: inputMode === "email" ? "0%" : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => setInputMode("email")}
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium relative z-10 ${
                    inputMode === "email" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setInputMode("phone")}
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium relative z-10 ${
                    inputMode === "phone" ? "text-white" : "text-gray-700"
                  }`}
                >
                  Phone
                </button>
              </div>

              {/* Email/Phone Input */}
              {inputMode === "email" ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="advisor@insureace.com"
                    {...register("email", { required: "Email is required" })}
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    {...register("contact", { required: "Phone is required" })}
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Sign Up Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="advisor@insureace.com"
                  {...register("email", { required: "Email is required" })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  {...register("contact", { required: "Phone is required" })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className="mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 focus:ring-[#00BDAA] focus:border-[#00BDAA]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#00BDAA] text-white rounded-[12px] font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <ClipLoader color="#fff" size={20} />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
      {message && (
        <MessageBox
          message={message.text}
          isError={message.isError}
          onClose={() => setMessage(null)}
        />
      )}
    </div>
  );
}
