// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title="E-posta Doğrulama"
            description="Lütfen size gönderdiğimiz e-postadaki bağlantıya tıklayarak e-posta adresinizi doğrulayın."
        >
            <Head title="E-posta Doğrulama" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Kayıt sırasında verdiğiniz e-posta adresine yeni bir doğrulama bağlantısı gönderildi.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Doğrulama E-postasını Yeniden Gönder
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    Çıkış Yap
                </TextLink>
            </form>
        </AuthLayout>
    );
}
