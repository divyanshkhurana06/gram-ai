import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Textarea } from './ui/textarea'
import { getTranslation, LanguageCode } from '../lib/translations'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  language: LanguageCode
}

interface ChatInterfaceProps {
  language: LanguageCode
  onBack: () => void
}

export default function ChatInterface({ language, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const t = (key: any) => getTranslation(key, language)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        
        // Set language based on selected language
        const speechLang = getSpeechLanguageCode(language)
        recognitionRef.current.lang = speechLang
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setInputText(transcript)
          setIsListening(false)
        }
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          
          // Handle specific errors
          if (event.error === 'not-allowed') {
            alert(language === 'hi' ? 'कृपया माइक्रोफोन की अनुमति दें' :
                  language === 'bn' ? 'দয়া করে মাইক্রোফোনের অনুমতি দিন' :
                  language === 'te' ? 'దయచేసి మైక్రోఫోన్ అనుమతిని ఇవ్వండి' :
                  language === 'ta' ? 'தயவுசெய்து மைக்ரோஃபோன் அனுமதியை வழங்கவும்' :
                  language === 'mr' ? 'कृपया मायक्रोफोनची परवानगी द्या' :
                  language === 'gu' ? 'કૃપા કરીને માઈક્રોફોનની પરવાનગી આપો' :
                  'Please allow microphone access')
          } else if (event.error === 'no-speech') {
            // Just reset, no alert needed for no speech detected
          }
        }
        
        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [language])

  const getSpeechLanguageCode = (lang: LanguageCode): string => {
    // Verified language codes that work with Web Speech API
    const langMap: Record<string, string> = {
      'hi': 'hi-IN',
      'en': 'en-US',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'mr': 'mr-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'ur': 'ur-PK',
      'ne': 'ne-NP',
      'pa': 'pa-IN'
    }
    return langMap[lang] || 'en-US'
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true)
        recognitionRef.current.start()
      } catch (error) {
        console.error('Speech recognition start error:', error)
        setIsListening(false)
        // Show user-friendly error message
        alert(language === 'hi' ? 'माइक्रोफोन की अनुमति दें या बाद में कोशिश करें' :
              language === 'bn' ? 'মাইক্রোফোনের অনুমতি দিন বা পরে চেষ্টা করুন' :
              'Please allow microphone access or try again later')
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Set language for speech synthesis
      utterance.lang = getSpeechLanguageCode(language)
      utterance.rate = 0.9
      utterance.pitch = 1
      
      utterance.onend = () => {
        setIsSpeaking(false)
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      language
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getSimulatedResponse(inputText, language),
        isUser: false,
        timestamp: new Date(),
        language
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
      
      // Auto-speak the response
      speakText(botResponse.text)
    }, 1500)
  }

  const getSimulatedResponse = (input: string, lang: LanguageCode): string => {
    const responses = {
      hi: "मैं आपकी सरकारी योजनाओं से संबंधित मदद कर सकता हूं। कृपया अपना प्रश्न पूछें।",
      bn: "আমি আপনাকে সরকারি প্রকল্প সম্পর্কিত সাহায্য করতে পারি। দয়া করে আপনার প্রশ্ন করুন।",
      te: "నేను మీకు ప్రభుత్వ పథకాలకు సంబంధించిన సహాయం చేయగలను. దయచేసి మీ ప్రశ్న అడగండి।",
      ta: "நான் உங்களுக்கு அரசு திட்டங்கள் தொடர்பான உதவி செய்ய முடியும். தயவுசெய்து உங்கள் கேள்வியைக் கேளுங்கள்।",
      mr: "मी तुम्हाला सरकारी योजनांशी संबंधित मदत करू शकतो. कृपया तुमचा प्रश्न विचारा.",
      gu: "હું તમને સરકારી યોજનાઓ સંબંધિત મદદ કરી શકું છું. કૃપા કરીને તમારો પ્રશ્ન પૂછો.",
      en: "I can help you with government schemes and services. Please ask your question."
    }
    return responses[lang] || responses.en
  }

  const getExampleQuestions = (lang: LanguageCode): string[] => {
    const questions = {
      hi: [
        "किसानों के लिए कौन सी योजनाएं हैं?",
        "सरकारी नौकरी कैसे पाऊं?",
        "आधार कार्ड कैसे बनवाएं?",
        "पेंशन योजना क्या है?"
      ],
      bn: [
        "কৃষকদের জন্য কি প্রকল্প আছে?",
        "সরকারি চাকরি কিভাবে পাব?",
        "আধার কার্ড কিভাবে বানাব?",
        "পেনশন স্কিম কি?"
      ],
      te: [
        "రైతులకు ఏ పథకాలు ఉన్నాయి?",
        "ప్రభుత్వ ఉద్యోగం ఎలా పొందాలి?",
        "ఆధార్ కార్డ్ ఎలా చేయించాలి?",
        "పెన్షన్ స్కీమ్ ఏమిటి?"
      ],
      ta: [
        "விவசாயிகளுக்கு என்ன திட்டங்கள் உள்ளன?",
        "அரசு வேலை எப்படி பெறுவது?",
        "ஆதார் கார்டு எப்படி செய்வது?",
        "ஓய்வூதிய திட்டம் என்ன?"
      ],
      mr: [
        "शेतकऱ्यांसाठी कोणत्या योजना आहेत?",
        "सरकारी नोकरी कशी मिळवावी?",
        "आधार कार्ड कसे बनवावे?",
        "पेन्शन योजना काय आहे?"
      ],
      gu: [
        "ખેડૂતો માટે કઈ યોજનાઓ છે?",
        "સરકારી નોકરી કેવી રીતે મેળવવી?",
        "આધાર કાર્ડ કેવી રીતે બનાવવું?",
        "પેન્શન સ્કીમ શું છે?"
      ],
      en: [
        "What schemes are available for farmers?",
        "How to get a government job?",
        "How to make Aadhaar card?",
        "What is the pension scheme?"
      ]
    }
    return questions[lang] || questions.en
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-blue-700"
            >
              ← {language === 'hi' ? 'वापस' : 
                  language === 'bn' ? 'ফিরে' :
                  language === 'te' ? 'వెనుకకు' :
                  language === 'ta' ? 'திரும்பு' :
                  language === 'mr' ? 'परत' :
                  language === 'gu' ? 'પાછા' :
                  'Back'}
            </Button>
            <div>
              <h1 className="text-xl font-bold">
                {language === 'hi' ? 'ग्रामAI सहायक' :
                 language === 'bn' ? 'গ্রামAI সহায়ক' :
                 language === 'te' ? 'గ్రామAI సహాయకుడు' :
                 language === 'ta' ? 'கிராம்AI உதவியாளர்' :
                 language === 'mr' ? 'ग्रामAI सहाय्यक' :
                 language === 'gu' ? 'ગ્રામAI સહાયક' :
                 'GramAI Assistant'}
              </h1>
              <p className="text-blue-100 text-sm">
                {language === 'hi' ? 'सरकारी सहायता के लिए पूछें' :
                 language === 'bn' ? 'সরকারি সাহায্যের জন্য জিজ্ঞাসা করুন' :
                 language === 'te' ? 'ప్రభుత్వ సహాయం కోసం అడగండి' :
                 language === 'ta' ? 'அரசு உதவிக்காக கேளுங்கள்' :
                 language === 'mr' ? 'सरकारी मदतीसाठी विचारा' :
                 language === 'gu' ? 'સરકારી મદદ માટે પૂછો' :
                 'Ask for government assistance'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">🏛️ सरकारी सेवा</div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <Card className="p-6 bg-blue-50 border-blue-200 text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'hi' ? 'नमस्कार! मैं ग्रामAI हूं' :
                   language === 'bn' ? 'নমস্কার! আমি গ্রামAI' :
                   language === 'te' ? 'నమస్కారం! నేను గ్రామAI' :
                   language === 'ta' ? 'வணக்கம்! நான் கிராம்AI' :
                   language === 'mr' ? 'नमस्कार! मी ग्रामAI आहे' :
                   language === 'gu' ? 'નમસ્કાર! હું ગ્રામAI છું' :
                   'Hello! I am GramAI'}
                </h3>
                <p className="text-gray-700">
                  {language === 'hi' ? 'सरकारी योजनाओं, नौकरियों और सेवाओं के बारे में पूछें। आप टाइप कर सकते हैं या माइक का उपयोग कर सकते हैं।' :
                   language === 'bn' ? 'সরকারি প্রকল্প, চাকরি এবং সেবা সম্পর্কে জিজ্ঞাসা করুন। আপনি টাইপ করতে পারেন বা মাইক ব্যবহার করতে পারেন।' :
                   language === 'te' ? 'ప్రభుత్వ పథకాలు, ఉద్యోగాలు మరియు సేవల గురించి అడగండి. మీరు టైప్ చేయవచ్చు లేదా మైక్ ఉపయోగించవచ్చు।' :
                   language === 'ta' ? 'அரசு திட்டங்கள், வேலைகள் மற்றும் சேवைகள் பற்றி கேளுங்கள். நீங்கள் தட்டச்சு செய்யலாம் அல்லது மைக்கைப் பயன்படுத்தலாம்.' :
                   language === 'mr' ? 'सरकारी योजना, नोकऱ्या आणि सेवांबद्दल विचारा. तुम्ही टाइप करू शकता किंवा माइक वापरू शकता.' :
                   language === 'gu' ? 'સરકારી યોજનાઓ, નોકરીઓ અને સેવાઓ વિશે પૂછો. તમે ટાઈપ કરી શકો છો અથવા માઈકનો ઉપયોગ કરી શકો છો.' :
                   'Ask about government schemes, jobs, and services. You can type or use the microphone.'}
                </p>
              </Card>

              {/* Example Questions */}
              <Card className="p-4 bg-green-50 border-green-200">
                <h4 className="font-semibold text-gray-900 mb-3 text-center">
                  {language === 'hi' ? 'उदाहरण प्रश्न:' :
                   language === 'bn' ? 'উদাহরণ প্রশ্ন:' :
                   language === 'te' ? 'ఉదాహరణ ప్రశ్నలు:' :
                   language === 'ta' ? 'உதாரண கேள்விகள்:' :
                   language === 'mr' ? 'उदाहरण प्रश्न:' :
                   language === 'gu' ? 'ઉદાહરણ પ્રશ્નો:' :
                   'Example Questions:'}
                </h4>
                <div className="grid gap-2">
                  {getExampleQuestions(language).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left h-auto p-3 hover:bg-green-100 border-green-300 text-green-800"
                      onClick={() => setInputText(question)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">💬</span>
                        <span className="text-sm">{question}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-xs sm:max-w-md lg:max-w-lg p-4 ${
                  message.isUser
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  {!message.isUser && (
                    <div className="text-2xl">🏛️</div>
                  )}
                  <div className="flex-1">
                    <p className={`${message.isUser ? 'text-white' : 'text-gray-900'}`}>
                      {message.text}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {!message.isUser && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => speakText(message.text)}
                          disabled={isSpeaking}
                          className="text-gray-600 hover:text-gray-900 p-1 h-auto"
                        >
                          {isSpeaking ? '🔊' : '🔉'}
                        </Button>
                      )}
                    </div>
                  </div>
                  {message.isUser && (
                    <div className="text-2xl">👤</div>
                  )}
                </div>
              </Card>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-xs p-4 bg-white border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🏛️</div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  language === 'hi' ? 'अपना प्रश्न यहाँ लिखें...' :
                  language === 'bn' ? 'আপনার প্রশ্ন এখানে লিখুন...' :
                  language === 'te' ? 'మీ ప్రశ్న ఇక్కడ రాయండి...' :
                  language === 'ta' ? 'உங்கள் கேள்வியை இங்கே எழுதுங்கள்...' :
                  language === 'mr' ? 'तुमचा प्रश्न येथे लिहा...' :
                  language === 'gu' ? 'તમારો પ્રશ્ન અહીં લખો...' :
                  'Type your question here...'
                }
                className="min-h-[60px] resize-none text-base"
                disabled={isLoading}
              />
            </div>
            
            {/* Voice Input Button */}
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isLoading}
              className={`h-[60px] px-4 ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">
                  {isListening ? '🎙️' : '🎤'}
                </span>
                <span className="text-xs">
                  {isListening 
                    ? (language === 'hi' ? 'सुन रहा' : 
                       language === 'bn' ? 'শুনছি' :
                       language === 'te' ? 'వింటున్న' :
                       language === 'ta' ? 'கேட்கிறது' :
                       language === 'mr' ? 'ऐकतो' :
                       language === 'gu' ? 'સાંભળી' :
                       'Listening')
                    : (language === 'hi' ? 'बोलें' :
                       language === 'bn' ? 'বলুন' :
                       language === 'te' ? 'మాట్లాడండి' :
                       language === 'ta' ? 'பேசுங்கள்' :
                       language === 'mr' ? 'बोला' :
                       language === 'gu' ? 'બોલો' :
                       'Speak')
                  }
                </span>
              </div>
            </Button>

            {/* Send Button */}
            <Button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className="h-[60px] px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">📤</span>
                <span className="text-xs">
                  {language === 'hi' ? 'भेजें' :
                   language === 'bn' ? 'পাঠান' :
                   language === 'te' ? 'పంపండి' :
                   language === 'ta' ? 'அனுப்பு' :
                   language === 'mr' ? 'पाठवा' :
                   language === 'gu' ? 'મોકલો' :
                   'Send'}
                </span>
              </div>
            </Button>
          </div>
          
          {/* Voice Status */}
          {isListening && (
            <div className="mt-2 text-center text-sm text-green-600 animate-pulse">
              🎙️ {language === 'hi' ? 'आपकी आवाज़ सुन रहा हूं...' :
                   language === 'bn' ? 'আপনার কথা শুনছি...' :
                   language === 'te' ? 'మీ మాట వింటున్నాను...' :
                   language === 'ta' ? 'உங்கள் குரலை கேட்கிறேன்...' :
                   language === 'mr' ? 'तुमचा आवाज ऐकत आहे...' :
                   language === 'gu' ? 'તમારો અવાજ સાંભળી રહ્યો છું...' :
                   'Listening to your voice...'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
