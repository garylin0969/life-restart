'use client';

import { useTranslations } from 'next-intl';
import { getRandomRegion } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitch } from '@/components/theme-switch';
import { LanguageSelect } from '@/components/language-select';

export default function HomePage() {
    const t = useTranslations('HomePage');
    const regionT = useTranslations('RegionNames');
    const [selectedRegion, setSelectedRegion] = useState<ReturnType<typeof getRandomRegion> | null>(null);
    const [counts, setCounts] = useState({
        reincarnationCount: 0,
        reincarnationChinaCount: 0,
        reincarnationIndiaCount: 0,
    });

    useEffect(() => {
        // 初始化時從 localStorage 獲取 counts
        const storedCounts = localStorage.getItem('counts');
        if (storedCounts) {
            setCounts(JSON.parse(storedCounts));
        }
    }, []);

    const handleRandomClick = () => {
        const newRegion = getRandomRegion();
        setSelectedRegion(newRegion);

        setCounts((prev) => {
            const newCounts = {
                reincarnationCount: prev.reincarnationCount + 1,
                reincarnationChinaCount:
                    prev.reincarnationChinaCount + (regionT(newRegion.name) === regionT('CHN') ? 1 : 0),
                reincarnationIndiaCount:
                    prev.reincarnationIndiaCount + (regionT(newRegion.name) === regionT('IND') ? 1 : 0),
            };
            // 更新 localStorage
            localStorage.setItem('counts', JSON.stringify(newCounts));
            return newCounts;
        });
    };

    const handleRestClick = () => {
        localStorage.removeItem('counts');
        setSelectedRegion(null);
        setCounts({
            reincarnationCount: 0,
            reincarnationChinaCount: 0,
            reincarnationIndiaCount: 0,
        });
    };
    return (
        <div className="container mx-auto p-4">
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{t('title')}</h1>
                    <div className="flex items-center gap-4">
                        <LanguageSelect />
                        <ThemeSwitch />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button onClick={handleRandomClick} className="mb-4">
                        {t('reincarnation')}
                    </Button>
                    <Button onClick={handleRestClick} className="mb-4">
                        {t('reset')}
                    </Button>
                </div>
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="text-center">
                            {selectedRegion ? regionT(selectedRegion.name) : '？'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="gap-2 flex flex-col lg:flex-row justify-around">
                        <div className="grid gap-2">
                            <div>
                                {t('rank')}: {selectedRegion ? selectedRegion.rank : '？'}
                            </div>
                            <div>
                                {t('hdi')}: {selectedRegion ? selectedRegion.hdi : '？'}
                            </div>
                            <div>
                                {t('rarity')}:
                                {selectedRegion
                                    ? `${selectedRegion.populationPercentage.toFixed(3)}${t('percentage')}`
                                    : '？'}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                {t('reincarnationCount')}: {counts.reincarnationCount}
                            </div>
                            <div>
                                {t('reincarnationChinaCount')}: {counts.reincarnationChinaCount}
                            </div>
                            <div>
                                {t('reincarnationIndiaCount')}: {counts.reincarnationIndiaCount}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
