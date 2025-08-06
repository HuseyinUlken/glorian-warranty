import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}
export function back() {
    window.history.back();
}
export function formatCurrency(amount: number, showCurrencySymbol = true) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(amount);
}

/**
 * Video süresini otomatik olarak alır
 */
export function getVideoDuration(videoUrl: string): Promise<number> {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';

        video.addEventListener('loadedmetadata', () => {
            const duration = Math.round(video.duration);
            resolve(duration);
        });

        video.addEventListener('error', () => {
            reject(new Error('Video süresi alınamadı'));
        });

        video.src = videoUrl;
    });
}

/**
 * Saniyeyi formatlar (HH:MM:SS)
 */
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}
