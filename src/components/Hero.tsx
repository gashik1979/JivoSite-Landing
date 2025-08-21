import React from 'react';
import { Play, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('heroTitle')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group">
              {t('startFree')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center">
              <Play className="mr-2 h-5 w-5" />
              {t('watchDemo')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">{t('activeChats')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">{t('satisfactionRate')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">15s</div>
              <div className="text-gray-600">{t('responseTime')}</div>
            </div>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="aspect-video bg-white rounded-2xl shadow-2xl border overflow-hidden">
            <div className="bg-gray-100 h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Демонстрация интерфейса чата</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}