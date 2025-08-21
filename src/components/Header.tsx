import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {MessageCircle, Menu, X, User as UserIcon, LogOut} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageDropdown from './LanguageDropdown';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);
  const { t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          <Link to="/" className="flex items-center">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ChatPro</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('features')}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('pricing')}
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('about')}
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('contact')}
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageDropdown />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  {user?.fullName || t('dashboard')}
                </Link>
                <button
                    onClick={logout}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title={t('logout')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setAuthModal('signin')}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={() => setAuthModal('signup')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('getStarted')}
                </button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mt-2 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('features')}
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('pricing')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('about')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t('contact')}
            </a>
            <div className="pt-2 border-t border-gray-200">
              <LanguageDropdown />
            </div>
            {isAuthenticated ? (
              <>
                <a 
                  href="/dashboard"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5 mr-1" />
                  {user?.fullName || t('dashboard')}
                </a>
                <button 
                  onClick={logout}
                  className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setAuthModal('signin')}
                  className="w-full text-left text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={() => setAuthModal('signup')}
                  className="w-full text-left text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t('getStarted')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
    
    {authModal && (
      <AuthModal 
        type={authModal} 
        onClose={() => setAuthModal(null)}
        onSwitchMode={(mode) => setAuthModal(mode)}
      />
    )}
    </>
  );
}