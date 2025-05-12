import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">TODO App</h1>
      </header>
      <main className="p-4 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;