import React, { useRef, useState } from 'react';

import { X, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from "./NotificationProvider";

interface AuthModalProps {
  type: 'signin' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'signin' | 'signup') => void;
}

export default function AuthModal({ type, onClose, onSwitchMode }: AuthModalProps) {
  const { t } = useLanguage();
  const auth = useAuth();
  const notify = useNotification();

  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: ''
  });

  const login = auth?.login || (() => Promise.resolve(false));
  const register = auth?.register || (() => Promise.resolve(false));

  // кастомная проверка и получение сообщения для конкретного input
  const getFieldError = (input: HTMLInputElement): string => {
    // кастомная валидация confirmPassword
    if (type === 'signup' && input.name === 'confirmPassword') {
      const same = input.value === formData.password;
      input.setCustomValidity(same ? '' : 'Пароли не совпадают');
    } else if (input.name === 'email') {
      // для email оставляем стандартную проверку type="email"
      input.setCustomValidity(''); // на всякий случай сброс
    } else {
      input.setCustomValidity(''); // сброс кастомных ошибок, если были
    }

    return input.validity.valid ? '' : input.validationMessage;
  };

  const validateForm = (): boolean => {
    const form = formRef.current;
    if (!form) return true;

    const newErrors: Record<string, string> = {};
    const elements = Array.from(form.elements) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[];

    elements.forEach((el) => {
      if (el instanceof HTMLInputElement) {
        // валидируем только видимые и имеющие name инпуты
        if (!el.name) return;
        const msg = getFieldError(el);
        if (msg) newErrors[el.name] = msg;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // синхронно валидируем форму на основе HTML5-правил
    const ok = validateForm();
    if (!ok) {
      // установить фокус на первое невалидное поле
      const firstInvalid = formRef.current?.querySelector('input:invalid') as HTMLInputElement | null;
      firstInvalid?.focus();
      return;
    }

    try {
      if (type === "signin") {
        const success = await login(formData.email, formData.password);
        if (success) {
          notify("✅ Успешный вход!", "success");
          onClose();
        } else {
          notify("❌ Неверный email или пароль", "error");
        }
      } else {
        const success = await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          company: formData.company
        });

        if (success) {
          notify("✅ Регистрация прошла успешно!", "success");
          onClose();
        }
      }
    } catch (error) {
      console.error("Ошибка авторизации/регистрации", error);
      notify(error instanceof Error ? error.message : "❌ Ошибка авторизации/регистрации", "error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // после первой попытки сабмита — пересчитываем ошибку конкретного поля «на лету»
    if (submitted) {
      const msg = getFieldError(e.target);
      setErrors((prev) => ({ ...prev, [name]: msg }));
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative z-40">
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {type === 'signin' ? t('signIn') : t('signUp')}
            </h2>
            <p className="text-gray-600">
              {type === 'signin'
                  ? 'Войдите в свой аккаунт для продолжения'
                  : 'Создайте аккаунт и начните использовать ChatPro'}
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
            {type === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('fullName')}
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required={type === 'signup'}
                        className={`w-full px-4 py-3 border ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="Введите ваше имя"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('company')}
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Название компании"
                    />
                  </div>
                </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                  placeholder="your@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                    className={`w-full px-4 py-3 pr-12 border ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {type === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('confirmPassword')}
                  </label>
                  <div className="relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={type === 'signup'}
                        className={`w-full px-4 py-3 pr-12 border ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                        placeholder="••••••••"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                      <p id="confirm-error" className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {type === 'signin' ? t('signIn') : t('createAccount')}
            </button>
          </form>
        </div>
      </div>
  );
}
