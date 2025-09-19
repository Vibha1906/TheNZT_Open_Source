'use client';

import { useAuthStore } from '@/store/useZustandStore';
import LoaderComponent from '../Loader';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return !isAuthenticated ? <LoaderComponent /> : <>{children}</>;
};

export default ProtectedRoute;
