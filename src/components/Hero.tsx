import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { SlidingSchemes } from "./SlidingSchemes";
import benefitsImage from "@/assets/benefits-illustration.jpg";
import languagesImage from "@/assets/languages-illustration.jpg";
import schemesImage from "@/assets/schemes-illustration.jpg";

interface HeroProps {
  onChatClick: () => void;
}

export const Hero = ({ onChatClick }: HeroProps) => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 px-6">
      <motion.div
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-gradient-primary/10 border border-primary/20 rounded-full text-primary mb-6"
          >
            <span className="text-sm font-medium">Discover Government Schemes</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              GramAI
            </span>
            <br />
            <span className="text-foreground">Government Schemes</span>
            <br />
            <span className="text-muted-foreground text-3xl md:text-5xl">
              In Your Language
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Discover government benefits, schemes, and programs tailored for you. 
            Chat with our AI assistant in your preferred language and get instant answers 
            with audio support.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={onChatClick}
              variant="hero"
              size="lg"
              className="px-8 py-4 text-lg group"
            >
              Start Chatting
              <MessageSquare className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Sliding Schemes Section */}
        <SlidingSchemes />

        {/* Bento Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto mt-16"
        >
          {/* What is GramAI Card - spans 2 columns */}
          <motion.div
            className="md:col-span-2 bg-card border border-border p-8 rounded-2xl hover:shadow-lg transition-all duration-500 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ animationDelay: "0s" }}
          >
            <div className="bg-primary p-3 rounded-xl w-fit mb-4">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">What is GramAI?</h3>
            <p className="text-muted-foreground leading-relaxed">
              An intelligent AI assistant that helps citizens discover and understand 
              government schemes, benefits, and programs in their native language.
            </p>
          </motion.div>

          {/* Start Chatting Card - spans 1 column */}
          <motion.div
            className="md:col-span-1 bg-gradient-primary p-8 rounded-2xl hover:shadow-lg transition-all duration-500 cursor-pointer text-center"
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ animationDelay: "0.2s" }}
            onClick={onChatClick}
          >
            <MessageSquare className="h-8 w-8 text-primary-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-primary-foreground">Start Chatting</h3>
            <p className="text-sm text-primary-foreground/80">Get instant help</p>
          </motion.div>

          {/* Languages Card - spans 2 columns */}
          <motion.div
            className="md:col-span-2 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ animationDelay: "0.4s" }}
            onClick={() => navigate("/languages")}
          >
            <div className="h-32 overflow-hidden">
              <img src={languagesImage} alt="Multiple languages" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-semibold text-foreground">Multiple Languages</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Hindi, English, Bengali, Tamil, Telugu, and more
              </p>
            </div>
          </motion.div>

          {/* Schemes Card - spans 1 column */}
          <motion.div
            className="md:col-span-1 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ animationDelay: "0.6s" }}
            onClick={() => navigate("/schemes")}
          >
            <div className="h-24 overflow-hidden">
              <img src={schemesImage} alt="Government schemes" className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-2">500+ Schemes</h3>
              <p className="text-xs text-muted-foreground">Healthcare, Education, Housing</p>
            </div>
          </motion.div>

          {/* Benefits Card - spans 3 columns */}
          <motion.div
            className="md:col-span-3 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ animationDelay: "0.8s" }}
            onClick={() => navigate("/benefits")}
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-48 md:h-auto overflow-hidden">
                <img src={benefitsImage} alt="People benefiting" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold text-foreground">Real Benefits</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  See how GramAI has helped millions access government benefits and transform their lives.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">2M+</div>
                    <div className="text-xs text-muted-foreground">Users Helped</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary">₹50K Cr</div>
                    <div className="text-xs text-muted-foreground">Benefits Accessed</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Voice Features Card - spans 3 columns */}
          <motion.div
            className="md:col-span-3 bg-gradient-accent p-6 rounded-2xl hover:shadow-lg transition-all duration-500"
            whileHover={{ scale: 1.02, y: -5 }}
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-accent-foreground mr-3" />
              <h3 className="text-xl font-semibold text-accent-foreground">Voice-Enabled AI</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-accent-foreground">
              <div className="text-center">
                <div className="h-2 w-2 bg-accent-foreground rounded-full mx-auto mb-2 animate-pulse" />
                <span className="text-sm">Voice Input</span>
              </div>
              <div className="text-center">
                <div className="h-2 w-2 bg-accent-foreground rounded-full mx-auto mb-2 animate-pulse" />
                <span className="text-sm">Audio Responses</span>
              </div>
              <div className="text-center">
                <div className="h-2 w-2 bg-accent-foreground rounded-full mx-auto mb-2 animate-pulse" />
                <span className="text-sm">Real-time Help</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};