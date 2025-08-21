import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  User,
  Building,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Deal {
  id: string;
  title: string;
  client: string;
  company: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  createdDate: string;
  lastActivity: string;
  assignedTo: string;
  source: string;
  description: string;
  activities: number;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Внедрение CRM системы',
      client: 'Анна Петрова',
      company: 'TechStore',
      value: 150000,
      stage: 'negotiation',
      probability: 75,
      expectedCloseDate: '2024-02-15',
      createdDate: '2024-01-01',
      lastActivity: '2024-01-15',
      assignedTo: 'Иван Иванов',
      source: 'Сайт',
      description: 'Внедрение CRM системы для управления продажами',
      activities: 12
    },
    {
      id: '2',
      title: 'Разработка веб-сайта',
      client: 'Михаил Сидоров',
      company: 'WebAgency',
      value: 80000,
      stage: 'proposal',
      probability: 60,
      expectedCloseDate: '2024-02-20',
      createdDate: '2024-01-05',
      lastActivity: '2024-01-14',
      assignedTo: 'Петр Петров',
      source: 'Реклама',
      description: 'Создание корпоративного сайта с интеграциями',
      activities: 8
    },
    {
      id: '3',
      title: 'Консультация по маркетингу',
      client: 'Елена Козлова',
      company: 'StartupIO',
      value: 25000,
      stage: 'qualified',
      probability: 40,
      expectedCloseDate: '2024-03-01',
      createdDate: '2024-01-10',
      lastActivity: '2024-01-13',
      assignedTo: 'Анна Сидорова',
      source: 'Холодный звонок',
      description: 'Консультация по digital-маркетингу для стартапа',
      activities: 5
    },
    {
      id: '4',
      title: 'Поддержка IT-инфраструктуры',
      client: 'Дмитрий Волков',
      company: 'FinTech Corp',
      value: 200000,
      stage: 'closed-won',
      probability: 100,
      expectedCloseDate: '2024-01-10',
      createdDate: '2023-12-15',
      lastActivity: '2024-01-10',
      assignedTo: 'Иван Иванов',
      source: 'Партнер',
      description: 'Годовой контракт на поддержку IT-инфраструктуры',
      activities: 20
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'lead': return 'bg-gray-100 text-gray-800';
      case 'qualified': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed-won': return 'bg-green-100 text-green-800';
      case 'closed-lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageText = (stage: string) => {
    switch (stage) {
      case 'lead': return 'Лид';
      case 'qualified': return 'Квалифицирован';
      case 'proposal': return 'Предложение';
      case 'negotiation': return 'Переговоры';
      case 'closed-won': return 'Закрыта успешно';
      case 'closed-lost': return 'Закрыта неуспешно';
      default: return stage;
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'closed-won': return <CheckCircle className="h-4 w-4" />;
      case 'closed-lost': return <XCircle className="h-4 w-4" />;
      case 'negotiation': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(deal => deal.stage === 'closed-won');
  const activeDeals = deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage));
  const conversionRate = deals.length > 0 ? (wonDeals.length / deals.length * 100) : 0;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Сделки</h1>
          <p className="text-gray-600">Управление воронкой продаж</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Добавить сделку
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Общая стоимость</p>
              <p className="text-2xl font-bold text-gray-900">{totalValue.toLocaleString()} ₽</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Активные сделки</p>
              <p className="text-2xl font-bold text-orange-600">{activeDeals.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Закрыто успешно</p>
              <p className="text-2xl font-bold text-green-600">{wonDeals.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Конверсия</p>
              <p className="text-2xl font-bold text-purple-600">{conversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
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
              placeholder="Поиск сделок..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Все этапы</option>
            <option value="lead">Лиды</option>
            <option value="qualified">Квалифицированные</option>
            <option value="proposal">Предложения</option>
            <option value="negotiation">Переговоры</option>
            <option value="closed-won">Закрыты успешно</option>
            <option value="closed-lost">Закрыты неуспешно</option>
          </select>
        </div>
      </div>

      {/* Список сделок */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Сделка</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Клиент</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Стоимость</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Этап</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Вероятность</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Ожидаемое закрытие</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Ответственный</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">{deal.title}</p>
                      <p className="text-sm text-gray-600">{deal.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="flex items-center text-sm text-gray-900 mb-1">
                        <User className="h-4 w-4 mr-2" />
                        {deal.client}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2" />
                        {deal.company}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-gray-900">{deal.value.toLocaleString()} ₽</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStageColor(deal.stage)}`}>
                        {getStageIcon(deal.stage)}
                        <span className="ml-1">{getStageText(deal.stage)}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${deal.probability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{deal.probability}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(deal.expectedCloseDate).toLocaleDateString('ru-RU')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{deal.assignedTo}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}