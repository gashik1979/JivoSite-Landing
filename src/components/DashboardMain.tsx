import { Link } from 'react-router-dom';
import {
    MessageCircle,
    Users,
    Clock,
    TrendingUp,
    BarChart3,
    Calendar,
    Star,
    ArrowUp,
    ArrowDown
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardMain() {
    const { t } = useLanguage();
    const { user } = useAuth();

    const stats = [
        {
            title: t('activeChatsCount'),
            value: '24',
            icon: MessageCircle,
            color: 'blue',
            change: '+12%',
            trend: 'up'
        },
        {
            title: t('totalMessages'),
            value: '1,247',
            icon: TrendingUp,
            color: 'green',
            change: '+8%',
            trend: 'up'
        },
        {
            title: t('responseRate'),
            value: '2.3 ' + t('minutes'),
            icon: Clock,
            color: 'orange',
            change: '-15%',
            trend: 'down'
        },
        {
            title: t('onlineOperators'),
            value: '8',
            icon: Users,
            color: 'purple',
            change: '+2',
            trend: 'up'
        }
    ];

    const recentActivity = [
        {
            id: 1,
            type: 'chat',
            message: 'Новый чат от Анны Петровой',
            time: '2 минуты назад',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        {
            id: 2,
            type: 'message',
            message: 'Сообщение от Михаила Сидорова',
            time: '5 минут назад',
            avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        {
            id: 3,
            type: 'rating',
            message: 'Получена оценка 5 звезд',
            time: '10 минут назад',
            avatar: null
        },
        {
            id: 4,
            type: 'chat',
            message: 'Завершен чат с Еленой Козловой',
            time: '15 минут назад',
            avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
    ];

    const getStatColor = (color: string) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600',
            green: 'bg-green-100 text-green-600',
            orange: 'bg-orange-100 text-orange-600',
            purple: 'bg-purple-100 text-purple-600'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'chat':
                return MessageCircle;
            case 'message':
                return MessageCircle;
            case 'rating':
                return Star;
            default:
                return MessageCircle;
        }
    };

    return (
        <div className="p-6">
            {/* Приветствие */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Добро пожаловать, {user?.fullName}!
                </h1>
                <p className="text-gray-600">
                    Вот обзор вашей активности за сегодня
                </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                <div className="flex items-center mt-2">
                                    {stat.trend === 'up' ? (
                                        <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                                    ) : (
                                        <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                                    )}
                                    <span className={`text-sm font-medium ${
                                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                    {stat.change}
                  </span>
                                </div>
                            </div>
                            <div className={`w-12 h-12 ${getStatColor(stat.color)} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* График активности */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Активность чатов</h3>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Последние 7 дней</span>
                        </div>
                    </div>

                    {/* Простой график-заглушка */}
                    <div className="h-64 bg-gradient-to-t from-blue-50 to-transparent rounded-lg flex items-end justify-between px-4 pb-4">
                        {[65, 45, 78, 52, 89, 67, 94].map((height, index) => (
                            <div
                                key={index}
                                className="bg-blue-500 rounded-t-md w-8 transition-all duration-300 hover:bg-blue-600"
                                style={{ height: `${height}%` }}
                            ></div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                        <span>Пн</span>
                        <span>Вт</span>
                        <span>Ср</span>
                        <span>Чт</span>
                        <span>Пт</span>
                        <span>Сб</span>
                        <span>Вс</span>
                    </div>
                </div>

                {/* Недавняя активность */}
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Недавняя активность</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Показать все
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.map((activity) => {
                            const IconComponent = getActivityIcon(activity.type);
                            return (
                                <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex-shrink-0">
                                        {activity.avatar ? (
                                            <img
                                                src={activity.avatar}
                                                alt=""
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                                <IconComponent className="h-5 w-5 text-yellow-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {activity.message}
                                        </p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Быстрые действия */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/dashboard/chats" className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                        <div className="text-center">
                            <MessageCircle className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                Начать новый чат
              </span>
                        </div>
                    </Link>

                    <Link to="/dashboard/analytics" className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                        <div className="text-center">
                            <BarChart3 className="h-8 w-8 text-gray-400 group-hover:text-green-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-green-600">
                Посмотреть отчеты
              </span>
                        </div>
                    </Link>

                    <Link to="/dashboard/clients" className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                        <div className="text-center">
                            <Users className="h-8 w-8 text-gray-400 group-hover:text-purple-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-purple-600">
                Управление клиентами
              </span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}