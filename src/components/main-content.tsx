'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getRandomRegion } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import RegionCard from '@/components/region-card';
import Directions from '@/components/directions';
import { ReincarnationStatsI } from '@/types';

const MainContent = () => {
    const translate = useTranslations('HomePage');
    const translateRegion = useTranslations('RegionNames');
    const [currentRegion, setCurrentRegion] = useState<ReturnType<typeof getRandomRegion> | null>(null);
    const [reincarnationStats, setReincarnationStats] = useState<ReincarnationStatsI>({
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
                chinaCount: prevStats.chinaCount + (translateRegion(newRegion.name) === translateRegion('CHN') ? 1 : 0),
                indiaCount: prevStats.indiaCount + (translateRegion(newRegion.name) === translateRegion('IND') ? 1 : 0),
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
        <div className="flex-1 flex flex-col justify-center">
            <RegionCard
                reincarnationStats={reincarnationStats}
                currentRegion={currentRegion}
                translateRegion={translateRegion}
                translate={translate}
            />
            <div className="flex gap-4 justify-center my-6">
                <Button className="min-w-24 font-semibold" onClick={handleRandomClick}>
                    {translate('reincarnation')}
                </Button>
                <Button className="min-w-24 font-semibold" onClick={handleResetClick}>
                    {translate('reset')}
                </Button>
            </div>
            <Directions translate={translate} />
        </div>
    );
};

export default MainContent;
