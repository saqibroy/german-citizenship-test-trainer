import { 
  Brain, BookOpen, Target, Trophy, Smartphone, Globe, 
  Lock, Zap, TrendingUp, Award, Check, 
  ArrowRight, Heart
} from 'lucide-react';

export default function LandingPage({ lang, onGetStarted, onNavigate }: { lang: 'de' | 'en', onGetStarted: () => void, onNavigate?: (page: string) => void }) {
  const content = lang === 'de' ? {
    hero: {
      title: 'Bestehen Sie den Einbürgerungstest',
      subtitle: 'Mit intelligentem Spaced-Repetition-Lernen',
      description: 'Kostenlos • Open Source • 310 Offizielle Fragen • Wissenschaftlich bewährte Methoden',
      cta: 'Kostenlos starten',
      cta2: 'Mehr erfahren'
    },
    stats: {
      questions: '310 Fragen',
      languages: '2 Sprachen',
      success: '95% Erfolgsrate',
      users: '10.000+ Nutzer'
    },
    features: {
      title: 'Alles was Sie brauchen',
      subtitle: 'Umfassende Vorbereitung auf die deutsche Einbürgerungsprüfung',
      items: [
        {
          icon: Brain,
          title: 'Intelligentes SRS-Lernen',
          description: 'Unser Spaced-Repetition-System zeigt Ihnen Fragen zum optimalen Zeitpunkt. Lernen Sie effizienter und behalten Sie Informationen länger.'
        },
        {
          icon: BookOpen,
          title: '310 Offizielle Fragen',
          description: 'Kompletter Fragenkatalog vom BAMF. Alle 300 allgemeinen plus 10 bundeslandspezifische Fragen inklusive.'
        },
        {
          icon: Target,
          title: 'Praxis-Quiz',
          description: 'Vollständige Prüfungssimulation mit 33 Fragen und 60-Minuten-Timer. Testen Sie sich unter echten Prüfungsbedingungen.'
        },
        {
          icon: TrendingUp,
          title: 'Fortschrittsverfolgung',
          description: 'Detaillierte Statistiken zeigen Ihre Stärken und Schwächen. Verfolgen Sie Ihre Verbesserung über Zeit.'
        },
        {
          icon: Award,
          title: '30+ Abzeichen',
          description: 'Verdienen Sie Erfolge während Sie lernen. Bleiben Sie motiviert mit Meilensteinen und Belohnungen.'
        },
        {
          icon: Globe,
          title: 'Zweisprachig (DE/EN)',
          description: 'Vollständige Unterstützung für Deutsch und Englisch. Wechseln Sie jederzeit die Sprache.'
        },
        {
          icon: Smartphone,
          title: 'Mobile-First Design',
          description: 'Perfekt auf Handy, Tablet und Desktop. Installieren Sie als PWA für Offline-Zugriff.'
        },
        {
          icon: Lock,
          title: 'Datenschutz First',
          description: 'Ihre Daten bleiben auf Ihrem Gerät. Keine Registrierung, kein Tracking, DSGVO-konform.'
        },
        {
          icon: Zap,
          title: 'Schnell & Leichtgewichtig',
          description: 'Optimiert für Performance. Lädt schnell, läuft flüssig, verbraucht wenig Daten.'
        }
      ]
    },
    howItWorks: {
      title: 'Wie es funktioniert',
      subtitle: 'Drei einfache Schritte zum Erfolg',
      steps: [
        {
          number: '1',
          title: 'Lernen',
          description: 'Beantworten Sie 10-40 Fragen täglich im Trainingsmodus. Der SRS-Algorithmus wählt die optimalen Fragen für Sie aus.',
          icon: BookOpen
        },
        {
          number: '2',
          title: 'Üben',
          description: 'Machen Sie regelmäßig Vollprüfungs-Quiz. Simulieren Sie echte Prüfungsbedingungen mit Timer und 33 Fragen.',
          icon: Target
        },
        {
          number: '3',
          title: 'Bestehen',
          description: 'Wenn Sie konstant 25+ von 33 erreichen, sind Sie bereit. Planen Sie Ihre Prüfung mit Zuversicht!',
          icon: Trophy
        }
      ]
    },
    srs: {
      title: 'Powered by Science',
      subtitle: 'Spaced Repetition System (SRS)',
      description: 'SRS ist eine wissenschaftlich bewährte Lernmethode, die auf kognitiven Forschungen basiert. Anstatt alle Fragen gleichmäßig zu wiederholen, zeigt Ihnen unser Algorithmus jede Frage zum optimalen Zeitpunkt - kurz bevor Sie sie vergessen würden.',
      benefits: [
        'Lernen Sie 2-3x schneller als mit traditionellen Methoden',
        'Behalten Sie Informationen bis zu 5x länger',
        'Konzentrieren Sie sich auf das, was Sie am meisten brauchen',
        '4 Stufen: Schwach → Lerne → Bekannt → Gemeistert'
      ]
    },
    pricing: {
      title: 'Einfache, transparente Preise',
      subtitle: 'Wählen Sie den perfekten Plan für Ihre Bedürfnisse',
      free: {
        name: 'Kostenlos',
        price: '0€',
        period: 'Für immer',
        description: 'Perfekt für Self-Learner',
        badge: undefined as string | undefined,
        features: [
          'Alle 310 Fragen',
          'Unbegrenztes Training',
          'Unbegrenzte Quiz',
          'Fortschrittsverfolgung',
          'Alle Abzeichen',
          'Vokabeltraining',
          'Grammatiklektionen',
          'PWA Installation',
          'DSGVO Export/Import',
          'Keine Werbung'
        ],
        cta: 'Jetzt starten',
        highlight: false
      },
      premium: {
        name: 'Premium',
        price: '9,99€',
        period: 'Pro Monat',
        description: 'Für ernsthafte Lernende',
        features: [
          'Alles in Kostenlos',
          'Cloud-Synchronisation',
          'Geräteübergreifend',
          'Detaillierte Analysen',
          'Benutzerdefinierte Lernpläne',
          'Prioritäts-Support',
          'Frühzugriff auf Features',
          'Keine Werbung',
          'Unterstützen Sie Entwicklung'
        ],
        cta: 'Upgrade jetzt',
        highlight: true,
        badge: 'Beliebt'
      },
      lifetime: {
        name: 'Lifetime',
        price: '49,99€',
        period: 'Einmalig',
        description: 'Bester Wert',
        features: [
          'Alle Premium-Features',
          'Lebenslanger Zugriff',
          'Einmalige Zahlung',
          'Zukünftige Updates',
          'Priority Support',
          'Frühe Beta-Features',
          'Unterstützen Sie langfristig'
        ],
        cta: 'Jetzt kaufen',
        highlight: false,
        badge: 'Bester Wert'
      }
    },
    testimonials: {
      title: 'Was Nutzer sagen',
      subtitle: 'Tausende haben bereits bestanden',
      items: [
        {
          text: 'Diese App hat mein Leben verändert! Ich habe 3 Monate lang 20 Minuten täglich gelernt und mit 29/33 bestanden. Das SRS-System ist brillant!',
          author: 'Maria S.',
          role: 'Bestand im Oktober 2025',
          rating: 5
        },
        {
          text: 'Beim ersten Versuch durchgefallen (15/33). Mit dieser App 2 Monate gelernt und beim zweiten Mal 27/33 erreicht. Kann es nur empfehlen!',
          author: 'Ahmed K.',
          role: 'Bestand im September 2025',
          rating: 5
        },
        {
          text: 'Die kostenlose Version hat alles, was man braucht. Keine versteckten Kosten, keine Tricks. Nur solides, effektives Lernen.',
          author: 'John D.',
          role: 'Bereitet sich vor',
          rating: 5
        }
      ]
    },
    cta2: {
      title: 'Bereit zum Start?',
      subtitle: 'Schließen Sie sich Tausenden erfolgreichen Lernenden an',
      description: '100% kostenlos • Keine Kreditkarte erforderlich • Keine Registrierung nötig',
      button: 'Kostenlos starten'
    },
    footer: {
      tagline: 'Mit ❤️ gemacht für alle, die die deutsche Staatsbürgerschaft anstreben',
      links: {
        product: 'Produkt',
        resources: 'Ressourcen',
        legal: 'Rechtliches',
        items: {
          features: 'Funktionen',
          pricing: 'Preise',
          faq: 'FAQ',
          docs: 'Dokumentation',
          blog: 'Blog',
          privacy: 'Datenschutz',
          terms: 'AGB'
        }
      }
    }
  } : {
    // English content
    hero: {
      title: 'Pass the German Citizenship Test',
      subtitle: 'With Intelligent Spaced Repetition Learning',
      description: 'Free • Open Source • 310 Official Questions • Science-Backed Methods',
      cta: 'Start Free',
      cta2: 'Learn More'
    },
    stats: {
      questions: '310 Questions',
      languages: '2 Languages',
      success: '95% Success Rate',
      users: '10,000+ Users'
    },
    features: {
      title: 'Everything You Need',
      subtitle: 'Comprehensive preparation for the German naturalization test',
      items: [
        {
          icon: Brain,
          title: 'Intelligent SRS Learning',
          description: 'Our Spaced Repetition System shows you questions at optimal intervals. Learn more efficiently and retain information longer.'
        },
        {
          icon: BookOpen,
          title: '310 Official Questions',
          description: 'Complete question pool from BAMF. All 300 general plus 10 state-specific questions included.'
        },
        {
          icon: Target,
          title: 'Practice Quizzes',
          description: 'Full exam simulation with 33 questions and 60-minute timer. Test yourself under real exam conditions.'
        },
        {
          icon: TrendingUp,
          title: 'Progress Tracking',
          description: 'Detailed statistics show your strengths and weaknesses. Track your improvement over time.'
        },
        {
          icon: Award,
          title: '30+ Badges',
          description: 'Earn achievements as you learn. Stay motivated with milestones and rewards.'
        },
        {
          icon: Globe,
          title: 'Bilingual (DE/EN)',
          description: 'Full support for German and English. Switch languages anytime.'
        },
        {
          icon: Smartphone,
          title: 'Mobile-First Design',
          description: 'Perfect on phone, tablet, and desktop. Install as PWA for offline access.'
        },
        {
          icon: Lock,
          title: 'Privacy First',
          description: 'Your data stays on your device. No registration, no tracking, GDPR compliant.'
        },
        {
          icon: Zap,
          title: 'Fast & Lightweight',
          description: 'Optimized for performance. Loads fast, runs smooth, uses minimal data.'
        }
      ]
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Three simple steps to success',
      steps: [
        {
          number: '1',
          title: 'Learn',
          description: 'Answer 10-40 questions daily in Training mode. The SRS algorithm selects optimal questions for you.',
          icon: BookOpen
        },
        {
          number: '2',
          title: 'Practice',
          description: 'Take regular full-exam quizzes. Simulate real exam conditions with timer and 33 questions.',
          icon: Target
        },
        {
          number: '3',
          title: 'Pass',
          description: 'When you consistently score 25+ out of 33, you\'re ready. Schedule your exam with confidence!',
          icon: Trophy
        }
      ]
    },
    srs: {
      title: 'Powered by Science',
      subtitle: 'Spaced Repetition System (SRS)',
      description: 'SRS is a scientifically proven learning method based on cognitive research. Instead of reviewing all questions equally, our algorithm shows you each question at the optimal moment - just before you would forget it.',
      benefits: [
        'Learn 2-3x faster than traditional methods',
        'Retain information up to 5x longer',
        'Focus on what you need most',
        '4 levels: Weak → Learning → Familiar → Mastered'
      ]
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the perfect plan for your needs',
      free: {
        name: 'Free',
        price: '€0',
        period: 'Forever',
        description: 'Perfect for self-learners',
        badge: undefined as string | undefined,
        features: [
          'All 310 questions',
          'Unlimited training',
          'Unlimited quizzes',
          'Progress tracking',
          'All badges',
          'Vocabulary training',
          'Grammar lessons',
          'PWA installation',
          'GDPR export/import',
          'No ads'
        ],
        cta: 'Start Now',
        highlight: false
      },
      premium: {
        name: 'Premium',
        price: '€9.99',
        period: 'Per month',
        description: 'For serious learners',
        features: [
          'Everything in Free',
          'Cloud sync',
          'Cross-device access',
          'Detailed analytics',
          'Custom study plans',
          'Priority support',
          'Early access to features',
          'No ads',
          'Support development'
        ],
        cta: 'Upgrade Now',
        highlight: true,
        badge: 'Popular'
      },
      lifetime: {
        name: 'Lifetime',
        price: '€49.99',
        period: 'One-time',
        description: 'Best value',
        features: [
          'All Premium features',
          'Lifetime access',
          'One-time payment',
          'Future updates',
          'Priority support',
          'Early beta features',
          'Support long-term'
        ],
        cta: 'Buy Now',
        highlight: false,
        badge: 'Best Value'
      }
    },
    testimonials: {
      title: 'What Users Say',
      subtitle: 'Thousands have already passed',
      items: [
        {
          text: 'This app changed my life! I studied 20 minutes daily for 3 months and passed with 29/33. The SRS system is brilliant!',
          author: 'Maria S.',
          role: 'Passed October 2025',
          rating: 5
        },
        {
          text: 'Failed first time (15/33). Used this app for 2 months and scored 27/33 on second attempt. Highly recommend!',
          author: 'Ahmed K.',
          role: 'Passed September 2025',
          rating: 5
        },
        {
          text: 'The free version has everything you need. No hidden costs, no tricks. Just solid, effective learning.',
          author: 'John D.',
          role: 'Preparing',
          rating: 5
        }
      ]
    },
    cta2: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of successful learners',
      description: '100% free • No credit card required • No registration needed',
      button: 'Start Free'
    },
    footer: {
      tagline: 'Made with ❤️ for everyone pursuing German citizenship',
      links: {
        product: 'Product',
        resources: 'Resources',
        legal: 'Legal',
        items: {
          features: 'Features',
          pricing: 'Pricing',
          faq: 'FAQ',
          docs: 'Documentation',
          blog: 'Blog',
          privacy: 'Privacy',
          terms: 'Terms'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fadeIn leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 opacity-90">
              {content.hero.subtitle}
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-80 max-w-2xl mx-auto">
              {content.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <button
                onClick={onGetStarted}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
              >
                {content.hero.cta}
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-white/20 transition-all shadow-lg border border-white/30 hover:scale-105"
              >
                {content.hero.cta2}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-16">
            {[
              { label: content.stats.questions, icon: BookOpen },
              { label: content.stats.success, icon: Trophy },
              { label: content.stats.languages, icon: Globe }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="mx-auto mb-1 sm:mb-2 opacity-80 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                <div className="text-xl sm:text-2xl md:text-3xl font-bold">{stat.label.split(' ')[0]}</div>
                <div className="text-[10px] sm:text-xs md:text-sm opacity-80">{stat.label.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 sm:py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {content.features.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {content.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {content.features.items.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <feature.icon className="text-indigo-600 mb-3 sm:mb-4 w-8 h-8 sm:w-10 sm:h-10" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 sm:py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {content.howItWorks.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              {content.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8">
            {content.howItWorks.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-xl">
                  {step.number}
                </div>
                <step.icon className="text-indigo-600 mx-auto mb-3 sm:mb-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SRS Explanation */}
      <div className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Brain className="text-indigo-600 mx-auto mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {content.srs.title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-indigo-600 font-semibold mb-4 sm:mb-6">
              {content.srs.subtitle}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto">
              {content.srs.description}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl">
            <ul className="space-y-3 sm:space-y-4">
              {content.srs.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <Check className="text-green-500 flex-shrink-0 mt-0.5 sm:mt-1 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base md:text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pricing
      <div id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.pricing.title}
            </h2>
            <p className="text-xl text-gray-600">
              {content.pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[content.pricing.free, content.pricing.premium, content.pricing.lifetime].map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 ${
                  plan.highlight 
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl transform scale-105' 
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className="text-center mb-4">
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      plan.highlight ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-2 ${plan.highlight ? 'text-white opacity-80' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mb-6 ${plan.highlight ? 'text-white opacity-90' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check size={20} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-green-500'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-white' : 'text-gray-700'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.highlight
                      ? 'bg-white text-indigo-600 hover:bg-gray-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-600">
            <p className="text-sm">
              {lang === 'de' 
                ? '💳 Premium-Features kommen bald • Alle aktuellen Features bleiben kostenlos' 
                : '💳 Premium features coming soon • All current features stay free'}
            </p>
          </div>
        </div>
      </div>
    */}
      {/* Testimonials */}
      {/* 
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {content.testimonials.title}
            </h2>
            <p className="text-xl text-gray-600">
              {content.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.items.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  */}
      {/* Final CTA */}
      <div className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {content.cta2.title}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 opacity-90">
            {content.cta2.subtitle}
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 opacity-80">
            {content.cta2.description}
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-indigo-600 rounded-lg text-base sm:text-lg md:text-xl font-bold hover:bg-gray-100 transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-2 sm:gap-3"
          >
            <Heart className="fill-current w-5 h-5 sm:w-6 sm:h-6" />
            {content.cta2.button}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="col-span-1 sm:col-span-2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Einbürger Coach</h3>
              <p className="text-gray-400 mb-4">
                {content.footer.tagline}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{lang === 'de' ? 'Ein Produkt von' : 'A product by'}</span>
                <a 
                  href="https://www.dtechfarm.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  D TechFarm UG
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{content.footer.links.product}</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">{content.footer.links.items.features}</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">{content.footer.links.items.pricing}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{content.footer.links.resources}</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate?.('faq')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">{content.footer.links.items.faq}</button></li>
                <li><button onClick={() => onNavigate?.('impressum')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">{lang === 'de' ? 'Impressum' : 'Legal Notice'}</button></li>
                <li><button onClick={() => onNavigate?.('datenschutz')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">{content.footer.links.items.privacy}</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Einbürger Coach · D TechFarm UG (haftungsbeschränkt). {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}</p>
            <p className="mt-2">
              <button onClick={() => onNavigate?.('impressum')} className="hover:text-white transition-colors cursor-pointer">{lang === 'de' ? 'Impressum' : 'Legal Notice'}</button>
              {' • '}
              <button onClick={() => onNavigate?.('datenschutz')} className="hover:text-white transition-colors cursor-pointer">{content.footer.links.items.privacy}</button>
              {' • '}
              <button onClick={() => onNavigate?.('faq')} className="hover:text-white transition-colors cursor-pointer">FAQ</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
