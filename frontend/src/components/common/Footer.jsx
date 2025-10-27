import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Designed and Developed by Romanchal Nayak
        </p>
      </div>
    </footer>
  );
}

export default Footer;
