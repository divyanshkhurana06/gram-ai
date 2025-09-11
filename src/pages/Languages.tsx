import { motion } from "framer-motion";
import { ArrowLeft, Globe, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import languagesImage from "@/assets/languages-illustration.jpg";

const Languages = () => {
  const navigate = useNavigate();

  const languages = [
    { name: "हिंदी", code: "hi", text: "सरकारी योजनाएं खोजें" },
    { name: "English", code: "en", text: "Discover Government Schemes" },
    { name: "বাংলা", code: "bn", text: "সরকারি পরিকল্পনা আবিষ্কার করুন" },
    { name: "తెలుగు", code: "te", text: "ప్రభుత్వ పథకాలను కనుగొనండి" },
    { name: "தமிழ்", code: "ta", text: "அரசு திட்டங்களைக் கண்டறியுங்கள்" },
    { name: "ગુજરાતી", code: "gu", text: "સરકારી યોજનાઓ શોધો" },
    { name: "मराठी", code: "mr", text: "सरकारी योजना शोधा" },
    { name: "ಕನ್ನಡ", code: "kn", text: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary mb-6"
            >
              <Globe className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Multilingual Support</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Speak Your Language
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              GramAI supports multiple Indian languages to help you understand government schemes in your preferred language.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={languagesImage}
                alt="Multiple languages representation"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground">Why Multilingual Matters</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Better Understanding:</strong> Get scheme details in your native language for clearer comprehension.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Voice Support:</strong> Speak in your language and hear responses back with audio.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-accent rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Cultural Context:</strong> Information tailored to regional cultural contexts and practices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {lang.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {lang.text}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Languages;