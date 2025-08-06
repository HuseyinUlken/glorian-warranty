import * as React from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock } from "lucide-react"

import { cn } from "@/lib/utils"

function DateTimePicker({ className, value, onChange, ...props }: any) {
  // Popup kontrolü
  const [isOpen, setIsOpen] = React.useState(false);

  // Tarih ve saat state'leri
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(() => {
    if (!value) return undefined;
    try {
      const dateObj = new Date(value.toString());
      return !isNaN(dateObj.getTime()) ? dateObj : undefined;
    } catch (e) {
      return undefined;
    }
  });

  const [selectedTime, setSelectedTime] = React.useState<string | null>(() => {
    if (!value) return null;
    try {
      const dateObj = new Date(value.toString());
      return !isNaN(dateObj.getTime()) ? format(dateObj, "HH:mm") : null;
    } catch (e) {
      return null;
    }
  });

  // Tarih seçildiğinde
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      updateDateTimeValue(date, selectedTime);
    }
  };

  // Saat seçildiğinde
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      updateDateTimeValue(selectedDate, time);
    }
  };

  // Tarih ve saat değeri güncellendiğinde onChange'i çağır
  const updateDateTimeValue = (date: Date, time: string) => {
    try {
      // Saat bilgisini ayarla
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);

      // ISO formatında tarih-saat değerini oluştur
      const isoDateTime = format(newDate, "yyyy-MM-dd'T'HH:mm");

      // onChange'i çağır
      if (onChange) {
        // Sentetik olay oluştur
        const syntheticEvent = {
          target: { value: isoDateTime },
          currentTarget: { value: isoDateTime }
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        // console.log(syntheticEvent);
        onChange(syntheticEvent);
      }
    } catch (error) {
      console.error('Tarih-saat güncellemesi başarısız:', error);
    }
  };

  // Görüntülenecek tarih-saat değeri
  const displayValue = React.useMemo(() => {
    if (!selectedDate || !selectedTime) {
      return value ? String(value) : "";
    }

    try {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(hours, minutes);
      return format(dateWithTime, "dd MMMM yyyy HH:mm", { locale: tr });
    } catch (e) {
      return value ? String(value) : "";
    }
  }, [selectedDate, selectedTime, value]);

  // Saat dilimleri (30 dakikalık aralıklarla)
  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (const minute of [0, 15]) {
        slots.push({
          time: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
          available: true
        });
      }
    }
    return slots;
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <input
            type="text"
            readOnly
            data-slot="input"
            className={cn(
              "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "pr-10",
              className
            )}
            placeholder="Tarih ve saat seçin"
            onClick={() => setIsOpen(true)}
            value={displayValue}
            {...props}
            onChange={undefined}
          />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 overflow-hidden" align="center">
        <div className="flex max-sm:flex-col">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            locale={tr}
            initialFocus
            className="p-2 sm:pe-5 bg-background"
          />
          <div className="relative w-full max-sm:h-48 sm:w-40">
            <div className="absolute inset-0 border-border py-4 max-sm:border-t">
              <ScrollArea className="h-full border-border sm:border-s">
                <div className="space-y-3">
                  <div className="flex h-5 shrink-0 items-center px-5">
                    <Clock className="mr-2 h-4 w-4" />
                    <p className="text-sm font-medium">Saat Seçin</p>
                  </div>
                  <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                    {timeSlots.map(({ time: timeSlot, available }) => (
                      <Button
                        key={timeSlot}
                        variant={selectedTime === timeSlot ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleTimeSelect(timeSlot)}
                        disabled={!available}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  // datetime-local tipinde ise özel takvim bileşenini kullan
  if (type === "datetime-local") {
    return <DateTimePicker className={className} {...props} />
  }

  // Diğer input tipleri için normal input bileşenini kullan
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
