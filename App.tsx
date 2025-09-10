import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Chat from './components/Chat';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isGeneratingOtp, setIsGeneratingOtp] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'category', or 'chat'
  const [selectedCategory, setSelectedCategory] = useState('');

  const indianLanguages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी (Hindi)' },
    { value: 'ta', label: 'தமிழ் (Tamil)' },
    { value: 'te', label: 'తెలుగు (Telugu)' },
    { value: 'bn', label: 'বাংলা (Bengali)' },
    { value: 'mr', label: 'मराठी (Marathi)' },
    { value: 'gu', label: 'ગુજરાતી (Gujarati)' },
    { value: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { value: 'ml', label: 'മലയാളം (Malayalam)' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
    { value: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
    { value: 'as', label: 'অসমীয়া (Assamese)' },
  ];

  const translations = {
    whoAreYou: {
      en: 'Who are you?',
      hi: 'आप कौन हैं?',
      ta: 'நீங்கள் யார்?',
      te: 'మీరు ఎవరు?',
      bn: 'আপনি কে?',
      mr: 'तुम्ही कोण आहात?',
      gu: 'તમે કોણ છો?',
      kn: 'ನೀವು ಯಾರು?',
      ml: 'നിങ്ങൾ ആരാണ്?',
      pa: 'ਤੁਸੀਂ ਕੌਣ ਹੋ?',
      or: 'ଆପଣ କିଏ?',
      as: 'আপুনি কোন?'
    },
    continue: {
      en: 'Continue',
      hi: 'जारी रखें',
      ta: 'தொடரவும்',
      te: 'కొనసాగించు',
      bn: 'চালিয়ে যান',
      mr: 'सुरू ठेवा',
      gu: 'ચાલુ રાખો',
      kn: 'ಮುಂದುವರಿಸಿ',
      ml: 'തുടരുക',
      pa: 'ਜਾਰੀ ਰੱਖੋ',
      or: 'ଜାରି ରଖନ୍ତୁ',
      as: 'আগবাঢ়ক'
    },
    categories: {
      farmer: {
        en: 'Farmer',
        hi: 'किसान',
        ta: 'விவசாயி',
        te: 'రైతు',
        bn: 'কৃষক',
        mr: 'शेतकरी',
        gu: 'ખેડૂત',
        kn: 'ರೈತ',
        ml: 'കർഷകൻ',
        pa: 'ਕਿਸਾਨ',
        or: 'କୃଷକ',
        as: 'কৃষক'
      },
      girls_under_18: {
        en: 'Girls (Age < 18)',
        hi: 'लड़कियां (आयु < 18)',
        ta: 'பெண்கள் (வயது < 18)',
        te: 'అమ్మాయిలు (వయస్సు < 18)',
        bn: 'মেয়েরা (বয়স < ১৮)',
        mr: 'मुली (वय < 18)',
        gu: 'છોકરીઓ (ઉંમર < 18)',
        kn: 'ಹುಡುಗಿಯರು (ವಯಸ್ಸು < 18)',
        ml: 'പെൺകുട്ടികൾ (പ്രായം < 18)',
        pa: 'ਕੁੜੀਆਂ (ਉਮਰ < 18)',
        or: 'ଝିଅମାନେ (ବୟସ < ୧୮)',
        as: 'ছোৱালী (বয়স < ১৮)'
      },
      boys_under_18: {
        en: 'Boys (Age < 18)',
        hi: 'लड़के (आयु < 18)',
        ta: 'சிறுவர்கள் (வயது < 18)',
        te: 'అబ్బాయిలు (వయస్సు < 18)',
        bn: 'ছেলেরা (বয়স < ১৮)',
        mr: 'मुले (वय < 18)',
        gu: 'છોકરાઓ (ઉંમર < 18)',
        kn: 'ಹುಡುಗರು (ವಯಸ್ಸು < 18)',
        ml: 'ആൺകുട്ടികൾ (പ്രായം < 18)',
        pa: 'ਮੁੰਡੇ (ਉਮਰ < 18)',
        or: 'ପୁଅମାନେ (ବୟସ < ୧୮)',
        as: 'ল\'ৰা (বয়স < ১৮)'
      },
      women_over_18: {
        en: 'Women',
        hi: 'महिलाएं',
        ta: 'பெண்மণிகள்',
        te: 'మహిళలు',
        bn: 'মহিলারা',
        mr: 'स्त्रिया',
        gu: 'સ્ત્રીઓ',
        kn: 'ಮಹಿಳೆಯರು',
        ml: 'സ്ത്രീകൾ',
        pa: 'ਔਰਤਾਂ',
        or: 'ମହିଳାମାନେ',
        as: 'মহিলা'
      },
      senior_citizens: {
        en: 'Senior Citizens',
        hi: 'वरिष्ठ नागरिक',
        ta: 'மூத்த குடிமக்கள்',
        te: 'సీనియర్ సిటిజన్స్',
        bn: 'প্রবীণ নাগরিক',
        mr: 'ज्येष्ठ नागरिक',
        gu: 'વરિષ્ઠ નાગરિકો',
        kn: 'ಹಿರಿಯ ನಾಗರಿಕರು',
        ml: 'മുതിർന്ന പൗരന്മാർ',
        pa: 'ਸੀਨੀਅਰ ਸਿਟੀਜ਼ਨ',
        or: 'ବୟସ୍କ ନାଗରିକ',
        as: 'বৰিষ্ঠ নাগৰিক'
      },
      college_student: {
        en: 'College Student',
        hi: 'कॉलेज छात्र',
        ta: 'கல்லூரி மாணவர்',
        te: 'కళాశాల విద్యార్థి',
        bn: 'কলেজ ছাত্র',
        mr: 'महाविद्यालयीन विद्यार्थी',
        gu: 'કોલેજ વિદ્યાર્થી',
        kn: 'ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿ',
        ml: 'കോളേജ് വിദ്യാർത്ഥി',
        pa: 'ਕਾਲਜ ਵਿਦਿਆਰਥੀ',
        or: 'କଲେଜ ଛାତ୍ର',
        as: 'কলেজৰ ছাত্ৰ'
      },
      school_student: {
        en: 'School Student',
        hi: 'स्कूल छात्र',
        ta: 'பள்ளி மாணவர்',
        te: 'పాఠశాల విద్యార్థి',
        bn: 'স্কুল ছাত্র',
        mr: 'शाळेतील विद्यार्थी',
        gu: 'શાળાના વિદ્યાર્થી',
        kn: 'ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿ',
        ml: 'സ്കൂൾ വിദ്യാർത്ഥി',
        pa: 'ਸਕੂਲ ਵਿਦਿਆਰਥੀ',
        or: 'ସ୍କୁଲ ଛାତ୍ର',
        as: 'স্কুলৰ ছাত্ৰ'
      },
      professional: {
        en: 'Working Professional',
        hi: 'कार्यरत पेशेवर',
        ta: 'பணிபுரியும் தொழில்முறை',
        te: 'వర్కింగ్ ప్రొఫెషనల్',
        bn: 'কর্মজীবী পেশাদার',
        mr: 'कार्यरत व्यावसायिक',
        gu: 'કાર્યકારી વ્યાવસાયિક',
        kn: 'ಕೆಲಸ ಮಾಡುವ ವೃತ್ತಿಪರ',
        ml: 'ജോലി ചെയ്യുന്ന പ്രൊഫഷണൽ',
        pa: 'ਕੰਮ ਕਰਨ ਵਾਲਾ ਪੇਸ਼ੇਵਰ',
        or: 'କାର୍ଯ୍ୟରତ ପେସାଦାର',
        as: 'কৰ্মৰত পেছাদাৰী'
      }
    }
  };

  const userCategories = [
    { 
      id: 'farmer', 
      image: 'https://images.unsplash.com/photo-1623211267197-b8b4bc48a0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBhZ3JpY3VsdHVyZSUyMGZpZWxkfGVufDF8fHx8MTc1NzQ5OTc0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'girls_under_18', 
      image: 'https://images.unsplash.com/photo-1648743856421-5bc9a742ddc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWVuYWdlJTIwZ2lybCUyMGZvcm1hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NzUzNDg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'boys_under_18', 
      image: 'https://images.unsplash.com/photo-1681070909604-f555aa006564?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWVuYWdlJTIwYm95JTIwZm9ybWFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NTM0ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'women_over_18', 
      image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc3dvbWFuJTIwZm9ybWFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NTM0ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'senior_citizens', 
      image: 'https://images.unsplash.com/photo-1658632302217-984d432b4d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBjaXRpemVuJTIwZWxkZXJseXxlbnwxfHx8fDE3NTc1MjkxMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'college_student', 
      image: 'https://images.unsplash.com/photo-1711922721200-984513100040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudCUyMHVuaXZlcnNpdHl8ZW58MXx8fHwxNzU3NTI5MTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'school_student', 
      image: 'https://images.unsplash.com/photo-1698754584388-3d2c4edcce9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwZWR1Y2F0b3IlMjBzY2hvb2x8ZW58MXx8fHwxNzU3NTI5MTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    { 
      id: 'professional', 
      image: 'https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHdvcmtlcnxlbnwxfHx8fDE3NTc1MjkxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const handleGenerateOtp = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsGeneratingOtp(true);
    
    try {
      // Generate random 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Try Twilio Verify first, fallback to demo mode
      const response = await fetch('/api/v1/twilio/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Store phone number for verification
        sessionStorage.setItem('otp_phone', phoneNumber);
        sessionStorage.setItem('verification_sid', result.verification_sid);
        
        setOtpSent(true);
        
        if (result.trial_mode) {
          alert('Trial mode: Your phone number needs to be verified in Twilio Console. For demo, use any 6-digit code.');
        } else {
          alert('OTP sent to your phone number via SMS');
        }
      } else {
        // Fallback to demo mode
        sessionStorage.setItem('expected_otp', otpCode);
        sessionStorage.setItem('otp_phone', phoneNumber);
        
        setOtpSent(true);
        
        if (result.trial_mode) {
          alert('Demo mode: Use any 6-digit code (e.g., 123456) to continue.');
        } else {
          alert('Failed to send OTP. Using demo mode - enter any 6-digit code.');
        }
        console.error('OTP send failed:', result.error);
      }
    } catch (error) {
      console.error('OTP generation failed:', error);
      alert('Error sending OTP. Please try again.');
    } finally {
      setIsGeneratingOtp(false);
    }
  };

  const handleContinue = () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid phone number');
      return;
    }
    
    if (!otpSent) {
      alert('Please generate OTP first');
      return;
    }
    
    if (!otp || otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    if (!selectedLanguage) {
      alert('Please select your preferred language');
      return;
    }
    
    // Navigate to category selection screen
    setCurrentScreen('category');
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCategoryContinue = () => {
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    // Navigate to chat screen
    setCurrentScreen('chat');
  };

  if (currentScreen === 'chat') {
    return (
      <Chat 
        selectedLanguage={selectedLanguage}
        selectedCategory={selectedCategory}
        phoneNumber={phoneNumber}
      />
    );
  }

  if (currentScreen === 'category') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <div className="pt-12 pb-4 px-6 text-center">
          <h1 className="mb-2">
            {translations.whoAreYou[selectedLanguage as keyof typeof translations.whoAreYou] || translations.whoAreYou.en}
          </h1>
          <p className="text-muted-foreground">Select your category to continue</p>
        </div>

        {/* Category Grid */}
        <div className="flex-1 px-6 pb-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {userCategories.map((category) => {
              const categoryLabel = translations.categories[category.id as keyof typeof translations.categories][selectedLanguage as keyof typeof translations.categories.farmer] || 
                                  translations.categories[category.id as keyof typeof translations.categories].en;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-colors ${
                    isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-card hover:bg-accent'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                    <ImageWithFallback
                      src={category.image}
                      alt={categoryLabel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-center leading-tight text-sm">{categoryLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Continue Button */}
        <div className="p-6 pt-4 bg-background border-t border-border">
          <Button 
            onClick={handleCategoryContinue}
            className="w-full h-14 text-lg"
            disabled={!selectedCategory}
          >
            {translations.continue[selectedLanguage as keyof typeof translations.continue] || translations.continue.en}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 px-6 text-center">
        <h1 className="mb-2">Welcome</h1>
        <p className="text-muted-foreground">Enter your details to continue</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 space-y-6">
        {/* Phone Number Input */}
        <div className="space-y-3">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
              setPhoneNumber(value);
            }}
            maxLength={10}
            className="h-14 text-lg"
          />
        </div>

        {/* Generate OTP Button */}
        <Button 
          onClick={handleGenerateOtp}
          disabled={!phoneNumber || phoneNumber.length !== 10 || isGeneratingOtp}
          className="w-full h-14 text-lg"
        >
          {isGeneratingOtp ? 'Generating OTP...' : 'Generate OTP'}
        </Button>

        {/* OTP Input - Only show after OTP is sent */}
        {otpSent && (
          <div className="space-y-3">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setOtp(value);
              }}
              maxLength={6}
              className="h-14 text-lg tracking-wider text-center"
            />
          </div>
        )}

        {/* Language Selection */}
        <div className="space-y-3">
          <Label>Preferred Language</Label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder="Select your preferred language" />
            </SelectTrigger>
            <SelectContent>
              {indianLanguages.map((language) => (
                <SelectItem key={language.value} value={language.value} className="text-lg py-4">
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-6 pt-8">
        <Button 
          onClick={handleContinue}
          className="w-full h-14 text-lg"
          disabled={!phoneNumber || !otpSent || !otp || !selectedLanguage}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}