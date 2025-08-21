import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  Award,
  Activity
} from 'lucide-react';

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Данные для графиков (заглушки)
  const salesData = [
    { month: 'Янв', value: 120000, deals: 8 },
    { month: 'Фев', value: 150000, deals: 12 },
    { month: 'Мар', value: 180000, deals: 15 },
    { month: 'Апр', value: 220000, deals: 18 },
    { month: 'Май', value: 190000, deals: 14 },
    { month: 'Июн', value: 250000, deals: 20 },
  ];

  const conversionData = [
    { stage: 'Лиды', count: 100, percentage: 100 },
    { stage: 'Квалифицированные', count: 75, percentage: 75 },
    { stage: 'Предложения', count: 45, percentage: 45 },
    { stage: 'Переговоры', count: 30, percentage: 30 },
    { stage: 'Закрыто', count: 18, percentage: 18 },
  ];

  const topPerformers = [
    { name: 'Иван Иванов', deals: 15, revenue: 450000, conversion: 85 },
    { name: 'Анна Сидорова', deals: 12, revenue: 380000, conversion: 78 },
    { name: 'Петр Петров', deals: 10, revenue: 320000, conversion: 72 },
  ];

  const maxSalesValue = Math.max(...salesData.map(item => item.value));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Аналитика</h1>
          <p className="text-gray-600">Анализ продаж и эффективности</p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
          <option value="quarter">Квартал</option>
          <option value="year">Год</option>
        </select>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Общая выручка</p>
              <p className="text-2xl font-bold text-gray-900">1,510,000 ₽</p>
              <p className="text-sm text-green-600 mt-1">+15% к прошлому месяцу</p>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Новые клиенты</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 mt-1">+8% к прошлому месяцу</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Конверсия</p>
              <p className="text-2xl font-bold text-gray-900">18%</p>
              <p className="text-sm text-red-600 mt-1">-2% к прошлому месяцу</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Средний чек</p>
              <p className="text-2xl font-bold text-gray-900">83,889 ₽</p>
              <p className="text-sm text-green-600 mt-1">+12% к прошлому месяцу</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* График продаж */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Динамика продаж</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">За 6 месяцев</span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between space-x-2">
            {salesData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-md relative" style={{ height: '200px' }}>
                  <div 
                    className="bg-blue-500 rounded-t-md w-full absolute bottom-0 transition-all duration-300 hover:bg-blue-600"
                    style={{ height: `${(item.value / maxSalesValue) * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs font-medium text-gray-900">{item.month}</div>
                  <div className="text-xs text-gray-600">{(item.value / 1000).toFixed(0)}k ₽</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Воронка продаж */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Воронка продаж</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Конверсия по этапам</span>
            </div>
          </div>

          <div className="space-y-4">
            {conversionData.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                  <span className="text-sm text-gray-600">{stage.count} ({stage.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Топ менеджеров */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Топ менеджеров</h3>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">По результатам месяца</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Менеджер</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Сделки</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Выручка</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Конверсия</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Рейтинг</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((performer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3 ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{performer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{performer.deals}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{performer.revenue.toLocaleString()} ₽</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${performer.conversion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{performer.conversion}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-full mr-1 ${
                            i < (5 - index) ? 'bg-yellow-400' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
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