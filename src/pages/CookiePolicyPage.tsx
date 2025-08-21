import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Shield, Eye, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Вернуться на главную
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cookie className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Политика использования файлов cookie
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы используем файлы cookie для улучшения вашего опыта использования нашего сайта. 
            Ниже описано, какие cookie мы используем и для каких целей.
          </p>
          <div className="text-sm text-gray-500 mt-4">
            Последнее обновление: 15 января 2024 г.
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* What are cookies */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Cookie className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Что такое файлы cookie?</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
                при посещении веб-сайтов. Они помогают сайтам запоминать информацию о вашем посещении, 
                что может сделать ваш следующий визит более удобным и полезным.
              </p>
            </section>

            {/* Types of cookies */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Типы используемых cookie</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Необходимые cookie</h3>
                  <p className="text-gray-700 mb-3">
                    Эти файлы cookie необходимы для работы сайта и не могут быть отключены. 
                    Они обычно устанавливаются в ответ на ваши действия.
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-600">
                      <strong>Примеры:</strong> сессионные cookie, настройки безопасности, 
                      предпочтения языка
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Аналитические cookie</h3>
                  <p className="text-gray-700 mb-3">
                    Эти файлы cookie позволяют нам анализировать использование сайта, 
                    чтобы улучшить его производительность и функциональность.
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-600">
                      <strong>Примеры:</strong> Google Analytics, статистика посещений, 
                      анализ поведения пользователей
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Функциональные cookie</h3>
                  <p className="text-gray-700 mb-3">
                    Эти файлы cookie обеспечивают расширенную функциональность и персонализацию, 
                    например, запоминание ваших предпочтений.
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-600">
                      <strong>Примеры:</strong> настройки чата, сохраненные формы, 
                      персональные настройки
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Маркетинговые cookie</h3>
                  <p className="text-gray-700 mb-3">
                    Эти файлы cookie используются для показа релевантной рекламы 
                    и отслеживания эффективности рекламных кампаний.
                  </p>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-sm text-gray-600">
                      <strong>Примеры:</strong> ретаргетинг, социальные сети, 
                      рекламные платформы
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Third party cookies */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Сторонние cookie</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Мы также используем сторонние сервисы, которые могут устанавливать свои cookie:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Google Analytics</strong> — для анализа трафика и поведения пользователей</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Яндекс.Метрика</strong> — для веб-аналитики и статистики</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Facebook Pixel</strong> — для рекламных кампаний в социальных сетях</span>
                </li>
              </ul>
            </section>

            {/* Managing cookies */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Управление cookie</h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Вы можете управлять использованием cookie несколькими способами:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-3">Настройки браузера</h3>
                <p className="text-blue-800 mb-3">
                  Большинство браузеров позволяют управлять cookie через настройки:
                </p>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Блокировать все cookie</li>
                  <li>• Блокировать только сторонние cookie</li>
                  <li>• Удалить существующие cookie</li>
                  <li>• Получать уведомления при установке cookie</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Контактная информация</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Если у вас есть вопросы о нашей политике использования cookie, 
                свяжитесь с нами:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-700">
                  <div><strong>Email:</strong> privacy@chatpro.com</div>
                  <div><strong>Телефон:</strong> +7 (495) 123-45-67</div>
                  <div><strong>Адрес:</strong> г. Москва, ул. Примерная, д. 123</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}