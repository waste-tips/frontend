import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PostalCodeInputProps {
  onPostalCodeChange: (code: string) => void;
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({ onPostalCodeChange }) => {
  const { t } = useLanguage();
  const [postalCode, setPostalCode] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateGermanPostalCode = (code: string): boolean => {
    // German postal codes are 5 digits
    const regex = /^\d{5}$/;
    return regex.test(code);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5); // Only allow digits, max 5
    setPostalCode(value);
    
    if (value.length === 5) {
      const valid = validateGermanPostalCode(value);
      setIsValid(valid);
      if (valid) {
        onPostalCodeChange(value);
      }
    } else {
      setIsValid(true); // Don't show error while typing
      onPostalCodeChange('');
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MapPin className={`w-5 h-5 ${!isValid ? 'text-red-400' : 'text-green-400'}`} />
        </div>
        
        <input
          type="text"
          value={postalCode}
          onChange={handleChange}
          placeholder={t('postalCodePlaceholder')}
          autoComplete="off"
          className={`
            w-full pl-12 pr-4 py-4 text-lg font-medium rounded-xl border-2 
            bg-white/90 backdrop-blur-sm
            focus:outline-none focus:ring-4 focus:ring-green-200/50
            transition-all duration-200
            ${!isValid && postalCode.length === 5
              ? 'border-red-300 text-red-800 focus:border-red-400'
              : 'border-green-200 text-green-800 focus:border-green-400 hover:border-green-300'
            }
          `}
        />
      </div>
      
      {!isValid && postalCode.length === 5 && (
        <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          <span>Please enter a valid 5-digit German postal code</span>
        </div>
      )}
      
      {isValid && postalCode.length === 5 && (
        <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
          <span>✓</span>
          <span>Valid postal code</span>
        </div>
      )}
    </div>
  );
};

export default PostalCodeInput;