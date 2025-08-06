import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './button';

interface BlurredOptionProps {
    children: React.ReactNode;
    isBlurred: boolean;
    onToggle?: () => void;
    className?: string;
}

export function BlurredOption({ children, isBlurred, onToggle, className = '' }: BlurredOptionProps) {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setIsRevealed(!isRevealed);
        }
    };

    const shouldBlur = isBlurred && !isRevealed;

    return (
        <div className={`relative ${className}`}>
            <div className={`transition-all duration-300 ${shouldBlur ? 'blur-sm select-none' : ''}`}>
                {children}
            </div>
            
            {isBlurred && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border shadow-lg">
                        <div className="flex items-center gap-2">
                            <EyeOff className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600 font-medium">
                                Bu içerik gizlenmiştir
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleToggle}
                                className="ml-2"
                            >
                                <Eye className="h-4 w-4 mr-1" />
                                Göster
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 