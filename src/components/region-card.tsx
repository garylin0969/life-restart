import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Region, ReincarnationStats } from '@/types';
import { cn } from '@/lib/utils';

interface RegionCardProps {
    reincarnationStats: ReincarnationStats;
    currentRegion: Region | null;
    translateRegion: (name: string) => string;
    translate: (key: string) => string;
}

const renderHDIWithColor = (hdi?: number) => {
    if (!hdi) return '？';
    return (
        <span
            className={cn(
                'text-white px-2 py-1 rounded-md',
                { 'bg-[rgb(26,150,65)]': hdi >= 0.8 },
                { 'bg-[rgb(166,217,106)]': hdi >= 0.7 && hdi < 0.8 },
                { 'bg-[rgb(253,174,97)]': hdi >= 0.55 && hdi < 0.7 },
                { 'bg-[rgb(215,25,28)]': hdi < 0.55 }
            )}
        >
            {hdi}
        </span>
    );
};

const RegionCard = ({ reincarnationStats, currentRegion, translateRegion, translate }: RegionCardProps) => {
    return (
        <Card className="shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                    {currentRegion?.name ? translateRegion(currentRegion.name) : '？'}
                </CardTitle>
            </CardHeader>
            <CardContent className="gap-4 flex flex-col lg:flex-row justify-around">
                <div className="grid gap-4">
                    <div className="text-lg">
                        {translate('rank')}：{currentRegion?.rank ?? '？'}
                    </div>
                    <div className="text-lg">
                        {translate('hdi')}：{renderHDIWithColor(currentRegion?.hdi) ?? '？'}
                    </div>
                    <div className="text-lg">
                        {translate('rarity')}：
                        {currentRegion?.populationPercentage
                            ? `${currentRegion.populationPercentage.toFixed(3)}${translate('percentage')}`
                            : '？'}
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="text-lg">
                        {translate('reincarnationCount')}：{reincarnationStats.totalCount}
                    </div>
                    <div className="text-lg">
                        {translate('reincarnationChinaCount')}：{reincarnationStats.chinaCount}
                    </div>
                    <div className="text-lg">
                        {translate('reincarnationIndiaCount')}：{reincarnationStats.indiaCount}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegionCard;
