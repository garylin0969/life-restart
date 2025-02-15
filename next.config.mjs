import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true, // 允許 SVG 處理
        contentDispositionType: 'attachment', // 設定下載方式
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 安全策略
    },
};

export default withNextIntl(nextConfig);
