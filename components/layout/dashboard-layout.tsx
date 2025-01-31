'use client';

import { Sidebar } from './sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-black">
      <Sidebar />
      <div className="ml-20 lg:ml-72 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
