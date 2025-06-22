import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import PostalCodeInput from './components/PostalCodeInput';
import FileUpload from './components/FileUpload';
import AnalyzeButton from './components/AnalyzeButton';
import InfoSection from './components/InfoSection';
import ResultsSection from './components/ResultsSection';
import { useLanguage } from './contexts/LanguageContext';

interface AnalysisResult {
  success: boolean;
  html?: string;
  error?: string;
}

const AppContent: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [postalCode, setPostalCode] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePostalCodeChange = (code: string) => {
    setPostalCode(code);
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const handleAnalyze = async (recaptchaToken: string | null) => {
    if (!recaptchaToken || !uploadedFile || !postalCode) {
      console.error('Missing required data for analysis');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('postal_code', postalCode);
      formData.append('recaptcha_code', recaptchaToken);
      formData.append('language', currentLanguage);

      const response = await fetch('https://backend-service-7lnemd56tq-ey.a.run.app', {
        method: 'POST',
        body: formData,
      });

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);

      // Scroll to results section after a short delay
      setTimeout(() => {
        const resultsElement = document.getElementById('results-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);

    } catch (error) {
      console.error('Error analyzing waste:', error);
      setAnalysisResult({
        success: false,
        error: 'Network error occurred. Please try again.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50">
      {/* Header */}
      <header className="relative pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg" style={{ minWidth: '3rem', minHeight: '3rem' }}>
                <span className="text-2xl">♻️</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-green-800">
                  {t('title')}
                </h1>
                <p className="text-green-600 font-medium">
                  {t('subtitle')}
                </p>
              </div>
            </div>
            <LanguageSelector />
          </div>

          <div className="text-center">
            <p className="text-xl text-green-700 leading-relaxed max-w-3xl mx-auto">
              {t('description')}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Overlapping the header */}
      <main className="max-w-4xl mx-auto px-6 pb-16 -mt-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-8 md:p-12">
          <div className="space-y-8">
            {/* Postal Code Input */}
            <div>
              <label className="block text-lg font-semibold text-green-800 mb-4">
                {t('postalCodeLabel')}
              </label>
              <PostalCodeInput onPostalCodeChange={handlePostalCodeChange} />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-lg font-semibold text-green-800 mb-4">
                {t('uploadPhotoLabel')}
              </label>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            {/* Analyze Button with reCAPTCHA */}
            <AnalyzeButton 
              postalCode={postalCode}
              uploadedFile={uploadedFile}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          </div>
        </div>
      </main>

      {/* Results Section */}
      {analysisResult && (
        <ResultsSection 
          result={analysisResult}
          onNewAnalysis={() => {
            setAnalysisResult(null);
            setUploadedFile(null);
            setPostalCode('');
          }}
        />
      )}

      {/* Info Section */}
      <InfoSection />

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-green-200">
            © 2025 Waste Sorting Helper. Made with 💚 for a greener Germany.
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;