import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

interface AuthGuardProps {
    children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/" replace />;

    return <>{children}</>;
}