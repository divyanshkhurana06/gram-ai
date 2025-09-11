import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, GraduationCap, Home, Leaf, Users, Shield, Banknote, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Scheme {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: any;
  color: string;
  bgColor: string;
  image: string;
  beneficiaries: string;
  amount: string;
  eligibility: string;
}

const schemes: Scheme[] = [
  {
    id: "ayushman-bharat",
    title: "Ayushman Bharat",
    description: "World's largest health insurance scheme providing coverage up to ₹5 lakh per family per year",
    category: "Healthcare",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
    beneficiaries: "50 Crore+",
    amount: "₹5 Lakh",
    eligibility: "BPL families"
  },
  {
    id: "pm-kisan",
    title: "PM-KISAN",
    description: "Direct income support of ₹6,000 per year to small and marginal farmer families",
    category: "Agriculture",
    icon: Leaf,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop",
    beneficiaries: "12 Crore+",
    amount: "₹6,000/year",
    eligibility: "Small farmers"
  },
  {
    id: "pm-awas",
    title: "PM Awas Yojana",
    description: "Affordable housing scheme providing financial assistance for home construction",
    category: "Housing",
    icon: Home,
    color: "text-green-600",
    bgColor: "bg-green-50",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop",
    beneficiaries: "1.2 Crore+",
    amount: "₹2.5 Lakh",
    eligibility: "EWS/LIG families"
  },
  {
    id: "mgnrega",
    title: "MGNREGA",
    description: "Guaranteed 100 days of wage employment in rural areas with focus on sustainable development",
    category: "Employment",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=200&fit=crop",
    beneficiaries: "8 Crore+",
    amount: "₹200/day",
    eligibility: "Rural households"
  },
  {
    id: "beti-bachao",
    title: "Beti Bachao Beti Padhao",
    description: "Initiative to ensure survival, protection and education of the girl child",
    category: "Education",
    icon: GraduationCap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=200&fit=crop",
    beneficiaries: "2.5 Crore+",
    amount: "Various benefits",
    eligibility: "Girl children"
  },
  {
    id: "jan-dhan",
    title: "Jan Dhan Yojana",
    description: "Financial inclusion program ensuring access to banking, savings & deposit accounts",
    category: "Financial",
    icon: Banknote,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop",
    beneficiaries: "45 Crore+",
    amount: "₹30,000 overdraft",
    eligibility: "All citizens"
  },
  {
    id: "matru-vandana",
    title: "Matru Vandana Yojana",
    description: "Maternity benefit program providing cash incentives for safe delivery and childcare",
    category: "Women & Child",
    icon: Baby,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=200&fit=crop",
    beneficiaries: "2 Crore+",
    amount: "₹5,000",
    eligibility: "Pregnant women"
  },
  {
    id: "atal-pension",
    title: "Atal Pension Yojana",
    description: "Pension scheme providing guaranteed minimum pension based on contribution amount",
    category: "Social Security",
    icon: Shield,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=200&fit=crop",
    beneficiaries: "5 Crore+",
    amount: "₹1,000-5,000/month",
    eligibility: "18-40 years"
  }
];

export const SlidingSchemes = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % schemes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % schemes.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + schemes.length) % schemes.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleSchemeClick = (scheme: Scheme) => {
    // Navigate to schemes page with specific scheme highlighted
    navigate(`/schemes?highlight=${scheme.id}`);
  };

  // Get schemes to display (current + next 2)
  const getVisibleSchemes = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(schemes[(currentIndex + i) % schemes.length]);
    }
    return visible;
  };

  const visibleSchemes = getVisibleSchemes();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="w-full max-w-7xl mx-auto mt-16 mb-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-foreground mb-2"
          >
            Popular Government Schemes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Discover schemes that can benefit you and your family
          </motion.p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="h-10 w-10 p-0 rounded-full hover:bg-primary/10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Sliding Container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {visibleSchemes.map((scheme, index) => {
              const Icon = scheme.icon;
              const isMain = index === 0;
              
              return (
                <motion.div
                  key={`${scheme.id}-${currentIndex}-${index}`}
                  className={`
                    ${isMain ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1'}
                    bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-500 cursor-pointer group
                  `}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => handleSchemeClick(scheme)}
                  layout
                >
                  {/* Image Section */}
                  <div className={`${isMain ? 'h-48' : 'h-32'} overflow-hidden relative`}>
                    <img 
                      src={scheme.image} 
                      alt={scheme.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={`${scheme.bgColor} p-2 rounded-lg`}>
                        <Icon className={`h-5 w-5 ${scheme.color}`} />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-xs font-medium opacity-90">{scheme.category}</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={`p-${isMain ? '6' : '4'}`}>
                    <h3 className={`${isMain ? 'text-xl' : 'text-lg'} font-semibold text-foreground mb-2`}>
                      {scheme.title}
                    </h3>
                    <p className={`text-muted-foreground mb-4 ${isMain ? 'text-sm' : 'text-xs'} ${isMain ? 'line-clamp-3' : 'line-clamp-2'}`}>
                      {scheme.description}
                    </p>
                    
                    {/* Stats */}
                    <div className={`grid ${isMain ? 'grid-cols-3' : 'grid-cols-1'} gap-${isMain ? '4' : '2'} ${isMain ? 'mb-4' : 'mb-2'}`}>
                      <div className="text-center">
                        <div className={`${isMain ? 'text-lg' : 'text-sm'} font-bold text-primary`}>
                          {scheme.beneficiaries}
                        </div>
                        <div className={`${isMain ? 'text-xs' : 'text-xs'} text-muted-foreground`}>
                          Beneficiaries
                        </div>
                      </div>
                      {isMain && (
                        <>
                          <div className="text-center">
                            <div className="text-lg font-bold text-secondary">
                              {scheme.amount}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Benefit
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-accent">
                              {scheme.eligibility}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Eligible
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      variant={isMain ? "default" : "ghost"}
                      size={isMain ? "default" : "sm"}
                      className={`w-full ${isMain ? '' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}
                    >
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {schemes.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-border hover:bg-primary/50'
              }
            `}
          />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-8"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/schemes')}
          className="px-8 py-3 text-lg hover:shadow-glow-primary"
        >
          View All {schemes.length} Schemes
        </Button>
      </motion.div>
    </motion.div>
  );
};
