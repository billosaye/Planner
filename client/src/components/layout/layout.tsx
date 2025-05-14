import React from 'react';
import { Link } from '@tanstack/react-router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            TODO App
          </h1>
          <nav className="space-x-4 sm:space-x-6">
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition-colors duration-200 text-sm sm:text-base"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 sm:p-6">{children}</main>
    </div>
  );
};

export default Layout;