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
    const [currentRegion, setCurrentRegion] = useState<ReturnType<typeof getRandomRegion> | null>(null);
    const [reincarnationStats, setReincarnationStats] = useState({
        totalCount: 0,
        chinaCount: 0,
        indiaCount: 0,
    });

    useEffect(() => {
        const storedStats = localStorage.getItem('counts');
        if (storedStats) {
            setReincarnationStats(JSON.parse(storedStats));
        }
    }, []);

    const updateReincarnationStats = (newRegion: ReturnType<typeof getRandomRegion>) => {
        setReincarnationStats((prevStats) => {
            const updatedStats = {
                totalCount: prevStats.totalCount + 1,
                chinaCount: prevStats.chinaCount + (regionT(newRegion.name) === regionT('CHN') ? 1 : 0),
                indiaCount: prevStats.indiaCount + (regionT(newRegion.name) === regionT('IND') ? 1 : 0),
            };
            localStorage.setItem('counts', JSON.stringify(updatedStats));
            return updatedStats;
        });
    };

    const handleRandomClick = () => {
        const newRegion = getRandomRegion();
        setCurrentRegion(newRegion);
        updateReincarnationStats(newRegion);
    };

    const handleResetClick = () => {
        localStorage.removeItem('counts');
        setCurrentRegion(null);
        setReincarnationStats({
            totalCount: 0,
            chinaCount: 0,
            indiaCount: 0,
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
                    <Button onClick={handleResetClick} className="mb-4">
                        {t('reset')}
                    </Button>
                </div>
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="text-center">
                            {currentRegion?.name ? regionT(currentRegion.name) : '？'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="gap-2 flex flex-col lg:flex-row justify-around">
                        <div className="grid gap-2">
                            <div>
                                {t('rank')}: {currentRegion?.rank ?? '？'}
                            </div>
                            <div>
                                {t('hdi')}: {currentRegion?.hdi ?? '？'}
                            </div>
                            <div>
                                {t('rarity')}:
                                {currentRegion?.populationPercentage
                                    ? `${currentRegion.populationPercentage.toFixed(3)}${t('percentage')}`
                                    : '？'}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div>
                                {t('reincarnationCount')}: {reincarnationStats.totalCount}
                            </div>
                            <div>
                                {t('reincarnationChinaCount')}: {reincarnationStats.chinaCount}
                            </div>
                            <div>
                                {t('reincarnationIndiaCount')}: {reincarnationStats.indiaCount}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
