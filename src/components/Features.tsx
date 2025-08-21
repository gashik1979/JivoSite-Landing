import React from 'react';
import { MessageSquare, Zap, BarChart3, Link, Smartphone, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: MessageSquare,
      title: t('multiChannelTitle'),
      description: t('multiChannelDesc'),
      color: 'blue'
    },
    {
      icon: Zap,
      title: t('automationTitle'),
      description: t('automationDesc'),
      color: 'yellow'
    },
    {
      icon: BarChart3,
      title: t('analyticsTitle'),
      description: t('analyticsDesc'),
      color: 'green'
    },
    {
      icon: Link,
      title: t('crmTitle'),
      description: t('crmDesc'),
      color: 'purple'
    },
    {
      icon: Smartphone,
      title: t('mobileTitle'),
      description: t('mobileDesc'),
      color: 'indigo'
    },
    {
      icon: Users,
      title: t('teamTitle'),
      description: t('teamDesc'),
      color: 'pink'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('featuresTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('featuresSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}