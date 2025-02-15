import { Card, CardContent } from '@/components/ui/card';
import { ReincarnationStats } from '@/types';

interface StatsCardProps {
    reincarnationStats: ReincarnationStats;
    translate: (key: string) => string;
}

const StatsCard = ({ reincarnationStats, translate }: StatsCardProps) => {
    return (
        <Card className="mb-6 shadow-lg rounded-lg">
            <CardContent className="flex-col flex gap-2 p-4">
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

export default StatsCard;
