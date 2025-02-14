'use client';

import { useTranslations } from 'next-intl';
import { getRandomRegion } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitch } from '@/components/theme-switch';
import { LanguageSwitcher } from '@/components/language-switcher';

export default function HomePage() {
    const t = useTranslations('HomePage');
    const regionT = useTranslations('RegionNames');
    const [selectedRegion, setSelectedRegion] = useState<ReturnType<typeof getRandomRegion> | null>(null);

    const handleRandomClick = () => {
        setSelectedRegion(getRandomRegion());
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{t('title')}</h1>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeSwitch />
                </div>
            </div>

            <Button onClick={handleRandomClick} className="mb-4">
                {t('reincarnation')}
            </Button>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>{selectedRegion ? regionT(selectedRegion.name) : '？'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div>
                            {t('rank')}: {selectedRegion ? selectedRegion.rank : '？'}
                        </div>
                        <div>
                            {t('hdi')}: {selectedRegion ? selectedRegion.hdi : '？'}
                        </div>
                        <div>
                            {t('lifeExpectancy')}:{' '}
                            {selectedRegion ? `${selectedRegion.lifeExpectancy} ${t('years')}` : '？'}
                        </div>
                        <div>
                            {t('rarity')}:{' '}
                            {selectedRegion
                                ? `${selectedRegion.populationPercentage.toFixed(3)}${t('percentage')}`
                                : '？'}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
