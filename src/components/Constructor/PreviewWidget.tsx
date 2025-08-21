import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

interface PreviewWidgetProps {
  data: any;
}

export default function PreviewWidget({ data }: PreviewWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const getGreetingText = () => {
    if (data.appearance?.greeting === 'custom') {
      return data.appearance?.customGreeting || 'Здравствуйте! Как дела? Чем могу помочь?';
    }
    
    const greetings = {
      'default': 'Здравствуйте! Как дела? Чем могу помочь?',
      'friendly': 'Привет! 👋 Есть вопросы? Я здесь, чтобы помочь!',
      'professional': 'Добро пожаловать! Наш специалист готов ответить на ваши вопросы.',
      'sales': 'Интересует наш продукт? Давайте обсудим, как мы можем вам помочь!',
      'support': 'Нужна помощь? Опишите вашу проблему, и мы найдем решение.'
    };
    
    return greetings[data.appearance?.greeting as keyof typeof greetings] || greetings.default;
  };

  const getPositionClasses = () => {
    switch (data.appearance?.position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'right-center':
        return 'right-6 top-1/2 transform -translate-y-1/2';
      case 'left-center':
        return 'left-6 top-1/2 transform -translate-y-1/2';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getChatPosition = () => {
    const position = data.appearance?.position;
    if (position?.includes('left')) {
      return 'left-0';
    }
    return 'right-0';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h3 className="font-semibold mb-1">Предварительный просмотр</h3>
        <p className="text-sm opacity-90">Так будет выглядеть ваш чат</p>
      </div>

      <div className="p-6">
        {/* Mock Website */}
        <div className="bg-gray-50 rounded-lg h-96 relative overflow-hidden border">
          {/* Website Header */}
          <div className="bg-white border-b p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-xs text-gray-600 ml-4">
                {data.chat?.website || 'example.com'}
              </div>
            </div>
          </div>

          {/* Website Content */}
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>

          {/* Chat Widget */}
          <div className={`absolute ${getPositionClasses()}`}>
            {/* Chat Window */}
            {isOpen && (
              <div className={`absolute bottom-16 ${getChatPosition()} w-80 bg-white rounded-lg shadow-xl border mb-2`}>
                {/* Chat Header */}
                <div 
                  className="p-4 text-white rounded-t-lg flex items-center justify-between"
                  style={{ backgroundColor: data.appearance?.primaryColor || '#3B82F6' }}
                >
                  <div className="flex items-center space-x-3">
                    {data.admin?.photo && (
                      <img
                        src={data.admin.photo}
                        alt={data.admin.name}
                        className="w-8 h-8 rounded-full object-cover border-2 border-white"
                      />
                    )}
                    <div>
                      <div className="font-medium text-sm">
                        {data.admin?.name || 'Оператор'}
                      </div>
                      <div className="text-xs opacity-90">
                        {data.admin?.position || 'Онлайн'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 h-64 overflow-y-auto bg-gray-50">
                  <div className="space-y-3">
                    {/* Greeting Message */}
                    <div className="flex items-start space-x-2">
                      {data.admin?.photo && (
                        <img
                          src={data.admin.photo}
                          alt={data.admin.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                        <p className="text-sm text-gray-900">{getGreetingText()}</p>
                        <p className="text-xs text-gray-500 mt-1">Сейчас</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t bg-white rounded-b-lg">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Введите сообщение..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button 
                      className="p-2 text-white rounded-lg"
                      style={{ backgroundColor: data.appearance?.primaryColor || '#3B82F6' }}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 relative"
              style={{ backgroundColor: data.appearance?.primaryColor || '#3B82F6' }}
            >
              <MessageCircle className="h-6 w-6" />
              
              {/* Notification Badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">1</span>
              </div>
            </button>

            {/* Greeting Bubble */}
            {!isOpen && (
              <div className={`absolute bottom-16 ${getChatPosition()} bg-white rounded-lg shadow-lg p-3 max-w-xs border mb-2`}>
                <div className="text-sm text-gray-900">
                  {getGreetingText()}
                </div>
                <div className={`absolute -bottom-1 w-3 h-3 bg-white border-r border-b transform rotate-45 ${
                  data.appearance?.position?.includes('left') ? 'left-4' : 'right-4'
                }`}></div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Summary */}
        <div className="mt-4 space-y-3">
          <div className="text-sm">
            <span className="font-medium text-gray-700">Цвет:</span>
            <div className="inline-flex items-center ml-2">
              <div 
                className="w-4 h-4 rounded border mr-2"
                style={{ backgroundColor: data.appearance?.primaryColor || '#3B82F6' }}
              ></div>
              <span className="text-gray-600">{data.appearance?.primaryColor || '#3B82F6'}</span>
            </div>
          </div>
          
          <div className="text-sm">
            <span className="font-medium text-gray-700">Позиция:</span>
            <span className="text-gray-600 ml-2">
              {data.appearance?.position === 'bottom-left' && 'Слева внизу'}
              {data.appearance?.position === 'bottom-right' && 'Справа внизу'}
              {data.appearance?.position === 'right-center' && 'Справа по центру'}
              {data.appearance?.position === 'left-center' && 'Слева по центру'}
              {!data.appearance?.position && 'Справа внизу'}
            </span>
          </div>
          
          {data.admin?.name && (
            <div className="text-sm">
              <span className="font-medium text-gray-700">Оператор:</span>
              <span className="text-gray-600 ml-2">{data.admin.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}