import { useState } from 'react'
import LanguageSelector from '../components/LanguageSelector'
import BentoGrid from '../components/BentoGrid'
import ChatInterface from '../components/ChatInterface'
import MouseMoveEffect from '../components/MouseMoveEffect'
import { LanguageCode } from '../lib/translations'

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode | null>(null)
  const [showChat, setShowChat] = useState(false)

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language as LanguageCode)
  }

  const handleStartChat = () => {
    setShowChat(true)
  }

  const handleBackToHome = () => {
    setShowChat(false)
  }

  return (
    <div className="min-h-screen bg-white relative">
      <MouseMoveEffect />
      
      {!selectedLanguage && (
        <LanguageSelector onLanguageSelect={handleLanguageSelect} />
      )}
      
      {selectedLanguage && !showChat && (
        <div className="relative z-10">
          {/* Language switcher in top right */}
          <div className="fixed top-4 right-4 z-20">
            <button
              onClick={() => setSelectedLanguage(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              🌍 {selectedLanguage === 'hi' ? 'भाषा बदलें' : 
                  selectedLanguage === 'bn' ? 'ভাষা পরিবর্তন' :
                  selectedLanguage === 'te' ? 'భాష మార్చండి' :
                  selectedLanguage === 'ta' ? 'மொழி மாற்று' :
                  selectedLanguage === 'mr' ? 'भाषा बदला' :
                  selectedLanguage === 'gu' ? 'ભાષા બદલો' :
                  'Change Language'}
            </button>
          </div>
          
          <BentoGrid language={selectedLanguage} onStartChat={handleStartChat} />
        </div>
      )}
      
      {selectedLanguage && showChat && (
        <ChatInterface 
          language={selectedLanguage} 
          onBack={handleBackToHome}
        />
      )}
    </div>
  )
}

export default Index
