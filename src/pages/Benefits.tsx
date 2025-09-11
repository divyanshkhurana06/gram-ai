import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import benefitsImage from "@/assets/benefits-illustration.jpg";

const Benefits = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "Instant Access",
      description: "Get immediate information about schemes you're eligible for",
      icon: Clock,
      stats: "24/7 Available"
    },
    {
      title: "Local Support",
      description: "Find schemes specific to your state, district, and locality",
      icon: MapPin,
      stats: "All 28 States Covered"
    },
    {
      title: "Easy Application",
      description: "Step-by-step guidance to complete applications successfully",
      icon: CheckCircle,
      stats: "95% Success Rate"
    },
    {
      title: "Voice Assistance",
      description: "Talk to GramAI in your language and get audio responses",
      icon: Phone,
      stats: "8+ Languages"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Uttar Pradesh",
      text: "GramAI helped me find housing schemes I never knew existed. Now my family has a proper home.",
      scheme: "PM Awas Yojana"
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      text: "The voice feature in Hindi made it so easy for my mother to understand pension schemes.",
      scheme: "Atal Pension Yojana"
    },
    {
      name: "Suresh Patel",
      location: "Gujarat",
      text: "Got crop insurance information just in time before the deadline. Saved my farm!",
      scheme: "PM Fasal Bima"
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
              <CheckCircle className="mr-2 h-4 w-4" />
              <span className="text-sm font-medium">Real Benefits for Real People</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Life-Changing Benefits
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how GramAI has helped millions of Indians access government benefits and transform their lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={benefitsImage}
                alt="People benefiting from government schemes"
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-foreground">Why It Matters</h2>
              <p className="text-lg text-muted-foreground">
                Every year, thousands of crores worth of government benefits go unclaimed 
                because people don't know about them or find the process too complicated.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">₹2.5L Cr</div>
                  <div className="text-sm text-muted-foreground">Unclaimed Benefits</div>
                </div>
                <div className="text-center p-4 bg-secondary/10 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">40%</div>
                  <div className="text-sm text-muted-foreground">Unaware Citizens</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {benefit.description}
                  </p>
                  <div className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {benefit.stats}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="mb-4">
                    <div className="text-sm font-medium text-primary mb-1">
                      {testimonial.scheme}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="text-sm font-medium text-foreground">
                    - {testimonial.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Benefits;