import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Header
    features: 'Возможности',
    pricing: 'Тарифы',
    about: 'О нас',
    contact: 'Контакты',
    login: 'Войти',
    getStarted: 'Начать бесплатно',
    
    // Hero Section
    heroTitle: 'Общайтесь с клиентами в реальном времени',
    heroSubtitle: 'Увеличивайте продажи с помощью онлайн-чата, который объединяет все каналы связи в одном месте',
    startFree: 'Начать бесплатно',
    watchDemo: 'Смотреть демо',
    
    // Stats
    activeChats: 'Активных чатов в месяц',
    satisfactionRate: 'Уровень удовлетворенности',
    responseTime: 'Среднее время ответа',
    
    // Features
    featuresTitle: 'Все необходимые инструменты для работы с клиентами',
    featuresSubtitle: 'Наша платформа объединяет все каналы связи и предоставляет мощные инструменты для увеличения продаж',
    
    multiChannelTitle: 'Мультиканальность',
    multiChannelDesc: 'Объединяйте чат, email, телефон, WhatsApp, Telegram в единый интерфейс',
    
    automationTitle: 'Автоматизация',
    automationDesc: 'Настройте чат-ботов и автоответчики для работы 24/7',
    
    analyticsTitle: 'Аналитика',
    analyticsDesc: 'Получайте детальную статистику по общению с клиентами',
    
    crmTitle: 'CRM интеграция',
    crmDesc: 'Синхронизируйтесь с популярными CRM системами',
    
    mobileTitle: 'Мобильные приложения',
    mobileDesc: 'Отвечайте клиентам где угодно с iOS и Android приложений',
    
    teamTitle: 'Командная работа',
    teamDesc: 'Распределяйте диалоги между операторами и отделами',
    
    // Pricing
    pricingTitle: 'Прозрачные тарифы для любого бизнеса',
    pricingSubtitle: 'Выберите план, который подходит именно вам',
    
    starterPlan: 'Стартер',
    starterPrice: 'Бесплатно',
    starterDesc: 'Идеально для начинающих',
    
    proPlan: 'Профессиональный',
    proPrice: '990 ₽/мес',
    proDesc: 'Для растущего бизнеса',
    
    businessPlan: 'Бизнес',
    businessPrice: '2990 ₽/мес',
    businessDesc: 'Для крупных компаний',
    
    choosePlan: 'Выбрать план',
    
    // Features List
    operators: 'оператора',
    chats: 'чата в месяц',
    integrations1: 'интеграции',
    support1: 'поддержка',
    unlimited: 'Безлимитно',
    priority: 'Приоритетная',
    
    // Testimonials
    testimonialsTitle: 'Нам доверяют тысячи компаний',
    testimonialsSubtitle: 'Отзывы наших клиентов говорят сами за себя',
    
    testimonial1: 'После внедрения чата продажи выросли на 35%. Клиенты получают мгновенные ответы на вопросы.',
    testimonial1Author: 'Анна Петрова',
    testimonial1Position: 'Директор по продажам, TechStore',
    
    testimonial2: 'Удобный интерфейс и отличная интеграция с нашей CRM. Рекомендуем всем!',
    testimonial2Author: 'Михаил Сидоров',
    testimonial2Position: 'CEO, WebAgency',
    
    // CTA
    ctaTitle: 'Готовы увеличить продажи?',
    ctaSubtitle: 'Присоединяйтесь к тысячам компаний, которые уже используют наш чат',
    
    // Footer
    product: 'Продукт',
    company: 'Компания',
    support: 'Поддержка',
    legal: 'Документы',
    
    demo: 'Демо',
    integrations: 'Интеграции',
    api: 'API',
    
    aboutUs: 'О нас',
    careers: 'Карьера',
    blog: 'Блог',
    
    helpCenter: 'Центр помощи',
    documentation: 'Документация',
    
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    
    copyright: '© 2024 ChatPro. Все права защищены.',
    
    // Auth
    signIn: 'Войти',
    signUp: 'Регистрация',
    email: 'Email',
    password: 'Пароль',
    confirmPassword: 'Подтвердите пароль',
    fullName: 'Полное имя',
    forgotPassword: 'Забыли пароль?',
    dontHaveAccount: 'Нет аккаунта?',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    createAccount: 'Создать аккаунт',
    
    // Dashboard
    dashboard: 'Панель управления',
    activeChatsCount: 'Активные чаты',
    totalMessages: 'Всего сообщений',
    responseRate: 'Скорость ответа',
    onlineOperators: 'Операторы онлайн',
    recentChats: 'Недавние чаты',
    chatWith: 'Чат с',
    minutes: 'мин',
    ago: 'назад',
    reply: 'Ответить',
    settings: 'Настройки',
    profile: 'Профиль',
    logout: 'Выйти',
    newMessage: 'Новое сообщение',
    typing: 'печатает...',
  },
  en: {
    // Header
    features: 'Features',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    login: 'Sign In',
    getStarted: 'Get Started Free',
    
    // Hero Section
    heroTitle: 'Connect with customers in real-time',
    heroSubtitle: 'Boost sales with live chat that unifies all communication channels in one place',
    startFree: 'Start Free',
    watchDemo: 'Watch Demo',
    
    // Stats
    activeChats: 'Active chats per month',
    satisfactionRate: 'Satisfaction rate',
    responseTime: 'Average response time',
    
    // Features
    featuresTitle: 'Everything you need to serve customers',
    featuresSubtitle: 'Our platform combines all communication channels and provides powerful tools to increase sales',
    
    multiChannelTitle: 'Multi-channel',
    multiChannelDesc: 'Combine chat, email, phone, WhatsApp, Telegram in a single interface',
    
    automationTitle: 'Automation',
    automationDesc: 'Set up chatbots and auto-responders to work 24/7',
    
    analyticsTitle: 'Analytics',
    analyticsDesc: 'Get detailed statistics on customer communication',
    
    crmTitle: 'CRM Integration',
    crmDesc: 'Sync with popular CRM systems',
    
    mobileTitle: 'Mobile Apps',
    mobileDesc: 'Reply to customers anywhere with iOS and Android apps',
    
    teamTitle: 'Team Collaboration',
    teamDesc: 'Distribute conversations between operators and departments',
    
    // Pricing
    pricingTitle: 'Transparent pricing for any business',
    pricingSubtitle: 'Choose a plan that fits your needs',
    
    starterPlan: 'Starter',
    starterPrice: 'Free',
    starterDesc: 'Perfect for getting started',
    
    proPlan: 'Professional',
    proPrice: '$19/month',
    proDesc: 'For growing businesses',
    
    businessPlan: 'Business',
    businessPrice: '$59/month',
    businessDesc: 'For large companies',
    
    choosePlan: 'Choose Plan',
    
    // Features List
    operators: 'operators',
    chats: 'chats per month',
    integrations1: 'integrations',
    support1: 'support',
    unlimited: 'Unlimited',
    priority: 'Priority',
    
    // Testimonials
    testimonialsTitle: 'Trusted by thousands of companies',
    testimonialsSubtitle: 'Our customer reviews speak for themselves',
    
    testimonial1: 'After implementing chat, sales increased by 35%. Customers get instant answers to their questions.',
    testimonial1Author: 'Anna Petrova',
    testimonial1Position: 'Sales Director, TechStore',
    
    testimonial2: 'User-friendly interface and excellent CRM integration. We recommend it to everyone!',
    testimonial2Author: 'Michael Sidorov',
    testimonial2Position: 'CEO, WebAgency',
    
    // CTA
    ctaTitle: 'Ready to boost your sales?',
    ctaSubtitle: 'Join thousands of companies already using our chat',
    
    // Footer
    product: 'Product',
    company: 'Company',
    support: 'Support',
    legal: 'Legal',
    
    demo: 'Demo',
    integrations: 'Integrations',
    api: 'API',
    
    aboutUs: 'About Us',
    careers: 'Careers',
    blog: 'Blog',
    
    helpCenter: 'Help Center',
    documentation: 'Documentation',
    
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    
    copyright: '© 2024 ChatPro. All rights reserved.',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    
    // Dashboard
    dashboard: 'Dashboard',
    activeChatsCount: 'Active Chats',
    totalMessages: 'Total Messages',
    responseRate: 'Response Rate',
    onlineOperators: 'Online Operators',
    recentChats: 'Recent Chats',
    chatWith: 'Chat with',
    minutes: 'min',
    ago: 'ago',
    reply: 'Reply',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    newMessage: 'New message',
    typing: 'typing...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}