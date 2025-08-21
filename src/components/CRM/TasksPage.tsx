import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Circle,
  Flag
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  createdBy: string;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  relatedClient?: string;
  relatedDeal?: string;
  tags: string[];
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Подготовить коммерческое предложение',
      description: 'Создать КП для TechStore по внедрению CRM системы',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Иван Иванов',
      createdBy: 'Петр Петров',
      dueDate: '2024-01-20',
      createdDate: '2024-01-15',
      relatedClient: 'Анна Петрова',
      relatedDeal: 'Внедрение CRM системы',
      tags: ['Продажи', 'КП']
    },
    {
      id: '2',
      title: 'Провести демонстрацию продукта',
      description: 'Показать возможности системы клиенту WebAgency',
      status: 'todo',
      priority: 'medium',
      assignedTo: 'Анна Сидорова',
      createdBy: 'Иван Иванов',
      dueDate: '2024-01-18',
      createdDate: '2024-01-14',
      relatedClient: 'Михаил Сидоров',
      relatedDeal: 'Разработка веб-сайта',
      tags: ['Демо', 'Презентация']
    },
    {
      id: '3',
      title: 'Отправить договор на подпись',
      description: 'Подготовить и отправить договор клиенту FinTech Corp',
      status: 'completed',
      priority: 'urgent',
      assignedTo: 'Петр Петров',
      createdBy: 'Иван Иванов',
      dueDate: '2024-01-10',
      createdDate: '2024-01-08',
      completedDate: '2024-01-10',
      relatedClient: 'Дмитрий Волков',
      relatedDeal: 'Поддержка IT-инфраструктуры',
      tags: ['Договор', 'Юридические']
    },
    {
      id: '4',
      title: 'Провести исследование рынка',
      description: 'Анализ конкурентов для стартапа StartupIO',
      status: 'todo',
      priority: 'low',
      assignedTo: 'Анна Сидорова',
      createdBy: 'Петр Петров',
      dueDate: '2024-01-25',
      createdDate: '2024-01-12',
      relatedClient: 'Елена Козлова',
      tags: ['Исследование', 'Аналитика']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'Низкий';
      case 'medium': return 'Средний';
      case 'high': return 'Высокий';
      case 'urgent': return 'Срочный';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'todo': return 'К выполнению';
      case 'in-progress': return 'В работе';
      case 'completed': return 'Выполнено';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      default: return <Circle className="h-4 w-4" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  const overdueTasks = tasks.filter(task => 
    task.status !== 'completed' && new Date(task.dueDate) < new Date()
  ).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Задачи</h1>
          <p className="text-gray-600">Управление задачами и проектами</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Добавить задачу
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Всего задач</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">В работе</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Выполнено</p>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Просрочено</p>
              <p className="text-2xl font-bold text-red-600">{overdueTasks}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Поиск задач..."
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
            <option value="todo">К выполнению</option>
            <option value="in-progress">В работе</option>
            <option value="completed">Выполнено</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Все приоритеты</option>
            <option value="urgent">Срочный</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>
      </div>

      {/* Список задач */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Задача</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Статус</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Приоритет</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Ответственный</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Срок</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Связанные</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => {
                const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date();
                return (
                  <tr key={task.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(task.status)}`}>
                          {getStatusIcon(task.status)}
                          <span className="ml-1">{getStatusText(task.status)}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Flag className={`h-4 w-4 mr-2 ${getPriorityColor(task.priority)}`} />
                        <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                          {getPriorityText(task.priority)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="h-4 w-4 mr-2" />
                        {task.assignedTo}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center text-sm ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                        {isOverdue && (
                          <AlertTriangle className="h-4 w-4 ml-2 text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        {task.relatedClient && (
                          <div className="mb-1">Клиент: {task.relatedClient}</div>
                        )}
                        {task.relatedDeal && (
                          <div>Сделка: {task.relatedDeal}</div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}