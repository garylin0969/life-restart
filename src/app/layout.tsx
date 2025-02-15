import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Life Restart',
    description: 'Let your life be reincarnated.',
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
