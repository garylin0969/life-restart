import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = (await params).locale;
    return {
        other: {
            google: 'notranslate',
            'Content-Language': locale,
        },
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const locale = (await params).locale;

    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} translate="no" dir="ltr">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
