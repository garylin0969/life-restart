'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { getRandomRegion } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
    const t = useTranslations('HomePage');
    const regionT = useTranslations('RegionNames');
    const [selectedRegion, setSelectedRegion] = useState<ReturnType<typeof getRandomRegion> | null>(null);

    const handleRandomClick = () => {
        setSelectedRegion(getRandomRegion());
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

            <Button onClick={handleRandomClick} className="mb-4">
                {t('button')}
            </Button>

            {selectedRegion && (
                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{regionT(selectedRegion.name)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2">
                            <div>
                                {t('rank')}: {selectedRegion.rank}
                            </div>
                            <div>
                                {t('hdi')}: {selectedRegion.hdi}
                            </div>
                            <div>
                                {t('lifeExpectancy')}: {selectedRegion.lifeExpectancy} {t('years')}
                            </div>
                            <div>
                                {t('rarity')}: {selectedRegion.populationPercentage.toFixed(3)}
                                {t('percentage')}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* 語言切換連結 */}
            <div className="flex gap-4">
                <Link href="/" locale="zh-TW">
                    繁體中文
                </Link>
                <Link href="/" locale="zh-CN">
                    简体中文
                </Link>
                <Link href="/" locale="en">
                    English
                </Link>
            </div>
        </div>
    );
}
