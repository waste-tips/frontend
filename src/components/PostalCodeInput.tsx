import React, { useState } from 'react';
import { MapPin, Target, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PostalCodeInputProps {
  onPostalCodeChange: (code: string) => void;
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({ onPostalCodeChange }) => {
  const { t } = useLanguage();
  const [postalCode, setPostalCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);

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

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert(t('geolocationNotSupported'));
      return;
    }

    setIsDetecting(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Option 1: Direct API call (requires unrestricted API key)
      const directApiCall = async () => {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_GEOCODING_API_KEY}&language=de&region=de`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      };

      // Option 2: Server proxy call (more secure, requires backend endpoint)
      const proxyApiCall = async () => {
        const response = await fetch('/api/geocode', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ latitude, longitude })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      };

      // Try direct API call first, fallback to proxy if available
      let data;
      try {
        data = await directApiCall();
      } catch (error) {
        console.warn('Direct API call failed, trying proxy...', error);
        try {
          data = await proxyApiCall();
        } catch (proxyError) {
          console.error('Proxy API call also failed:', proxyError);
          throw new Error('Both direct and proxy API calls failed');
        }
      }

      if (data.status === 'OK' && data.results.length > 0) {
        // Find postal code in address components
        for (const result of data.results) {
          const postalCodeComponent = result.address_components.find(
            (component: any) => component.types.includes('postal_code')
          );

          if (postalCodeComponent) {
            const detectedCode = postalCodeComponent.long_name;
            if (validateGermanPostalCode(detectedCode)) {
              setPostalCode(detectedCode);
              setIsValid(true);
              onPostalCodeChange(detectedCode);
              return;
            }
          }
        }
        
        // If no valid German postal code found
        alert(t('noGermanPostalCodeFound'));
      } else {
        throw new Error(`Geocoding API error: ${data.status}`);
      }

    } catch (error) {
      console.error('Location detection error:', error);
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(t('locationPermissionDenied'));
            break;
          case error.POSITION_UNAVAILABLE:
            alert(t('locationUnavailable'));
            break;
          case error.TIMEOUT:
            alert(t('locationTimeout'));
            break;
          default:
            alert(t('locationError'));
            break;
        }
      } else {
        // More specific error handling
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('referer restrictions')) {
          alert(t('apiKeyRestrictionError'));
        } else {
          alert(t('geocodingError'));
        }
      }
    } finally {
      setIsDetecting(false);
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
            w-full pl-12 pr-16 py-4 text-lg font-medium rounded-xl border-2 
            bg-white/90 backdrop-blur-sm
            focus:outline-none focus:ring-4 focus:ring-green-200/50
            transition-all duration-200
            ${!isValid && postalCode.length === 5
              ? 'border-red-300 text-red-800 focus:border-red-400'
              : 'border-green-200 text-green-800 focus:border-green-400 hover:border-green-300'
            }
          `}
        />

        <button
          onClick={detectLocation}
          disabled={isDetecting}
          className={`
            absolute inset-y-0 right-0 pr-4 flex items-center
            text-green-500 hover:text-green-600 
            disabled:text-green-300 disabled:cursor-not-allowed
            transition-colors duration-200
          `}
          title={t('detectLocation')}
        >
          {isDetecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Target className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {!isValid && postalCode.length === 5 && (
        <div className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span>⚠️</span>
          <span>{t('invalidPostalCode')}</span>
        </div>
      )}
      
      {isValid && postalCode.length === 5 && (
        <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
          <span>✓</span>
          <span>{t('validPostalCode')}</span>
        </div>
      )}
    </div>
  );
};

export default PostalCodeInput;