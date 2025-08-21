import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

interface User {
  id: string;
  email: string;
  fullName?: string;
  company?: string;
  role: 'operator' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);

  const API_HOST = import.meta.env.VITE_API_HOST;
  axios.defaults.baseURL = API_HOST;

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('chatpro_user');
    navigate('/'); // редирект на главную при логауте
  };

  // Интерсептор для axios: Authorization + XDEBUG_SESSION
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (import.meta.env.VITE_APP_ENV === 'dev') {
        try {
          // создаём URL с baseURL
          const url = new URL(config.url!, API_HOST);
          url.searchParams.set('XDEBUG_SESSION', 'PHPSTORM');
          config.url = url.toString(); // оставляем полный URL
        } catch (e) {
          console.error('Invalid URL in axios interceptor', config.url);
        }
      }

      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  // Проверка токена и обновление данных пользователя
  useEffect(() => {
    setLoading(true);

    const checkTokenAndUpdateUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setExpired(true);
        logout();
        return;
      }

      try {
        // Проверка JWT на клиенте
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Math.floor(Date.now() / 1000)) {
          setExpired(true);
          logout();
          return;
        }
        setExpired(false);

        // Восстанавливаем локально сохранённого пользователя
        const savedUser = localStorage.getItem('chatpro_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem('chatpro_user');
          }
        }

        // Получаем актуальные данные с сервера
        const res = await axios.get('/user/profile'); // теперь интерсептор добавит Authorization + XDEBUG_SESSION
        setUser(res.data);
        localStorage.setItem('chatpro_user', JSON.stringify(res.data));
      } catch (err) {
        console.error('Token check / profile update failed:', err);
        setExpired(true);
        logout();
      }
    };

    checkTokenAndUpdateUser();
    const interval = setInterval(checkTokenAndUpdateUser, 60_000); // проверка каждую минуту

    setLoading(false);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('chatpro_user', JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Ошибка логина:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem('chatpro_user', JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Ошибка логина:", error);
      return false;
    } finally {
      setLoading(false);
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // имитация API
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      fullName: userData.fullName,
      company: userData.company,
      role: 'operator',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    };
    setUser(newUser);
    localStorage.setItem('chatpro_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  return (
      <AuthContext.Provider value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading
      }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
