import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // 配對需要國際化的路徑
    matcher: ['/', '/(zh-TW|zh-CN|en)/:path*'],
};
