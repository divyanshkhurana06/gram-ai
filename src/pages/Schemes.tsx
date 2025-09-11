import { motion } from "framer-motion";
import { ArrowLeft, Heart, GraduationCap, Home, Leaf, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import schemesImage from "@/assets/schemes-illustration.jpg";

const Schemes = () => {
  const navigate = useNavigate();

  const schemeCategories = [
    {
      icon: Heart,
      title: "Healthcare",
      schemes: ["Ayushman Bharat", "Pradhan Mantri Swasthya Suraksha Yojana", "National Health Mission"],
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: GraduationCap,
      title: "Education",
      schemes: ["Sarva Shiksha Abhiyan", "Mid Day Meal Scheme", "Beti Bachao Beti Padhao"],
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Home,
      title: "Housing",
      schemes: ["Pradhan Mantri Awas Yojana", "Indira Awas Yojana", "Rajiv Awas Yojana"],
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Leaf,
      title: "Agriculture",
      schemes: ["PM-KISAN", "Pradhan Mantri Fasal Bima Yojana", "Soil Health Card Scheme"],
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Users,
      title: "Employment",
      schemes: ["MGNREGA", "Pradhan Mantri Rojgar Protsahan Yojana", "Deen Dayal Upadhyaya Grameen"],
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Shield,
      title: "Social Security",
      schemes: ["Pradhan Mantri Pension Yojana", "Atal Pension Yojana", "National Social Assistance"],
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
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
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary mb-6"
            >
              <Shield className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Government Schemes</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Discover Benefits
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore hundreds of government schemes across different categories designed to improve your life and livelihood.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={schemesImage}
                alt="Government schemes and benefits"
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground">How GramAI Helps</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Smart Matching:</strong> AI matches you with schemes based on your profile and needs.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-secondary rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Simple Application:</strong> Get step-by-step guidance on how to apply for benefits.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-2 w-2 bg-accent rounded-full mt-2" />
                  <p className="text-muted-foreground">
                    <strong>Regular Updates:</strong> Stay informed about new schemes and deadlines.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemeCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`${category.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.schemes.map((scheme, schemeIndex) => (
                      <div key={schemeIndex} className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{scheme}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Explore {category.title} Schemes
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Schemes;