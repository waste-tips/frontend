import React from 'react';
import { CheckCircle, XCircle, RotateCcw, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AnalysisResult {
  success: boolean;
  html?: string;
  error?: string;
}

interface ResultsSectionProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onNewAnalysis }) => {
  const { t } = useLanguage();

  return (
    <section id="results-section" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-100 p-8 md:p-12">
          {result.success ? (
            <>
              {/* Success Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-green-800">
                    {t('analysisComplete')}
                  </h2>
                  <p className="text-green-600 font-medium">
                    {t('analysisCompleteDescription')}
                  </p>
                </div>
              </div>

              {/* Results Content */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100 mb-8">
                <div 
                  className="prose prose-green max-w-none"
                  dangerouslySetInnerHTML={{ __html: result.html || '' }}
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#374151'
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {/* Error Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 rounded-full">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-red-800">
                    {t('analysisError')}
                  </h2>
                  <p className="text-red-600 font-medium">
                    {t('analysisErrorDescription')}
                  </p>
                </div>
              </div>

              {/* Error Content */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 font-medium">
                    {result.error || t('genericError')}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* New Analysis Button */}
          <div className="text-center">
            <button
              onClick={onNewAnalysis}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t('newAnalysis')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;