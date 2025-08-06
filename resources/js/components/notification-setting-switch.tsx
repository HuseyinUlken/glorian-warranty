import { Switch } from '@/components/ui/switch';
import { Transition } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface NotificationSettingSwitchProps {
    module: string;
    event: string;
    isActive: boolean;
}

export default function NotificationSettingSwitch({ module, event, isActive }: NotificationSettingSwitchProps) {
    const [success, setSuccess] = useState(false);
    const [checked, setChecked] = useState(isActive);

    const updateNotificationSetting = (isActive: boolean) => {
        // Önce yerel durumu güncelle
        setChecked(isActive);

        // Başarı mesajını sıfırla
        setSuccess(false);

        // Inertia.js router ile ayarı güncelle
        router.post(
            route('notification-settings.update'),
            {
                module,
                event,
                is_active: isActive,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 2000);
                },
            },
        );
    };

    return (
        <div className="flex items-center gap-4">
            <Transition
                show={success}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Kaydedildi</span>
                </div>
            </Transition>

            <Switch
                checked={checked}
                onCheckedChange={(checked) => {
                    updateNotificationSetting(checked);
                }}
            />
        </div>
    );
}
