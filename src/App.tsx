import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import PostalCodeInput from './components/PostalCodeInput';
import FileUpload from './components/FileUpload';
import InfoSection from './components/InfoSection';
import { useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [postalCode, setPostalCode] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handlePostalCodeChange = (code: string) => {
    setPostalCode(code);
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-25 to-teal-50">
      {/* Header */}
      <header className="relative overflow-hidden pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
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

          <div className="text-center mb-12">
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
                📍 Postal Code
              </label>
              <PostalCodeInput onPostalCodeChange={handlePostalCodeChange} />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-lg font-semibold text-green-800 mb-4">
                📸 Upload Photo
              </label>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            {/* Action Button */}
            {postalCode && uploadedFile && (
              <div className="text-center pt-6">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg">
                  🔍 Analyze My Waste
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

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