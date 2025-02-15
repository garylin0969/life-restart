'use client';

import { useTranslations } from 'next-intl';
import { getRandomRegion } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitch } from '@/components/theme-switch';
import { LanguageSelect } from '@/components/language-select';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
                <div className="mt-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700 flex-col flex gap-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('hdiExplanationTitle')}</h2>
                    <p className="text-gray-700 dark:text-gray-300">{t('hdiExplanation')}</p>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('hdiStandardsTitle')}</h3>
                    <ul className="list-disc pl-5">
                        <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardVeryHigh')}: 0.800 以上</li>
                        <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardHigh')}: 0.799 ~ 0.700 之間</li>
                        <li className="text-gray-700 dark:text-gray-300">
                            {t('hdiStandardMedium')}: 0.699 ~ 0.550 之間
                        </li>
                        <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardLow')}: 0.549 以下</li>
                    </ul>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('disclaimer')}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('inspiration')}</p>
                </div>
            </div>
            <footer className="mt-8 p-4 text-center">
                <p className="text-gray-600 dark:text-gray-400">Developed by Gary Lin</p>
                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/garylin0969" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                    </a>
                    <a href="https://www.linkedin.com/in/gary-lin-95723a247/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
