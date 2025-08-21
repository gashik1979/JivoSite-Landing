import React, { useState } from 'react';
import { Upload, User, Shuffle } from 'lucide-react';

interface AdminSetupStepProps {
  data: any;
  updateData: (data: any) => void;
}

const randomAvatars = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
];

export default function AdminSetupStep({ data, updateData }: AdminSetupStepProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    updateData({
      admin: {
        ...data.admin,
        [field]: value
      }
    });
  };

  const generateRandomAvatar = () => {
    const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
    handleInputChange('photo', randomAvatar);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('photo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('photo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div className="text-center">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Фото профиля
        </label>
        
        <div className="flex items-center justify-center space-x-4">
          {/* Current Photo */}
          <div className="relative">
            {data.admin.photo ? (
              <img
                src={data.admin.photo}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                <User className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Upload Options */}
          <div className="space-y-2">
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Загрузить фото
              </p>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <button
              onClick={generateRandomAvatar}
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Случайное фото
            </button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Имя *
          </label>
          <input
            type="text"
            value={data.admin.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Введите ваше имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Должность
          </label>
          <input
            type="text"
            value={data.admin.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Менеджер по продажам"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Отдел
          </label>
          <select
            value={data.admin.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Выберите отдел</option>
            <option value="sales">Отдел продаж</option>
            <option value="support">Техническая поддержка</option>
            <option value="marketing">Маркетинг</option>
            <option value="hr">HR</option>
            <option value="management">Руководство</option>
            <option value="other">Другое</option>
          </select>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Советы:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Используйте профессиональное фото для повышения доверия</li>
          <li>• Укажите реальную должность - это поможет клиентам понять, с кем они общаются</li>
          <li>• Выбор отдела поможет правильно маршрутизировать обращения</li>
        </ul>
      </div>
    </div>
  );
}