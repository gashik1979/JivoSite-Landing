import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ChatPro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Современная платформа для общения с клиентами в реальном времени
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('features')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('pricing')}</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">{t('demo')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('integrations')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('api')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('aboutUs')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('careers')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('blog')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('contact')}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('support')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('helpCenter')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('documentation')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('privacy')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('terms')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}