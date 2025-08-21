import React from 'react';
import { Globe, Phone, Building } from 'lucide-react';

interface ChatSettingsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const countries = [
  { code: 'RU', name: 'Россия', flag: '🇷🇺' },
  { code: 'US', name: 'США', flag: '🇺🇸' },
  { code: 'GB', name: 'Великобритания', flag: '🇬🇧' },
  { code: 'DE', name: 'Германия', flag: '🇩🇪' },
  { code: 'FR', name: 'Франция', flag: '🇫🇷' },
  { code: 'IT', name: 'Италия', flag: '🇮🇹' },
  { code: 'ES', name: 'Испания', flag: '🇪🇸' },
  { code: 'CA', name: 'Канада', flag: '🇨🇦' },
  { code: 'AU', name: 'Австралия', flag: '🇦🇺' },
  { code: 'JP', name: 'Япония', flag: '🇯🇵' }
];

export default function ChatSettingsStep({ data, updateData }: ChatSettingsStepProps) {
  const handleInputChange = (field: string, value: string) => {
    updateData({
      chat: {
        ...data.chat,
        [field]: value
      }
    });
  };

  const selectedCountry = countries.find(c => c.code === data.chat.country);

  return (
    <div className="space-y-6">
      {/* Chat Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Название чата *
        </label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={data.chat.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Поддержка ChatPro"
          />
        </div>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Адрес сайта *
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="url"
            value={data.chat.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Phone and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Телефон
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              value={data.chat.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="+7 (999) 123-45-67"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Страна
          </label>
          <select
            value={data.chat.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Предварительный просмотр</h4>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="font-medium text-gray-900">
              {data.chat.name || 'Название чата'}
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {data.chat.website || 'Адрес сайта'}
            </div>
            {data.chat.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {data.chat.phone}
              </div>
            )}
            <div className="flex items-center">
              <span className="mr-2">{selectedCountry?.flag}</span>
              {selectedCountry?.name}
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
        <h4 className="text-sm font-medium text-amber-900 mb-2">⚡ Рекомендации:</h4>
        <ul className="text-sm text-amber-800 space-y-1">
          <li>• Используйте понятное название чата, которое отражает его назначение</li>
          <li>• Убедитесь, что адрес сайта указан корректно (с https://)</li>
          <li>• Телефон поможет клиентам связаться с вами альтернативным способом</li>
          <li>• Выбор страны влияет на локализацию и часовой пояс</li>
        </ul>
      </div>
    </div>
  );
}