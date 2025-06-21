import React, { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-green-800 hover:text-green-900"
        aria-label={t('languageSelector')}
      >
        <Languages className="w-4 h-4" />
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="font-medium hidden sm:inline">{currentLang?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-green-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-green-700 px-2 py-1 mb-1">
              {t('languageSelector')}
            </div>
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-left hover:bg-green-50 transition-colors duration-150 ${
                  currentLanguage === language.code
                    ? 'bg-green-100 text-green-900 font-medium'
                    : 'text-gray-700 hover:text-green-800'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;