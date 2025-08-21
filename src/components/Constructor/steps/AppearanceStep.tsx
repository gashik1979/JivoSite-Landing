import React, { useState } from 'react';
import { Palette, Monitor, Smartphone, MessageCircle, Edit3 } from 'lucide-react';

interface AppearanceStepProps {
  data: any;
  updateData: (data: any) => void;
}

const presetColors = [
  { name: 'Синий', value: '#3B82F6' },
  { name: 'Зеленый', value: '#10B981' },
  { name: 'Фиолетовый', value: '#8B5CF6' },
  { name: 'Розовый', value: '#EC4899' },
  { name: 'Оранжевый', value: '#F59E0B' },
  { name: 'Красный', value: '#EF4444' },
  { name: 'Индиго', value: '#6366F1' },
  { name: 'Изумрудный', value: '#059669' }
];

const positions = [
  { id: 'bottom-right', name: 'Справа внизу', icon: '↘️' },
  { id: 'bottom-left', name: 'Слева внизу', icon: '↙️' },
  { id: 'right-center', name: 'Справа по центру', icon: '➡️' },
  { id: 'left-center', name: 'Слева по центру', icon: '⬅️' }
];

const greetings = [
  { id: 'default', text: 'Здравствуйте! Как дела? Чем могу помочь?' },
  { id: 'friendly', text: 'Привет! 👋 Есть вопросы? Я здесь, чтобы помочь!' },
  { id: 'professional', text: 'Добро пожаловать! Наш специалист готов ответить на ваши вопросы.' },
  { id: 'sales', text: 'Интересует наш продукт? Давайте обсудим, как мы можем вам помочь!' },
  { id: 'support', text: 'Нужна помощь? Опишите вашу проблему, и мы найдем решение.' },
  { id: 'custom', text: 'Создать свое приветствие' }
];

export default function AppearanceStep({ data, updateData }: AppearanceStepProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState(data.appearance.primaryColor);

  const handleAppearanceChange = (field: string, value: string) => {
    updateData({
      appearance: {
        ...data.appearance,
        [field]: value
      }
    });
  };

  const handleColorChange = (color: string) => {
    handleAppearanceChange('primaryColor', color);
    setCustomColor(color);
  };

  const getPositionStyle = (position: string) => {
    switch (position) {
      case 'bottom-right':
        return { bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px' };
      case 'right-center':
        return { top: '50%', right: '20px', transform: 'translateY(-50%)' };
      case 'left-center':
        return { top: '50%', left: '20px', transform: 'translateY(-50%)' };
      default:
        return { bottom: '20px', right: '20px' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Основной цвет
        </label>
        
        {/* Preset Colors */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-4">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
                data.appearance.primaryColor === color.value
                  ? 'border-gray-900 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>

        {/* Custom Color Picker */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Palette className="h-4 w-4 mr-2" />
            Выбрать цвет
          </button>
          
          {showColorPicker && (
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
          )}
          
          <div className="text-sm text-gray-600">
            Текущий: {data.appearance.primaryColor}
          </div>
        </div>
      </div>

      {/* Position Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Расположение на сайте
        </label>
        
        <div className="grid grid-cols-2 gap-4">
          {positions.map((position) => (
            <button
              key={position.id}
              onClick={() => handleAppearanceChange('position', position.id)}
              className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                data.appearance.position === position.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{position.icon}</span>
                <span className="font-medium">{position.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Greeting Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Приветственное сообщение
        </label>
        
        <div className="space-y-3">
          {greetings.map((greeting) => (
            <div key={greeting.id}>
              <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="greeting"
                  value={greeting.id}
                  checked={data.appearance.greeting === greeting.id}
                  onChange={(e) => handleAppearanceChange('greeting', e.target.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-900">
                    {greeting.id === 'custom' ? (
                      <div className="flex items-center space-x-2">
                        <Edit3 className="h-4 w-4" />
                        <span>Создать свое приветствие</span>
                      </div>
                    ) : (
                      greeting.text
                    )}
                  </div>
                </div>
              </label>
              
              {greeting.id === 'custom' && data.appearance.greeting === 'custom' && (
                <div className="mt-3 ml-7">
                  <textarea
                    value={data.appearance.customGreeting}
                    onChange={(e) => handleAppearanceChange('customGreeting', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Введите ваше приветственное сообщение..."
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Предварительный просмотр
        </label>
        
        <div className="bg-gray-100 rounded-xl p-6 relative overflow-hidden" style={{ height: '300px' }}>
          {/* Mock Website */}
          <div className="bg-white rounded-lg shadow-sm h-full p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-xs text-gray-600">
                {data.chat.website || 'example.com'}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          {/* Chat Widget */}
          <div
            className="absolute"
            style={getPositionStyle(data.appearance.position)}
          >
            <div className="relative">
              {/* Chat Button */}
              <button
                className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{ backgroundColor: data.appearance.primaryColor }}
              >
                <MessageCircle className="h-6 w-6" />
              </button>
              
              {/* Greeting Bubble */}
              <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 max-w-xs border">
                <div className="text-sm text-gray-900">
                  {data.appearance.greeting === 'custom' 
                    ? data.appearance.customGreeting || 'Введите приветствие...'
                    : greetings.find(g => g.id === data.appearance.greeting)?.text
                  }
                </div>
                <div className="absolute -bottom-1 right-4 w-3 h-3 bg-white border-r border-b transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <h4 className="text-sm font-medium text-purple-900 mb-2">🎨 Советы по дизайну:</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• Выберите цвет, который соответствует брендингу вашего сайта</li>
          <li>• Расположение справа внизу наиболее привычно для пользователей</li>
          <li>• Дружелюбное приветствие увеличивает количество обращений</li>
          <li>• Избегайте слишком длинных приветственных сообщений</li>
        </ul>
      </div>
    </div>
  );
}