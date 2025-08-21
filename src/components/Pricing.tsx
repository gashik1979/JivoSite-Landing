import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('starterPlan'),
      price: t('starterPrice'),
      description: t('starterDesc'),
      features: [
        `1 ${t('operators')}`,
        `100 ${t('chats')}`,
        `3 ${t('integrations')}`,
        `Email ${t('support')}`
      ],
      popular: false
    },
    {
      name: t('proPlan'),
      price: t('proPrice'),
      description: t('proDesc'),
      features: [
        `5 ${t('operators')}`,
        `1000 ${t('chats')}`,
        `${t('unlimited')} ${t('integrations')}`,
        `${t('priority')} ${t('support')}`
      ],
      popular: true
    },
    {
      name: t('businessPlan'),
      price: t('businessPrice'),
      description: t('businessDesc'),
      features: [
        `${t('unlimited')} ${t('operators')}`,
        `${t('unlimited')} ${t('chats')}`,
        `${t('unlimited')} ${t('integrations')}`,
        `${t('priority')} ${t('support')}`
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pricingTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricingSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 relative transition-transform duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {t('choosePlan')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}