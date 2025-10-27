import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="auth-layout flex items-center justify-center min-h-screen bg-gray-100">
      <div className="auth-box bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* App Logo (optional) */}
        <div className="text-center mb-6">
          <img
            src="/logo192.png" // apne logo ka path yahan do
            alt="App Logo"
            className="mx-auto w-16 h-16"
          />
          <h2 className="text-2xl font-bold mt-2 text-gray-700">
            Welcome Back 
          </h2>
          <p className="text-sm text-gray-500">Please sign in to continue</p>
        </div>

        {/* Outlet: renders Login/Register/ForgotPassword component */}
        <Outlet />

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
