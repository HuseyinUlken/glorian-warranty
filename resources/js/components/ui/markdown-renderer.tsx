import React from 'react';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    if (!content) {
        return <p className="text-muted-foreground">İçerik bulunmuyor.</p>;
    }

    // Basit markdown render fonksiyonu
    const renderMarkdown = (text: string) => {
        // Başlıklar
        text = text.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>');
        text = text.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>');
        text = text.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>');
        
        // Kalın ve italik
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
        
        // Kod blokları
        text = text.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg overflow-x-auto my-2"><code>$1</code></pre>');
        text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
        
        // Linkler
        text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
        
        // Listeler
        text = text.replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>');
        text = text.replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>');
        text = text.replace(/(<li.*<\/li>)/s, '<ul class="list-disc mb-2">$1</ul>');
        
        // Numaralı listeler
        text = text.replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>');
        text = text.replace(/(<li.*<\/li>)/s, '<ol class="list-decimal mb-2">$1</ol>');
        
        // Paragraflar
        text = text.replace(/\n\n/g, '</p><p class="mb-2">');
        text = text.replace(/^(?!<[h|u|o|p|pre])(.*$)/gim, '<p class="mb-2">$1</p>');
        
        // Satır sonları
        text = text.replace(/\n/g, '<br>');
        
        return text;
    };

    return (
        <div 
            className={`prose prose-sm max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
    );
} 