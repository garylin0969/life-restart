'use client';

import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // 避免 hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => {
                setTheme(checked ? 'dark' : 'light');
            }}
            aria-label="Toggle theme"
        />
    );
}
