import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <Cookie className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                Мы используем файлы cookie для улучшения работы сайта, анализа трафика и персонализации контента. 
                Продолжая использовать наш сайт, вы соглашаетесь с использованием cookie.{' '}
                <Link 
                  to="/cookie-policy" 
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Подробнее о cookie
                </Link>
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <button
                  onClick={acceptCookies}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Принять все
                </button>
                <button
                  onClick={declineCookies}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Отклонить
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={declineCookies}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors ml-4"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}