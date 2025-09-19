'use client';
import React, { useState } from 'react';
import { ReactNode } from 'react';
import MobileHeader from './components/MobileHeader';
import Sidebar from './components/Sidebar';
import ProtectedRoute from '@/components/markdown/ProtectedRoute';

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="max-h-screen h-screen w-full flex flex-col md:flex-row ">
        {/* Mobile Header - only visible on small screens */}
        <MobileHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Sidebar Navigation */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 w-full">{children}</main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
