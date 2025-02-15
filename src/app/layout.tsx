import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: new URL('https://garylin0969-life-restart.vercel.app'),
    title: 'Life Restart',
    description: 'Let your life be reincarnated.',
    alternates: {
        languages: {
            'zh-TW': '/zh-tw',
            'zh-CN': '/zh-cn',
            en: '/en',
        },
    },
    icons: { icon: { url: '/logo.svg' } },
    authors: [{ name: 'GaryLin' }],
    openGraph: {
        title: 'Life Restart',
        description: 'Let your life be reincarnated.',
        images: [
            {
                url: '/logo.svg',
                width: 1200,
                height: 630,
                type: 'image/svg+xml', // 明確指定 MIME 類型
                alt: 'Life Restart Logo',
            },
        ],
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
