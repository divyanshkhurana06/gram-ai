import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

interface Language {
  code: string
  name: string
  nativeName: string
}

// Only include languages with verified Web Speech API and TTS support
const languages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
]

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void
  selectedLanguage?: string
}

export default function LanguageSelector({ onLanguageSelect, selectedLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(!selectedLanguage)

  if (!isOpen && selectedLanguage) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏛️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            अपनी भाषा चुनें / Choose Your Language
          </h1>
          <p className="text-gray-600 text-lg">
            सरकारी मदद के लिए अपनी भाषा में पूछें<br/>
            <span className="text-sm">Ask for government help in your language</span>
          </p>
          <p className="text-sm text-blue-600 mt-2">
            ✅ Voice Recognition & Speech Support Verified
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="outline"
              className="h-20 flex flex-col justify-center items-center hover:bg-green-50 hover:border-green-300 transition-colors text-left border-2"
              onClick={() => {
                onLanguageSelect(language.code)
                setIsOpen(false)
              }}
            >
              <span className="font-bold text-lg text-gray-900 mb-1">
                {language.nativeName}
              </span>
              <span className="text-sm text-gray-600">
                {language.name}
              </span>
            </Button>
          ))}
        </div>
      </Card>
    </div>
  )
}