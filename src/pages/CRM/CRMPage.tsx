import React, { useState } from 'react';
import { 
  Kanban, 
  List, 
  Calendar, 
  BarChart3,
  Folder,
  Settings,
  Filter,
  Plus
} from 'lucide-react';
import KanbanBoard from '../../components/CRM/KanbanBoard';
import TaskModal from '../../components/CRM/TaskModal';
import ProjectsView from '../../components/CRM/ProjectsView';

type ViewType = 'kanban' | 'list' | 'calendar' | 'projects' | 'reports';

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

export default function CRMPage() {
  const [currentView, setCurrentView] = useState<ViewType>('kanban');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const views = [
    { id: 'kanban', name: 'Канбан', icon: Kanban },
    { id: 'list', name: 'Список', icon: List },
    { id: 'calendar', name: 'Календарь', icon: Calendar },
    { id: 'projects', name: 'Проекты', icon: Folder },
    { id: 'reports', name: 'Отчеты', icon: BarChart3 }
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    // В реальном приложении здесь был бы API вызов
    console.log('Task updated:', updatedTask);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'kanban':
        return <KanbanBoard onTaskClick={handleTaskClick} />;
      case 'projects':
        return <ProjectsView />;
      case 'list':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <List className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Список задач</h3>
              <p className="text-gray-600">Представление в виде списка будет добавлено позже</p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Календарь</h3>
              <p className="text-gray-600">Календарное представление будет добавлено позже</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Отчеты</h3>
              <p className="text-gray-600">Аналитика и отчеты будут добавлены позже</p>
            </div>
          </div>
        );
      default:
        return <KanbanBoard onTaskClick={handleTaskClick} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(view.id as ViewType)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentView === view.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {view.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {renderCurrentView()}
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}