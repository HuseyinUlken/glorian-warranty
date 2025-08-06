import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Zap } from "lucide-react";
import axios from "axios";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { router } from "@inertiajs/react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useId } from "react";

interface AITextareaProps extends React.ComponentProps<typeof Textarea> {
  onImproved?: (text: string) => void;
}

export function AITextarea({
  className,
  ...props
}: AITextareaProps) {
  // Benzersiz id oluştur
  const uniqueId = useId();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originalText, setOriginalText] = useState<string>(props.value as string || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [improved, setImproved] = useState<boolean>(false);
  const [autoImprove, setAutoImprove] = useState<boolean>(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const onImproved = (text: string) => {
    // Sadece bu textarea için değeri güncelle
    if (textareaRef.current) {
      // Değeri doğrudan güncelle
      textareaRef.current.value = text;
      
      // Sentetik event oluştur - hedefi spesifik olarak belirt
      const syntheticEvent = new Event('input', { bubbles: true });
      Object.defineProperty(syntheticEvent, 'target', { value: textareaRef.current });
      
      // onChange'i çağır
      props.onChange?.(syntheticEvent as unknown as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };
  // Değişiklikleri izle
  useEffect(() => {
    setOriginalText(props.value as string || "");
  }, [props.value]);

  // Otomatik iyileştirme için blur olayını izle
  const handleBlur = async (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (autoImprove && e.target.value.trim().length > 10) {
      await improveText(true);
    }
  };

  // Metni iyileştir
  const improveText = async (auto = false) => {
    if (improved) {
      return;
    }
    // Boş metin kontrolü
    if (!props.value || (props.value as string).trim().length === 0) {
      return;
    }

    // Yükleniyor durumunu ayarla
    setIsLoading(true);

    try {
      // API isteği gönder
      const response = await axios.post(route('utils.improve-text'), {
        text: props.value,
        auto: auto,
      });

      // Başarılı yanıt
      if (response.data.success) {
        // İyileştirilmiş metni al
        const improvedText = response.data.improved_text;

        // Callback fonksiyonu varsa çağır
        if (onImproved && typeof onImproved === "function") {
          onImproved(improvedText);
        }
        setImproved(true);
      }
    } catch (error) {
      console.error("Metin iyileştirme hatası:", error);
    } finally {
      // Yükleniyor durumunu kapat
      setIsLoading(false);
    }
  };

  // Otomatik iyileştirme için debounce
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Orijinal onChange olayını çağır
    if (props.onChange) {
      props.onChange(e);
    }

    // Otomatik iyileştirme aktifse ve metin yeterince uzunsa
    if (autoImprove && e.target.value.trim().length > 10) {
      // Önceki zamanlayıcıyı temizle
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Yeni zamanlayıcı oluştur
      timeoutRef.current = setTimeout(() => {
        // Kullanıcı yazmayı bitirdiyse iyileştir
        if (!isLoading) {
          improveText(true);
        }
      }, 1500); // 1.5 saniye bekle
    }
  };

  return (
    <div className="space-y-1">
      <Textarea
        ref={textareaRef}
        className={cn(
          "mb-0 rounded-b-none", // Alt kısmı yuvarlatılmamış
          className
        )}
        {...props}
        id={props.id || `ai-textarea-${uniqueId}`}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading || props.disabled}
      />

      {/* Footer alanı */}
      <div className="flex items-center justify-between bg-muted/30 px-3 py-1.5 text-xs rounded-b-md border border-t-0 border-input">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 gap-1"
                  onClick={() => {
                    setAutoImprove(true);
                    improveText();
                  }}
                  disabled={isLoading || props.disabled}
                >
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  )}
                  <span>Düzelt</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Metni TDK kurallarına uygun ve saygılı bir dile çevirir</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor={`auto-improve-${uniqueId}`} className="text-xs cursor-pointer">
              Otomatik düzeltme
            </Label>
            <Switch
              id={`auto-improve-${uniqueId}`}
              checked={autoImprove}
              onCheckedChange={(checked) => {
                setAutoImprove(checked);
              }}
            />
          </div>
          
          {isLoading && (
            <span className="text-xs text-muted-foreground animate-pulse">
              Metin düzeltiliyor...
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
