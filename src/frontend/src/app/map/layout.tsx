'use client';

import ProtectedRoute from '@/components/markdown/ProtectedRoute';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const MapLayout = ({ children }: LayoutProps) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default MapLayout;
