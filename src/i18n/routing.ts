import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // 支援的語系清單
    locales: ['en', 'zh-TW', 'zh-CN'],

    // 預設語系
    defaultLocale: 'en',
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
