import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    MessageCircle,
    Home,
    BarChart3,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    UserCheck,
    DollarSign,
    CheckSquare
    Kanban
} from 'lucide-react';
import {useLanguage} from '../contexts/LanguageContext';
import {useAuth} from '../contexts/AuthContext';
import LanguageDropdown from './LanguageDropdown';

interface DashboardLayoutProps {
    children: React.ReactNode;
    currentPage?: string;
}

export default function DashboardLayout({children, currentPage = 'main'}: DashboardLayoutProps) {
    const {t} = useLanguage();
    const {user, logout} = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        {name: 'Главная', href: '#', icon: Home, id: 'main'},
        {name: 'Чаты', href: '/dashboard?page=chats', icon: MessageCircle, id: 'chats'},
        {name: 'CRM', href: '/dashboard/crm', icon: Kanban, id: 'crm'},
        {name: 'Клиенты', href: '/dashboard/clients', icon: UserCheck, id: 'clients'},
        {name: 'Сделки', href: '/dashboard/deals', icon: DollarSign, id: 'deals'},
        {name: 'Задачи', href: '/dashboard/tasks', icon: CheckSquare, id: 'tasks'},
        {name: 'Аналитика', href: '#', icon: BarChart3, id: 'analytics'},
        {name: 'Команда', href: '#', icon: Users, id: 'team'},
        {name: 'Настройки', href: '#', icon: Settings, id: 'settings'},
    ];

    const handleLogout = () => {
        logout();
        window.location.pathname = '/';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
                    <div className="flex h-16 items-center justify-between px-4 border-b">

                        <Link to="/" className="flex items-center">
                            <MessageCircle className="h-8 w-8 text-blue-600"/>
                            <span className="ml-2 text-xl font-bold text-gray-900">ChatPro</span>
                        </Link>

                        <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="h-6 w-6"/>
                        </button>
                    </div>
                    <nav className="flex-1 px-4 py-4">
                        <ul className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            currentPage === item.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        <item.icon className="mr-3 h-5 w-5"/>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200">

                    <Link to="/" className="flex items-center h-16 px-4 border-b">
                        <MessageCircle className="h-8 w-8 text-blue-600"/>
                        <span className="ml-2 text-xl font-bold text-gray-900">ChatPro</span>
                    </Link>

                    <nav className="flex-1 px-4 py-4">
                        <ul className="space-y-2">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            currentPage === item.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        <item.icon className="mr-3 h-5 w-5"/>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                            >
                                <Menu className="h-6 w-6"/>
                            </button>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                                <Bell className="h-5 w-5"/>
                                <span
                                    className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                            </button>

                            <LanguageDropdown/>

                            <div className="flex items-center space-x-3">
                                <img
                                    src={user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-gray-700">{user?.fullName}</p>
                                    <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Администратор' : 'Оператор'}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Выйти"
                            >
                                <LogOut className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}