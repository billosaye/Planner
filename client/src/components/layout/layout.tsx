import React from 'react';
import { Link } from '@tanstack/react-router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">TODO App</h1>
          <nav>
            <Link to="/" className="text-white hover:underline mr-4">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="p-4 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;