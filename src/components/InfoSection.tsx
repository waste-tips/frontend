import React from 'react';
import { Recycle, Leaf, Scale, PiggyBank } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const InfoSection: React.FC = () => {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: Recycle,
      text: t('reason1'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: Leaf,
      text: t('reason2'),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Scale,
      text: t('reason3'),
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      icon: PiggyBank,
      text: t('reason4'),
      color: 'text-lime-600',
      bgColor: 'bg-lime-100'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            {t('whyImportant')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-green-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`${reason.bgColor} ${reason.color} p-4 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed flex-1">
                    {reason.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;