import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: Array<"ADMIN" | "SECRETARIA">;
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (!user || user.type === "NONE") {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.type)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}