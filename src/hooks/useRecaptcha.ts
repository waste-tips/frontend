import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const RECAPTCHA_SITE_KEY = '6Le192grAAAAADPqfnpdXdiBBGSs45vG6h1pLL60';

export const useRecaptcha = () => {
  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!window.grecaptcha?.enterprise) {
        console.warn('reCAPTCHA Enterprise not loaded');
        resolve(null);
        return;
      }

      window.grecaptcha.enterprise.ready(() => {
        window.grecaptcha.enterprise
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then((token) => {
            resolve(token);
          })
          .catch((error) => {
            console.error('reCAPTCHA execution failed:', error);
            resolve(null);
          });
      });
    });
  }, []);

  return { executeRecaptcha };
};