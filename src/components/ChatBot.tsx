import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Volume2, Languages, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasAudio?: boolean;
}

interface ChatBotProps {
  isOpen: boolean;
}

export const ChatBot = ({ isOpen }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm GramAI, your government schemes assistant. Ask me about any government benefits or schemes in your preferred language.",
      isUser: false,
      timestamp: new Date(),
      hasAudio: true,
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "te", label: "Telugu" },
    { value: "ta", label: "Tamil" },
    { value: "bn", label: "Bengali" },
    { value: "mr", label: "Marathi" },
    { value: "gu", label: "Gujarati" },
    { value: "kn", label: "Kannada" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputValue}". Based on your query, I can help you find relevant government schemes. Here are some options that might interest you...`,
        isUser: false,
        timestamp: new Date(),
        hasAudio: true,
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement actual voice recording
  };

  const playAudio = (messageId: string) => {
    // Here you would implement TTS functionality
    console.log("Playing audio for message:", messageId);
  };

  if (!isOpen) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-8 px-6"
      id="chat"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Chat with GramAI
          </h2>
          <p className="text-muted-foreground text-lg">
            Ask about government schemes in your preferred language
          </p>
        </motion.div>

        <div className="glass rounded-3xl p-6 shadow-glass backdrop-blur-xl">
          {/* Language Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Languages className="h-5 w-5 text-primary" />
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48 glass border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass border-primary/20">
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              {messages.length - 1} messages
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-96 overflow-y-auto mb-6 space-y-4 scrollbar-hide">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? "bg-gradient-primary text-primary-foreground shadow-glow-primary"
                        : "glass border border-primary/20 text-foreground"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && (
                        <Bot className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      )}
                      {message.isUser && (
                        <User className="h-5 w-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {message.hasAudio && !message.isUser && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => playAudio(message.id)}
                              className="h-6 w-6 p-0 hover:bg-primary/20"
                            >
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="glass border border-primary/20 px-4 py-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about government schemes..."
                className="glass border-primary/20 bg-transparent placeholder:text-muted-foreground focus:ring-primary pr-12"
                disabled={isLoading}
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleRecording}
                className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                  isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"
                }`}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="h-12 w-12 p-0 rounded-xl bg-gradient-primary hover:shadow-glow-primary"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};