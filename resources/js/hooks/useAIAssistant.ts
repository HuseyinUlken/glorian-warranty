import { useState, useCallback } from 'react';
import axios from 'axios';
import { 
    ChatMessage, 
    ChatResponse, 
    StatisticsAnalysisResponse, 
    QuickStatsReportResponse,
    ApiStatusResponse,
    ClearCacheResponse,
    ChatFormData,
    AIAssistantState 
} from '@/types/ai-assistant';

export const useAIAssistant = () => {
    const [state, setState] = useState<AIAssistantState>({
        messages: [],
        isLoading: false,
        error: null,
        apiStatus: 'unknown',
    });

    // API durumunu kontrol et
    const checkApiStatus = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true }));
            
            const response = await axios.get<ApiStatusResponse>(route('student.ai-assistant.api-status'));
            
            setState(prev => ({ 
                ...prev, 
                apiStatus: response.data.api_status,
                isLoading: false 
            }));
            
            return response.data;
        } catch (error) {
            setState(prev => ({ 
                ...prev, 
                apiStatus: 'error',
                isLoading: false,
                error: 'API durumu kontrol edilemedi'
            }));
            throw error;
        }
    }, []);

    // Sohbet mesajı gönder
    const sendMessage = useCallback(async (message: string) => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const formData: ChatFormData = {
                message,
                conversation_history: state.messages,
            };
            
            const response = await axios.post<ChatResponse>(
                route('student.ai-assistant.chat'),
                formData
            );
            
            if (response.data.success) {
                const newMessage: ChatMessage = {
                    role: 'assistant',
                    content: response.data.message,
                    timestamp: new Date().toISOString(),
                };
                
                setState(prev => ({
                    ...prev,
                    messages: [...prev.messages, 
                        { role: 'user', content: message, timestamp: new Date().toISOString() },
                        newMessage
                    ],
                    isLoading: false,
                }));
                
                return response.data;
            } else {
                throw new Error(response.data.message || 'Mesaj gönderilemedi');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu';
            setState(prev => ({ 
                ...prev, 
                isLoading: false,
                error: errorMessage
            }));
            throw error;
        }
    }, [state.messages]);

    // İstatistik analizi
    const analyzeStatistics = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const response = await axios.post<StatisticsAnalysisResponse>(
                route('student.ai-assistant.analyze-statistics')
            );
            
            setState(prev => ({ ...prev, isLoading: false }));
            
            return response.data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'İstatistik analizi başarısız';
            setState(prev => ({ 
                ...prev, 
                isLoading: false,
                error: errorMessage
            }));
            throw error;
        }
    }, []);

    // Hızlı istatistik raporu
    const getQuickStatsReport = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const response = await axios.post<QuickStatsReportResponse>(
                route('student.ai-assistant.quick-stats-report')
            );
            
            setState(prev => ({ ...prev, isLoading: false }));
            
            return response.data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Hızlı rapor oluşturulamadı';
            setState(prev => ({ 
                ...prev, 
                isLoading: false,
                error: errorMessage
            }));
            throw error;
        }
    }, []);

    // Cache temizle
    const clearCache = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            
            const response = await axios.post<ClearCacheResponse>(
                route('student.ai-assistant.clear-cache')
            );
            
            setState(prev => ({ ...prev, isLoading: false }));
            
            return response.data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Cache temizlenemedi';
            setState(prev => ({ 
                ...prev, 
                isLoading: false,
                error: errorMessage
            }));
            throw error;
        }
    }, []);

    // Sohbet geçmişini temizle
    const clearChat = useCallback(() => {
        setState(prev => ({ ...prev, messages: [], error: null }));
    }, []);

    // Hata mesajını temizle
    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        sendMessage,
        analyzeStatistics,
        getQuickStatsReport,
        checkApiStatus,
        clearCache,
        clearChat,
        clearError,
    };
}; 