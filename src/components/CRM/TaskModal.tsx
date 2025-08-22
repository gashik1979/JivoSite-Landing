import React, { useState } from 'react';
import { 
  X, 
  User, 
  Calendar, 
  Flag, 
  MessageSquare, 
  Paperclip, 
  Edit,
  Trash2,
  Clock,
  Eye,
  Plus,
  Send
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

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export default function TaskModal({ task, onClose, onUpdate }: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [newComment, setNewComment] = useState('');
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Иван Иванов',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      content: 'Начал работу над задачей. Планирую закончить к концу недели.',
      createdAt: '2024-01-16T10:30:00Z'
    },
    {
      id: '2',
      author: {
        name: 'Петр Петров',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      },
      content: 'Отлично! Если нужна помощь с тестированием, дай знать.',
      createdAt: '2024-01-16T11:15:00Z'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'highest': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'lowest': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'highest': return 'Критический';
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      case 'lowest': return 'Минимальный';
      default: return priority;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'backlog': return 'text-gray-600 bg-gray-100';
      case 'todo': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'review': return 'text-purple-600 bg-purple-100';
      case 'done': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'backlog': return 'Бэклог';
      case 'todo': return 'К выполнению';
      case 'in-progress': return 'В работе';
      case 'review': return 'На проверке';
      case 'done': return 'Готово';
      default: return status;
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

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // В реальном приложении здесь был бы API вызов
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(task.type)}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{task.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedTask.title}
                      onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                      className="text-xl font-semibold text-gray-900 border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                    >
                      Отмена
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Описание</h3>
                  {isEditing ? (
                    <textarea
                      value={editedTask.description}
                      onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{task.description}</p>
                  )}
                </div>

                {/* Labels */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Метки</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.labels.map((label, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {label}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 text-sm rounded-full hover:border-gray-400">
                        <Plus className="h-3 w-3 inline mr-1" />
                        Добавить метку
                      </button>
                    )}
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Активность</h3>
                  
                  {/* Add Comment */}
                  <div className="mb-4">
                    <div className="flex space-x-3">
                      <img
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                        alt="You"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Добавить комментарий..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Отправить
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">{comment.author.name}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
                {isEditing ? (
                  <select
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="backlog">Бэклог</option>
                    <option value="todo">К выполнению</option>
                    <option value="in-progress">В работе</option>
                    <option value="review">На проверке</option>
                    <option value="done">Готово</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {getStatusText(task.status)}
                  </span>
                )}
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Исполнитель</label>
                <div className="flex items-center space-x-2">
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-900">{task.assignee.name}</span>
                </div>
              </div>

              {/* Reporter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Автор</label>
                <div className="flex items-center space-x-2">
                  <img
                    src={task.reporter.avatar}
                    alt={task.reporter.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-900">{task.reporter.name}</span>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
                {isEditing ? (
                  <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="lowest">Минимальный</option>
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                    <option value="highest">Критический</option>
                  </select>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Flag className={`h-4 w-4 ${getPriorityColor(task.priority).split(' ')[0]}`} />
                    <span className="text-gray-900">{getPriorityText(task.priority)}</span>
                  </div>
                )}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Срок выполнения</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedTask.dueDate || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : task.dueDate ? (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-900">
                      {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">Не установлен</span>
                )}
              </div>

              {/* Story Points */}
              {task.storyPoints && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Story Points</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedTask.storyPoints || ''}
                      onChange={(e) => setEditedTask({ ...editedTask, storyPoints: parseInt(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {task.storyPoints}
                    </span>
                  )}
                </div>
              )}

              {/* Timestamps */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Создано</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Обновлено</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(task.updatedAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Клонировать
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}