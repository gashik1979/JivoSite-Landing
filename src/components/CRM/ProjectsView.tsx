import React, { useState } from 'react';
import { 
  Folder, 
  Plus, 
  Search, 
  MoreVertical,
  Users,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  lead: {
    name: string;
    avatar: string;
  };
  members: Array<{
    name: string;
    avatar: string;
  }>;
  status: 'active' | 'completed' | 'on-hold';
  progress: number;
  totalTasks: number;
  completedTasks: number;
  dueDate: string;
  createdAt: string;
  category: string;
}

export default function ProjectsView() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'ChatPro Platform',
      key: 'CHAT',
      description: 'Основная платформа для онлайн-чатов с клиентами',
      lead: {
        name: 'Иван Иванов',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      members: [
        {
          name: 'Анна Сидорова',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        {
          name: 'Петр Петров',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        {
          name: 'Елена Козлова',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      ],
      status: 'active',
      progress: 75,
      totalTasks: 24,
      completedTasks: 18,
      dueDate: '2024-03-15',
      createdAt: '2024-01-01',
      category: 'Разработка'
    },
    {
      id: '2',
      name: 'Mobile App',
      key: 'MOB',
      description: 'Мобильное приложение для iOS и Android',
      lead: {
        name: 'Анна Сидорова',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      members: [
        {
          name: 'Михаил Сидоров',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        {
          name: 'Дмитрий Волков',
          avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      ],
      status: 'active',
      progress: 45,
      totalTasks: 16,
      completedTasks: 7,
      dueDate: '2024-04-30',
      createdAt: '2024-01-15',
      category: 'Мобильная разработка'
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      key: 'DASH',
      description: 'Панель аналитики и отчетности',
      lead: {
        name: 'Петр Петров',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      members: [
        {
          name: 'Елена Козлова',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      ],
      status: 'completed',
      progress: 100,
      totalTasks: 12,
      completedTasks: 12,
      dueDate: '2024-01-31',
      createdAt: '2023-12-01',
      category: 'Аналитика'
    },
    {
      id: '4',
      name: 'API Documentation',
      key: 'DOC',
      description: 'Документация для разработчиков API',
      lead: {
        name: 'Елена Козлова',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      members: [
        {
          name: 'Иван Иванов',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        }
      ],
      status: 'on-hold',
      progress: 30,
      totalTasks: 8,
      completedTasks: 2,
      dueDate: '2024-02-28',
      createdAt: '2024-01-10',
      category: 'Документация'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активный';
      case 'completed': return 'Завершен';
      case 'on-hold': return 'Приостановлен';
      default: return status;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Проекты</h1>
          <p className="text-gray-600">Управление проектами и командами</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Создать проект
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Поиск проектов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="completed">Завершенные</option>
            <option value="on-hold">Приостановленные</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Folder className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <span className="text-sm text-gray-500">{project.key}</span>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Status and Category */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Прогресс</span>
                  <span className="text-sm text-gray-600">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Target className="h-4 w-4" />
                    <span className="text-xs">Задачи</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {project.completedTasks}/{project.totalTasks}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Срок</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {new Date(project.dueDate).toLocaleDateString('ru-RU', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Команда</span>
                </div>
                <div className="flex items-center space-x-1">
                  {/* Lead */}
                  <img
                    src={project.lead.avatar}
                    alt={project.lead.name}
                    className="w-6 h-6 rounded-full object-cover border-2 border-blue-500"
                    title={`${project.lead.name} (Руководитель)`}
                  />
                  {/* Members */}
                  {project.members.slice(0, 3).map((member, index) => (
                    <img
                      key={index}
                      src={member.avatar}
                      alt={member.name}
                      className="w-6 h-6 rounded-full object-cover border-2 border-white"
                      title={member.name}
                    />
                  ))}
                  {project.members.length > 3 && (
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-xs text-gray-600">+{project.members.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Создан {new Date(project.createdAt).toLocaleDateString('ru-RU')}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Обновлен сегодня</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Проекты не найдены</h3>
          <p className="text-gray-600 mb-4">Попробуйте изменить параметры поиска или создайте новый проект</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Создать первый проект
          </button>
        </div>
      )}
    </div>
  );
}