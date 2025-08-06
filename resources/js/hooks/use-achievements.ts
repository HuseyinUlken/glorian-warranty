import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  rarity_label: string;
}

export function useAchievements() {
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  // Başarıları kontrol et
  const checkAchievements = async () => {
    if (isChecking) return;
    
    setIsChecking(true);
    
    try {
      const response = await router.post(route('achievements.check'), {}, {
        preserveState: true,
        preserveScroll: true,
        only: ['newlyCompleted'],
      });
      
      if (response?.props?.newlyCompleted) {
        setNewAchievements(response.props.newlyCompleted);
      }
    } catch (error) {
      console.error('Başarı kontrolü sırasında hata:', error);
    } finally {
      setIsChecking(false);
    }
  };

  // Başarı özetini al
  const getAchievementSummary = async () => {
    try {
      const response = await router.get(route('achievements.summary'), {}, {
        preserveState: true,
        preserveScroll: true,
        only: ['summary'],
      });
      
      return response?.props?.summary;
    } catch (error) {
      console.error('Başarı özeti alınırken hata:', error);
      return null;
    }
  };

  // Yeni başarıyı kaldır
  const removeAchievement = (achievementId: number) => {
    setNewAchievements(prev => prev.filter(achievement => achievement.id !== achievementId));
  };

  // Tüm yeni başarıları temizle
  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  return {
    newAchievements,
    isChecking,
    checkAchievements,
    getAchievementSummary,
    removeAchievement,
    clearNewAchievements,
  };
} 