import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
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
        <html lang={locale} translate="no" dir="ltr" suppressHydrationWarning>
            <body className={cn(inter.className, 'antialiased')}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <div className="container mx-auto">{children}</div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
