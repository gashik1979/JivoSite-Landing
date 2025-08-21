import React from 'react';
import { 
  ShoppingCart, 
  Headphones, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Heart,
  Building,
  Zap,
  MessageSquare,
  Phone
} from 'lucide-react';

interface PurposeStepProps {
  data: any;
  updateData: (data: any) => void;
}

const purposes = [
  {
    id: 'sales',
    title: 'Продажи',
    description: 'Увеличение конверсии и продаж через чат',
    icon: ShoppingCart,
    color: 'bg-green-100 text-green-600',
    benefits: ['Квалификация лидов', 'Консультации по продуктам', 'Обработка возражений']
  },
  {
    id: 'support',
    title: 'Техническая поддержка',
    description: 'Помощь клиентам с техническими вопросами',
    icon: Headphones,
    color: 'bg-blue-100 text-blue-600',
    benefits: ['Решение проблем', 'Инструкции по использованию', 'Диагностика неисправностей']
  },
  {
    id: 'marketing',
    title: 'Маркетинг',
    description: 'Сбор обратной связи и маркетинговые исследования',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600',
    benefits: ['Опросы клиентов', 'Сбор отзывов', 'Исследование потребностей']
  },
  {
    id: 'hr',
    title: 'HR и рекрутинг',
    description: 'Работа с кандидатами и сотрудниками',
    icon: Users,
    color: 'bg-orange-100 text-orange-600',
    benefits: ['Первичный отбор', 'Консультации по вакансиям', 'Поддержка сотрудников']
  },
  {
    id: 'education',
    title: 'Образование',
    description: 'Консультации по образовательным программам',
    icon: BookOpen,
    color: 'bg-indigo-100 text-indigo-600',
    benefits: ['Информация о курсах', 'Помощь студентам', 'Академическая поддержка']
  },
  {
    id: 'healthcare',
    title: 'Здравоохранение',
    description: 'Медицинские консультации и запись на прием',
    icon: Heart,
    color: 'bg-red-100 text-red-600',
    benefits: ['Запись к врачу', 'Консультации', 'Информация о услугах']
  },
  {
    id: 'realestate',
    title: 'Недвижимость',
    description: 'Консультации по объектам недвижимости',
    icon: Building,
    color: 'bg-yellow-100 text-yellow-600',
    benefits: ['Показ объектов', 'Консультации по ипотеке', 'Оценка недвижимости']
  },
  {
    id: 'services',
    title: 'Услуги',
    description: 'Консультации по различным услугам',
    icon: Zap,
    color: 'bg-pink-100 text-pink-600',
    benefits: ['Описание услуг', 'Расчет стоимости', 'Запись на услугу']
  }
];

export default function PurposeStep({ data, updateData }: PurposeStepProps) {
  const handlePurposeToggle = (purposeId: string) => {
    const currentPurposes = data.purpose || [];
    const newPurposes = currentPurposes.includes(purposeId)
      ? currentPurposes.filter((id: string) => id !== purposeId)
      : [...currentPurposes, purposeId];
    
    updateData({ purpose: newPurposes });
  };

  const selectedPurposes = data.purpose || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Для чего будет использоваться чат?
        </h3>
        <p className="text-gray-600">
          Выберите одну или несколько целей. Это поможет настроить чат под ваши потребности.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purposes.map((purpose) => {
          const isSelected = selectedPurposes.includes(purpose.id);
          const IconComponent = purpose.icon;
          
          return (
            <div
              key={purpose.id}
              onClick={() => handlePurposeToggle(purpose.id)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${purpose.color}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{purpose.title}</h4>
                    {isSelected && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {purpose.description}
                  </p>
                  
                  <div className="space-y-1">
                    {purpose.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-500">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Summary */}
      {selectedPurposes.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">
            Выбранные цели ({selectedPurposes.length}):
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedPurposes.map((purposeId: string) => {
              const purpose = purposes.find(p => p.id === purposeId);
              if (!purpose) return null;
              
              return (
                <span
                  key={purposeId}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {purpose.title}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
        <h4 className="text-sm font-medium text-emerald-900 mb-2">💡 Рекомендации:</h4>
        <ul className="text-sm text-emerald-800 space-y-1">
          <li>• Для продаж рекомендуем настроить автоматические приветствия с предложениями</li>
          <li>• Для поддержки полезно создать базу знаний с частыми вопросами</li>
          <li>• Можно выбрать несколько целей, если чат будет использоваться универсально</li>
          <li>• Настройки можно изменить позже в панели администратора</li>
        </ul>
      </div>
    </div>
  );
}