import { motion } from 'framer-motion';
import { Home, Brain, Trophy, BookOpen, BookMarked } from 'lucide-react';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  lang: string;
}

export function BottomNav({ currentPage, onNavigate, lang }: BottomNavProps) {
  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: lang === 'de' ? 'Start' : 'Home',
    },
    {
      id: 'training',
      icon: Brain,
      label: lang === 'de' ? 'Üben' : 'Train',
    },
    {
      id: 'quiz',
      icon: Trophy,
      label: lang === 'de' ? 'Quiz' : 'Quiz',
    },
    {
      id: 'grammar',
      icon: BookOpen,
      label: lang === 'de' ? 'Grammatik' : 'Grammar',
    },
    {
      id: 'vocab',
      icon: BookMarked,
      label: lang === 'de' ? 'Vokabeln' : 'Vocab',
    },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 bottom-nav shadow-2xl">
        <div className="flex items-center justify-around h-16 max-w-screen-lg mx-auto px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || 
                            (item.id === 'vocab' && ['cards', 'vocab', 'vocab-training'].includes(currentPage));
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                }}
                className={`flex flex-col items-center justify-center flex-1 h-full touch-target relative ${
                  isActive ? 'text-purple-600' : 'text-gray-500'
                } transition-colors active:scale-95`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
                
                {/* Icon */}
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="mb-1"
                />
                
                {/* Label */}
                <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer to prevent content from going under nav */}
      <div className="h-16" />
    </>
  );
}

// Overlay menu for "More" section (optional, can be used for secondary navigation)
interface MoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  lang: string;
}

export function MoreMenu({ isOpen, onClose, onNavigate, lang }: MoreMenuProps) {
  const moreItems = [
    { id: 'settings', icon: BookOpen, label: lang === 'de' ? 'Einstellungen' : 'Settings' },
    { id: 'faq', icon: BookOpen, label: 'FAQ' },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center md:justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 100 || info.velocity.y > 400) {
            onClose();
          }
        }}
        className="w-full bg-white rounded-t-3xl md:rounded-3xl md:max-w-md md:mb-0 p-6 pb-8 max-h-[80vh] overflow-y-auto"
      >
        {/* Handle bar (mobile) */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 md:hidden" />
        
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {lang === 'de' ? 'Mehr' : 'More'}
        </h3>

        <div className="space-y-2">
          {moreItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-target-lg"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl text-white">
                  <Icon size={24} />
                </div>
                <span className="text-lg font-semibold text-gray-900">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
