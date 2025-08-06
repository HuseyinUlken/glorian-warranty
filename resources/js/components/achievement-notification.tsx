import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Film, 
  Play, 
  Video, 
  FileText, 
  Star, 
  CheckSquare, 
  Flame, 
  Zap, 
  Trophy, 
  Target, 
  Brain, 
  Clock,
  X
} from 'lucide-react';

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  rarity_label: string;
}

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Film,
  Play,
  Video,
  FileText,
  Star,
  CheckSquare,
  Flame,
  Zap,
  Trophy,
  Target,
  Brain,
  Clock,
};

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animasyon için kısa bir gecikme
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // 5 saniye sonra otomatik kapat
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName] || Trophy;
    return <IconComponent className="h-6 w-6" />;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Yaygın':
        return 'bg-gray-100 text-gray-700';
      case 'Nadir':
        return 'bg-green-100 text-green-700';
      case 'Ender':
        return 'bg-blue-100 text-blue-700';
      case 'Epik':
        return 'bg-purple-100 text-purple-700';
      case 'Efsanevi':
        return 'bg-orange-100 text-orange-700';
      case 'Mitik':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="w-80 shadow-lg border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {/* Icon */}
              <div className="p-2 bg-yellow-100 rounded-full">
                <div className="text-yellow-600">
                  {getIconComponent(achievement.icon)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Yeni Başarı!
                  </h4>
                  <Badge className={`text-xs ${getRarityColor(achievement.rarity_label)}`}>
                    {achievement.rarity_label}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  {achievement.name}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 