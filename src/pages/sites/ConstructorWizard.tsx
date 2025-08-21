import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, Palette, Monitor, MessageSquare, Download, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import AdminSetupStep from '../../components/Constructor/steps/AdminSetupStep.tsx';
import ChatSettingsStep from '../../components/Constructor/steps/ChatSettingsStep.tsx';
import AppearanceStep from '../../components/Constructor/steps/AppearanceStep.tsx';
import PurposeStep from '../../components/Constructor/steps/PurposeStep.tsx';
import IntegrationStep from '../../components/Constructor/steps/IntegrationStep.tsx';
import PreviewWidget from '../../components/Constructor/PreviewWidget.tsx';

interface ConstructorData {
  admin: {
    name: string;
    photo: string | null;
    position: string;
    department: string;
  };
  chat: {
    name: string;
    website: string;
    phone: string;
    country: string;
  };
  appearance: {
    primaryColor: string;
    position: 'bottom-right' | 'bottom-left' | 'right-center' | 'left-center';
    greeting: string;
    customGreeting: string;
  };
  purpose: string[];
  integration: {
    platform: string;
    downloadUrl: string;
  };
}

const initialData: ConstructorData = {
  admin: {
    name: '',
    photo: null,
    position: '',
    department: ''
  },
  chat: {
    name: '',
    website: '',
    phone: '',
    country: 'RU'
  },
  appearance: {
    primaryColor: '#3B82F6',
    position: 'bottom-right',
    greeting: 'default',
    customGreeting: ''
  },
  purpose: [],
  integration: {
    platform: '',
    downloadUrl: ''
  }
};

export default function ConstructorWizard() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<ConstructorData>(initialData);

  const steps = [
    {
      id: 'admin',
      title: 'Настройка администратора',
      description: 'Укажите информацию о себе',
      icon: Monitor,
      component: AdminSetupStep
    },
    {
      id: 'chat',
      title: 'Настройки чата',
      description: 'Основная информация о чате',
      icon: MessageSquare,
      component: ChatSettingsStep
    },
    {
      id: 'appearance',
      title: 'Внешний вид',
      description: 'Настройте дизайн и расположение',
      icon: Palette,
      component: AppearanceStep
    },
    {
      id: 'purpose',
      title: 'Цель использования',
      description: 'Для чего будет использоваться чат',
      icon: Globe,
      component: PurposeStep
    },
    {
      id: 'integration',
      title: 'Интеграция',
      description: 'Выберите платформу для установки',
      icon: Download,
      component: IntegrationStep
    }
  ];

  const updateData = (stepData: Partial<ConstructorData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipStep = () => {
    nextStep();
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Мастер настройки чата</h1>
            <div className="text-sm text-gray-600">
              Шаг {currentStep + 1} из {steps.length}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    index < currentStep
                      ? 'bg-green-500 border-green-500 text-white'
                      : index === currentStep
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-colors ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600">
                  {steps[currentStep].description}
                </p>
              </div>

              <CurrentStepComponent
                data={data}
                updateData={updateData}
              />

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={skipStep}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Пропустить
                  </button>
                  
                  {currentStep === steps.length - 1 ? (
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      Завершить
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Далее
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <PreviewWidget data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}