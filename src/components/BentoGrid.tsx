import { Button } from './ui/button'
import { Card } from './ui/card'
import { getTranslation, LanguageCode } from '../lib/translations'
import benefitsImg from '../assets/benefits-illustration.jpg'
import languagesImg from '../assets/languages-illustration.jpg'
import schemesImg from '../assets/schemes-illustration.jpg'

interface BentoGridProps {
  language: LanguageCode
  onStartChat: () => void
}

export default function BentoGrid({ language, onStartChat }: BentoGridProps) {
  const t = (key: any) => getTranslation(key, language)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Main Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Large hero card */}
        <Card className="lg:col-span-2 p-8 bg-blue-50 border-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              {t('subtitle')}
            </p>
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onStartChat}
            >
              {t('askQuestion')}
            </Button>
          </div>
        </Card>

        {/* What is GramAI */}
        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {t('whatIsGramAI')}
          </h2>
          <p className="text-gray-700 text-sm">
            {t('whatIsGramAIDesc')}
          </p>
        </Card>
      </div>

      {/* Main Services Grid with Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Government Schemes */}
        <Card className="p-0 bg-white border-gray-200 overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
            <img 
              src={schemesImg} 
              alt="Government Schemes" 
              className="h-32 w-32 object-cover rounded-lg shadow-sm"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('governmentSchemes')}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {t('governmentSchemesDesc')}
            </p>
            <Button size="sm" variant="outline" className="w-full">
              {t('learnMore')}
            </Button>
          </div>
        </Card>

        {/* Jobs & Employment */}
        <Card className="p-0 bg-white border-gray-200 overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <img 
              src={benefitsImg} 
              alt="Jobs and Employment" 
              className="h-32 w-32 object-cover rounded-lg shadow-sm"
            />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('jobsAndEmployment')}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {t('jobsAndEmploymentDesc')}
            </p>
            <Button size="sm" variant="outline" className="w-full">
              {t('learnMore')}
            </Button>
          </div>
        </Card>

        {/* Citizen Services */}
        <Card className="p-0 bg-white border-gray-200 overflow-hidden">
          <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
            <div className="text-6xl">📋</div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('citizenServices')}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {t('citizenServicesDesc')}
            </p>
            <Button size="sm" variant="outline" className="w-full">
              {t('learnMore')}
            </Button>
          </div>
        </Card>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Easy to Use */}
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="text-3xl mb-3">✨</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t('easyToUse')}
          </h3>
          <p className="text-sm text-gray-700">
            {t('easyToUseDesc')}
          </p>
        </Card>

        {/* Instant Answers */}
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t('instantAnswers')}
          </h3>
          <p className="text-sm text-gray-700">
            {t('instantAnswersDesc')}
          </p>
        </Card>

        {/* Your Language */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="text-3xl mb-3">🗣️</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t('multipleLanguages')}
          </h3>
          <p className="text-sm text-gray-700">
            {t('multipleLanguagesDesc')}
          </p>
        </Card>

        {/* Free to Use */}
        <Card className="p-6 bg-orange-50 border-orange-200">
          <div className="text-3xl mb-3">🆓</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {t('freeToUse')}
          </h3>
          <p className="text-sm text-gray-700">
            {t('freeToUseDesc')}
          </p>
        </Card>
      </div>

      {/* How it Works & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6 bg-indigo-50 border-indigo-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            {t('howItWorks')}
          </h2>
          <p className="text-gray-700 mb-4">
            {t('howItWorksDesc')}
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-700">
              <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-semibold mr-3">1</span>
              <span>Ask in your language (type or speak)</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-semibold mr-3">2</span>
              <span>GramAI understands and finds the answer</span>
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 font-semibold mr-3">3</span>
              <span>Get clear information in your language</span>
            </div>
          </div>
        </Card>

        <Card className="p-0 bg-white border-gray-200 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center">
            <img 
              src={languagesImg} 
              alt="Multiple Languages" 
              className="h-40 w-40 object-cover rounded-lg shadow-sm"
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t('supportedLanguages')}
            </h2>
            <p className="text-gray-700 mb-4">
              {t('supportedLanguagesDesc')}
            </p>
            <div className="flex flex-wrap gap-2">
              {['हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'मराठी', 'ગુજરાતી', 'ਪੰਜਾਬੀ', 'English'].map((lang) => (
                <span 
                  key={lang} 
                  className="px-3 py-1 bg-orange-100 border border-orange-200 rounded-full text-sm text-orange-800 font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {t('getStarted')}
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          {t('getStartedDesc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            onClick={onStartChat}
          >
            {t('startChat')}
          </Button>
          <Button 
            size="lg"
            variant="outline" 
            className="border-blue-300 text-blue-700 hover:bg-blue-50 flex-1"
            onClick={onStartChat}
          >
            {t('tryNow')}
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <div className="text-center mt-8 py-6">
        <p className="text-gray-600">
          {t('madeWith')}
        </p>
      </div>
    </div>
  )
}
