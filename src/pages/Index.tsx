import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ChatBot } from "@/components/ChatBot";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => {
    setShowChat(true);
    // Smooth scroll to chat section
    setTimeout(() => {
      document.getElementById('chat')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onChatClick={handleChatClick} />
      
      {!showChat ? (
        <Hero onChatClick={handleChatClick} />
      ) : (
        <ChatBot isOpen={showChat} />
      )}
    </div>
  );
};

export default Index;
