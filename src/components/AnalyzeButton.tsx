import React, { useState } from 'react';
import { Search, Shield, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRecaptcha } from '../hooks/useRecaptcha';

interface AnalyzeButtonProps {
  postalCode: string;
  uploadedFile: File | null;
  onAnalyze: (token: string | null) => void;
}

const AnalyzeButton: React.FC<AnalyzeButtonProps> = ({ postalCode, uploadedFile, onAnalyze }) => {
  const { t } = useLanguage();
  const { executeRecaptcha } = useRecaptcha();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!postalCode || !uploadedFile) return;

    setIsLoading(true);
    
    try {
      // Execute reCAPTCHA Enterprise
      const token = await executeRecaptcha('analyze_waste');
      
      if (token) {
        console.log('reCAPTCHA token received:', token.substring(0, 20) + '...');
        onAnalyze(token);
      } else {
        console.warn('Failed to get reCAPTCHA token');
        // You might want to show an error message to the user here
        onAnalyze(null);
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      onAnalyze(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !postalCode || !uploadedFile || isLoading;

  return (
    <div className="text-center pt-6">
      <button
        onClick={handleAnalyze}
        disabled={isDisabled}
        className={`
          relative overflow-hidden
          bg-gradient-to-r from-green-500 to-emerald-500 
          hover:from-green-600 hover:to-emerald-600 
          disabled:from-gray-400 disabled:to-gray-500
          text-white font-bold py-4 px-8 rounded-2xl 
          shadow-lg hover:shadow-xl 
          transform hover:scale-105 
          disabled:hover:scale-100 disabled:hover:shadow-lg
          transition-all duration-200 text-lg
          disabled:cursor-not-allowed
          min-w-[200px]
        `}
      >
        <div className="flex items-center justify-center gap-3">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('analyzing')}</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>{t('analyzeButton')}</span>
              <Shield className="w-4 h-4 opacity-70" />
            </>
          )}
        </div>
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 animate-pulse" />
        )}
      </button>
    </div>
  );
};

export default AnalyzeButton;