import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  lang?: 'de' | 'en';
  type?: 'website' | 'article';
  image?: string;
  url?: string;
}

export default function SEO({ 
  title, 
  description, 
  lang = 'de',
  type = 'website',
  image = '/og-image.jpg',
  url = 'https://einbuergerungstest-trainer.app'
}: SEOProps) {
  const defaultTitles = {
    de: 'Einbürger Coach - Einbürgerungstest Vorbereitung',
    en: 'Einbürger Coach - German Citizenship Test Trainer'
  };

  const defaultDescriptions = {
    de: 'Bereiten Sie sich kostenlos auf den Einbürgerungstest vor. 310 offizielle Fragen, intelligentes SRS-Lernsystem, Quiz-Simulation, Vokabeltraining und mehr. Keine Registrierung erforderlich.',
    en: 'Prepare for the German citizenship test for free. 310 official questions, intelligent SRS learning system, quiz simulation, vocabulary training and more. No registration required.'
  };

  const keywords = {
    de: 'Einbürgerungstest, Deutscher Staatsbürgerschaftstest, Deutschland Einbürgerung, Test Vorbereitung, BAMF Test, Einbürgerungsprüfung, Einbürgerung Deutschland, Deutsch lernen, Spaced Repetition, SRS, Quiz',
    en: 'German citizenship test, Einbürgerungstest, Germany naturalization, test preparation, BAMF test, citizenship exam, German citizenship, learn German, Spaced Repetition, SRS, Quiz'
  };

  const pageTitle = title || defaultTitles[lang];
  const pageDescription = description || defaultDescriptions[lang];
  const pageKeywords = keywords[lang];

  useEffect(() => {
    // Update document title
    document.title = pageTitle;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', pageDescription);
    updateMetaTag('keywords', pageKeywords);
    
    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', pageTitle, true);
    updateMetaTag('og:description', pageDescription, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:locale', lang === 'de' ? 'de_DE' : 'en_US', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', pageDescription);
    updateMetaTag('twitter:image', image);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }, [pageTitle, pageDescription, pageKeywords, type, image, url, lang]);

  return null;
}
