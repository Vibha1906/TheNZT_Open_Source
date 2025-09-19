import Sidebar from '@/components/layout/Sidebar';
import ProtectedRoute from '@/components/markdown/ProtectedRoute';
import React from 'react';
import { ReactNode } from 'react';
const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="lg:flex bg-white w-full">
        <div className="hidden xl:block">
          <Sidebar isChartInsightChatRoute={true} />
        </div>
        {children}
      </div>
    </ProtectedRoute>
  );
};

export default ChatLayout;
