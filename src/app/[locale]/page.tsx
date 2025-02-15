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
        <div className="flex flex-col min-h-svh px-6">
            <header className="flex justify-between items-center p-4">
                <h1 className="text-2xl mb:text-3xl font-bold">{t('title')}</h1>
                <div className="flex items-center gap-2">
                    <LanguageSelect />
                    <ThemeSwitch />
                </div>
            </header>
            <div className="flex-1 flex flex-col justify-center">
                <Card className="shadow-lg rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">
                            {currentRegion?.name ? regionT(currentRegion.name) : '？'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="gap-4 flex flex-col lg:flex-row justify-around">
                        <div className="grid gap-4">
                            <div className="text-lg">
                                {t('rank')}：{currentRegion?.rank ?? '？'}
                            </div>
                            <div className="text-lg">
                                {t('hdi')}：{currentRegion?.hdi ?? '？'}
                            </div>
                            <div className="text-lg">
                                {t('rarity')}：
                                {currentRegion?.populationPercentage
                                    ? `${currentRegion.populationPercentage.toFixed(3)}${t('percentage')}`
                                    : '？'}
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div className="text-lg">
                                {t('reincarnationCount')}：{reincarnationStats.totalCount}
                            </div>
                            <div className="text-lg">
                                {t('reincarnationChinaCount')}：{reincarnationStats.chinaCount}
                            </div>
                            <div className="text-lg">
                                {t('reincarnationIndiaCount')}：{reincarnationStats.indiaCount}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex gap-4 justify-center my-6">
                    <Button onClick={handleRandomClick}>{t('reincarnation')}</Button>
                    <Button onClick={handleResetClick}>{t('reset')}</Button>
                </div>
                <Card className="mb-6 shadow-lg rounded-lg">
                    <CardContent className="flex-col flex gap-2 p-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                            {t('hdiExplanationTitle')}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">{t('hdiExplanation')}</p>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('hdiStandardsTitle')}</h3>
                        <ul className="list-disc pl-5">
                            <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardVeryHigh')}</li>
                            <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardHigh')}</li>
                            <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardMedium')}</li>
                            <li className="text-gray-700 dark:text-gray-300">{t('hdiStandardLow')}</li>
                        </ul>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('disclaimer')}</p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {t('inspiration')}
                            <a
                                className="font-semibold"
                                href="https://dweam.xyz/luck"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                投胎抽卡機
                            </a>
                        </p>
                    </CardContent>
                </Card>
            </div>
            <footer className="p-4 text-center">
                <p className="text-gray-600 dark:text-gray-400">2025 Developed by Gary Lin</p>
                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://github.com/garylin0969" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                    </a>
                    <a href="https://www.linkedin.com/in/gary-lin-95723a247" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
