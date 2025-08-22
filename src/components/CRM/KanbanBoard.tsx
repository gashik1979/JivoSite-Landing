import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  User,
  Calendar,
  Flag,
  MessageSquare,
  Paperclip,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  reporter: {
    id: string;
    name: string;
    avatar: string;
  };
  type: 'task' | 'bug' | 'story' | 'epic';
  labels: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  comments: number;
  attachments: number;
  storyPoints?: number;
  project: string;
}

interface KanbanBoardProps {
  onTaskClick: (task: Task) => void;
}

const columns = [
  { id: 'backlog', title: 'Бэклог', color: 'bg-gray-100' },
  { id: 'todo', title: 'К выполнению', color: 'bg-blue-100' },
  { id: 'in-progress', title: 'В работе', color: 'bg-yellow-100' },
  { id: 'review', title: 'На проверке', color: 'bg-purple-100' },
  { id: 'done', title: 'Готово', color: 'bg-green-100' }
];

export default function KanbanBoard({ onTaskClick }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'TASK-1',
      title: 'Разработка API для авторизации',
      description: 'Создать REST API endpoints для регистрации и входа пользователей',
      status: 'in-progress',
      priority: 'high',
      assignee: {
        id: '1',
        name: 'Иван Иванов',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      reporter: {
        id: '2',
        name: 'Петр Петров',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      type: 'task',
      labels: ['Backend', 'API'],
      dueDate: '2024-01-25',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-16',
      comments: 3,
      attachments: 1,
      storyPoints: 8,
      project: 'ChatPro'
    },
    {
      id: 'BUG-2',
      title: 'Исправить баг с отправкой сообщений',
      description: 'Сообщения не отправляются при нажатии Enter в Safari',
      status: 'todo',
      priority: 'highest',
      assignee: {
        id: '3',
        name: 'Анна Сидорова',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      reporter: {
        id: '4',
        name: 'Елена Козлова',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      type: 'bug',
      labels: ['Frontend', 'Critical'],
      dueDate: '2024-01-20',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16',
      comments: 5,
      attachments: 2,
      storyPoints: 3,
      project: 'ChatPro'
    },
    {
      id: 'STORY-3',
      title: 'Пользователь может настроить тему чата',
      description: 'Как пользователь, я хочу настроить цветовую схему чата, чтобы она соответствовала брендингу моего сайта',
      status: 'backlog',
      priority: 'medium',
      assignee: {
        id: '1',
        name: 'Иван Иванов',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      reporter: {
        id: '2',
        name: 'Петр Петров',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      type: 'story',
      labels: ['Frontend', 'UX'],
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      comments: 1,
      attachments: 0,
      storyPoints: 5,
      project: 'ChatPro'
    },
    {
      id: 'TASK-4',
      title: 'Настроить CI/CD pipeline',
      description: 'Автоматизировать процесс деплоя на production',
      status: 'review',
      priority: 'low',
      assignee: {
        id: '5',
        name: 'Михаил Сидоров',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      reporter: {
        id: '2',
        name: 'Петр Петров',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      type: 'task',
      labels: ['DevOps', 'Infrastructure'],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      comments: 2,
      attachments: 1,
      storyPoints: 13,
      project: 'ChatPro'
    },
    {
      id: 'TASK-5',
      title: 'Документация API',
      description: 'Создать подробную документацию для всех API endpoints',
      status: 'done',
      priority: 'medium',
      assignee: {
        id: '3',
        name: 'Анна Сидорова',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      reporter: {
        id: '1',
        name: 'Иван Иванов',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      type: 'task',
      labels: ['Documentation'],
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
      comments: 0,
      attachments: 3,
      storyPoints: 2,
      project: 'ChatPro'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'highest': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      case 'lowest': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return '🐛';
      case 'story': return '📖';
      case 'epic': return '🎯';
      default: return '✅';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'bug': return 'bg-red-100 text-red-800';
      case 'story': return 'bg-green-100 text-green-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAssignee = !selectedAssignee || task.assignee.id === selectedAssignee;
    const matchesPriority = !selectedPriority || task.priority === selectedPriority;
    return matchesSearch && matchesAssignee && matchesPriority;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const uniqueAssignees = Array.from(new Set(tasks.map(task => task.assignee.id)))
    .map(id => tasks.find(task => task.assignee.id === id)?.assignee)
    .filter(Boolean);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Доска задач</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Создать задачу
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск задач..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Все исполнители</option>
            {uniqueAssignees.map((assignee) => (
              <option key={assignee?.id} value={assignee?.id}>
                {assignee?.name}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="">Все приоритеты</option>
            <option value="highest">Критический</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
            <option value="lowest">Минимальный</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex h-full min-w-max">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <div key={column.id} className="w-80 flex-shrink-0 bg-gray-50 border-r border-gray-200">
                <div className={`p-4 border-b border-gray-200 ${column.color}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{column.title}</h3>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                <div className="p-3 space-y-3 h-full overflow-y-auto">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      {/* Task Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(task.type)}`}>
                            {getTypeIcon(task.type)} {task.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{task.id}</span>
                        </div>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Task Title */}
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {task.title}
                      </h4>

                      {/* Labels */}
                      {task.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {task.labels.map((label, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Task Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Flag className={`h-3 w-3 ${getPriorityColor(task.priority)}`} />
                          </div>
                          
                          {task.comments > 0 && (
                            <div className="flex items-center space-x-1 text-gray-500">
                              <MessageSquare className="h-3 w-3" />
                              <span className="text-xs">{task.comments}</span>
                            </div>
                          )}
                          
                          {task.attachments > 0 && (
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Paperclip className="h-3 w-3" />
                              <span className="text-xs">{task.attachments}</span>
                            </div>
                          )}

                          {task.storyPoints && (
                            <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                              {task.storyPoints}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {task.dueDate && (
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span className="text-xs">
                                {new Date(task.dueDate).toLocaleDateString('ru-RU', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          )}
                          
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            className="w-6 h-6 rounded-full object-cover"
                            title={task.assignee.name}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Task Button */}
                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                    <Plus className="h-4 w-4 mx-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}