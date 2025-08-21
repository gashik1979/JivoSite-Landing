import React, { useState } from 'react';
import { 
  Download, 
  Monitor, 
  Smartphone, 
  Code, 
  Chrome,
  Globe,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

interface IntegrationStepProps {
  data: any;
  updateData: (data: any) => void;
}

const platforms = [
  {
    id: 'web',
    name: 'Веб-сайт',
    description: 'HTML/JavaScript код для любого сайта',
    icon: Globe,
    color: 'bg-blue-100 text-blue-600',
    instructions: 'Скопируйте код и вставьте перед закрывающим тегом </body>',
    downloadType: 'code'
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Плагин для WordPress сайтов',
    icon: Monitor,
    color: 'bg-indigo-100 text-indigo-600',
    instructions: 'Загрузите плагин через админ-панель WordPress',
    downloadType: 'plugin'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Приложение для интернет-магазинов Shopify',
    icon: Chrome,
    color: 'bg-green-100 text-green-600',
    instructions: 'Установите приложение из Shopify App Store',
    downloadType: 'app'
  },
  {
    id: 'android',
    name: 'Android',
    description: 'SDK для Android приложений',
    icon: Smartphone,
    color: 'bg-orange-100 text-orange-600',
    instructions: 'Интегрируйте SDK в ваше Android приложение',
    downloadType: 'sdk'
  },
  {
    id: 'ios',
    name: 'iOS',
    description: 'SDK для iOS приложений',
    icon: Smartphone,
    color: 'bg-gray-100 text-gray-600',
    instructions: 'Интегрируйте SDK в ваше iOS приложение',
    downloadType: 'sdk'
  },
  {
    id: 'api',
    name: 'REST API',
    description: 'API для кастомной интеграции',
    icon: Code,
    color: 'bg-purple-100 text-purple-600',
    instructions: 'Используйте наш REST API для создания собственного решения',
    downloadType: 'documentation'
  }
];

export default function IntegrationStep({ data, updateData }: IntegrationStepProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(data.integration?.platform || '');
  const [copied, setCopied] = useState(false);

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    updateData({
      integration: {
        ...data.integration,
        platform: platformId,
        downloadUrl: generateDownloadUrl(platformId)
      }
    });
  };

  const generateDownloadUrl = (platform: string) => {
    const baseUrl = 'https://chatpro.com/downloads/';
    switch (platform) {
      case 'web':
        return `${baseUrl}chatpro-widget.js`;
      case 'wordpress':
        return `${baseUrl}chatpro-wordpress-plugin.zip`;
      case 'shopify':
        return `${baseUrl}chatpro-shopify-app`;
      case 'android':
        return `${baseUrl}chatpro-android-sdk.aar`;
      case 'ios':
        return `${baseUrl}chatpro-ios-sdk.framework`;
      case 'api':
        return `${baseUrl}api-documentation`;
      default:
        return '';
    }
  };

  const generateEmbedCode = () => {
    return `<!-- ChatPro Widget -->
<script>
  (function(w,d,s,l,i){
    w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;j.src='https://chatpro.com/widget.js?id='+i+dl;
    f.parentNode.insertBefore(j,f);
  })(window,document,'script','chatProLayer','${data.chat?.website || 'YOUR_SITE_ID'}');
</script>
<!-- End ChatPro Widget -->`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Выберите платформу для интеграции
        </h3>
        <p className="text-gray-600">
          Мы поддерживаем различные платформы и предоставляем готовые решения
        </p>
      </div>

      {/* Platform Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          const IconComponent = platform.icon;
          
          return (
            <div
              key={platform.id}
              onClick={() => handlePlatformSelect(platform.id)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-lg flex items-center justify-center mb-4 ${platform.color}`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{platform.description}</p>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration Details */}
      {selectedPlatformData && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <selectedPlatformData.icon className="h-6 w-6 text-blue-600" />
            <h4 className="text-lg font-semibold text-gray-900">
              Интеграция с {selectedPlatformData.name}
            </h4>
          </div>
          
          <p className="text-gray-600 mb-6">{selectedPlatformData.instructions}</p>

          {/* Code Display for Web */}
          {selectedPlatform === 'web' && (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 relative">
                <button
                  onClick={() => copyToClipboard(generateEmbedCode())}
                  className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white transition-colors"
                  title="Копировать код"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
                
                <pre className="text-sm text-gray-300 overflow-x-auto pr-12">
                  <code>{generateEmbedCode()}</code>
                </pre>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-2">Инструкция по установке:</h5>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Скопируйте код выше</li>
                  <li>Откройте HTML-файл вашего сайта</li>
                  <li>Вставьте код перед закрывающим тегом &lt;/body&gt;</li>
                  <li>Сохраните файл и обновите сайт</li>
                </ol>
              </div>
            </div>
          )}

          {/* Download Button for Other Platforms */}
          {selectedPlatform !== 'web' && (
            <div className="space-y-4">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                {selectedPlatformData.downloadType === 'documentation' ? 'Открыть документацию' : 'Скачать'}
              </button>
              
              {selectedPlatformData.downloadType !== 'documentation' && (
                <div className="text-center">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Подробная инструкция по установке
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
        <h4 className="font-semibold text-green-900 mb-3">🎉 Что дальше?</h4>
        <ul className="text-sm text-green-800 space-y-2">
          <li className="flex items-start">
            <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">1</span>
            Установите чат на ваш сайт или приложение
          </li>
          <li className="flex items-start">
            <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">2</span>
            Войдите в панель администратора для настройки
          </li>
          <li className="flex items-start">
            <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">3</span>
            Начните общаться с клиентами в реальном времени
          </li>
        </ul>
      </div>

      {/* Support */}
      <div className="text-center">
        <p className="text-gray-600 mb-2">Нужна помощь с интеграцией?</p>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Связаться с технической поддержкой
        </button>
      </div>
    </div>
  );
}