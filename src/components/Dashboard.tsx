import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { 
  MessageCircle, 
  Users, 
  Clock, 
  TrendingUp, 
  Settings, 
  User, 
  LogOut,
  Send,
  MoreVertical,
  Search
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {useAuth} from "../contexts/AuthContext.tsx";

export default function Dashboard() {
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    window.location.pathname = '/';
  };

  const stats = [
    {
      title: t('activeChatsCount'),
      value: '24',
      icon: MessageCircle,
      color: 'blue',
      change: '+12%'
    },
    {
      title: t('totalMessages'),
      value: '1,247',
      icon: TrendingUp,
      color: 'green',
      change: '+8%'
    },
    {
      title: t('responseRate'),
      value: '2.3' + t('minutes'),
      icon: Clock,
      color: 'orange',
      change: '-15%'
    },
    {
      title: t('onlineOperators'),
      value: '8',
      icon: Users,
      color: 'purple',
      change: '+2'
    }
  ];

  const chats = [
    {
      id: 1,
      name: 'Анна Петрова',
      lastMessage: 'Здравствуйте! Есть вопрос по тарифам',
      time: '2 ' + t('minutes') + ' ' + t('ago'),
      unread: 3,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      online: true
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      lastMessage: 'Спасибо за помощь!',
      time: '5 ' + t('minutes') + ' ' + t('ago'),
      unread: 0,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      online: false
    },
    {
      id: 3,
      name: 'Елена Козлова',
      lastMessage: 'Можно ли настроить интеграцию?',
      time: '15 ' + t('minutes') + ' ' + t('ago'),
      unread: 1,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'client',
      text: 'Здравствуйте! Есть вопрос по тарифам',
      time: '14:30',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      id: 2,
      sender: 'operator',
      text: 'Здравствуйте! Конечно, с удовольствием помогу с выбором тарифа. Какие у вас требования?',
      time: '14:31'
    },
    {
      id: 3,
      sender: 'client',
      text: 'Нам нужно обслуживать около 500 чатов в месяц, 3 оператора',
      time: '14:32',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      id: 4,
      sender: 'operator',
      text: 'Отлично! Для ваших потребностей идеально подойдет тариф "Профессиональный". Он включает до 1000 чатов в месяц и до 5 операторов.',
      time: '14:33'
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (


    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">

              <Link to="/" className="flex items-center">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ChatPro</span>
              </Link>

            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">Оператор</span>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 ${getStatColor(stat.color)} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex h-[600px]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('recentChats')}</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Поиск чатов..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-full">
                {chats.map((chat, index) => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(index)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === index ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                          <p className="text-xs text-gray-500">{chat.time}</p>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={chats[selectedChat]?.avatar}
                      alt={chats[selectedChat]?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{chats[selectedChat]?.name}</p>
                      <p className="text-sm text-gray-500">{t('typing')}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'operator' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                      message.sender === 'operator' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      {message.sender === 'client' && (
                        <img
                          src={message.avatar}
                          alt="Client"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.sender === 'operator'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'operator' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t('newMessage')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}