import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Mic, Send, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  audioUrl?: string;
}

interface ChatProps {
  selectedLanguage: string;
  selectedCategory: string;
  phoneNumber: string;
}

export default function Chat({ selectedLanguage, selectedCategory, phoneNumber }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categoryPrompts = {
    farmer: {
      en: "I'm a farmer. What government schemes are available for me?",
      hi: "मैं एक किसान हूं। मेरे लिए कौन सी सरकारी योजनाएं उपलब्ध हैं?",
      bn: "আমি একজন কৃষক। আমার জন্য কী সরকারি প্রকল্প রয়েছে?",
      ta: "நான் ஒரு விவசாயி. எனக்கு என்ன அரசு திட்டங்கள் உள்ளன?",
      te: "నేను రైతును. నాకు ఏ ప్రభుత్వ పథకాలు అందుబాటులో ఉన్నాయి?",
      mr: "मी एक शेतकरी आहे. माझ्यासाठी कोणत्या सरकारी योजना उपलब्ध आहेत?",
      gu: "હું એક ખેડૂત છું. મારા માટે કઈ સરકારી યોજનાઓ ઉપલબ્ધ છે?",
      kn: "ನಾನು ಒಬ್ಬ ರೈತ. ನನಗೆ ಯಾವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಲಭ್ಯವಿವೆ?",
      ml: "ഞാൻ ഒരു കർഷകനാണ്. എനിക്ക് എന്ത് സർക്കാർ പദ്ധതികൾ ലഭ്യമാണ്?",
      pa: "ਮੈਂ ਇੱਕ ਕਿਸਾਨ ਹਾਂ। ਮੇਰੇ ਲਈ ਕਿਹੜੀਆਂ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਉਪਲਬਧ ਹਨ?",
      or: "ମୁଁ ଜଣେ କୃଷକ। ମୋ ପାଇଁ କେଉଁ ସରକାରୀ ଯୋଜନା ଉପଲବ୍ଧ?",
      as: "মই এজন কৃষক। মোৰ বাবে কি চৰকাৰী আঁচনি উপলব্ধ?"
    }
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedLanguage === 'en' ? 'en-US' : 
                       selectedLanguage === 'hi' ? 'hi-IN' :
                       selectedLanguage === 'bn' ? 'bn-BD' : 'en-US';
      setRecognition(recognition);
    }

    // Send initial greeting based on category
    const greeting = categoryPrompts[selectedCategory as keyof typeof categoryPrompts]?.[selectedLanguage as keyof typeof categoryPrompts.farmer] ||
                    categoryPrompts.farmer.en;
    
    if (greeting) {
      sendMessage(greeting, true); // true for initial greeting
    }

    scrollToBottom();
  }, [selectedLanguage, selectedCategory]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (message: string, isInitial = false) => {
    if (!message.trim() && !isInitial) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    if (!isInitial) {
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
    }
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          language: selectedLanguage,
          user_id: phoneNumber,
          voice_enabled: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date(),
        audioUrl: data.audio_url,
      };

      setMessages(prev => isInitial ? [botMessage] : [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => isInitial ? [errorMessage] : [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(inputMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(console.error);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h1 className="text-xl font-semibold">GramAI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Government schemes and services help
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className="w-8 h-8 mx-2">
                <AvatarFallback>
                  {message.isUser ? 'U' : 'AI'}
                </AvatarFallback>
              </Avatar>
              <Card className={`${message.isUser ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.audioUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playAudio(message.audioUrl!)}
                      className="mt-2 p-1 h-auto"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%]">
              <Avatar className="w-8 h-8 mx-2">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <Card className="bg-card">
                <CardContent className="p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about government schemes..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            disabled={isLoading}
          >
            <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim() || isLoading}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
