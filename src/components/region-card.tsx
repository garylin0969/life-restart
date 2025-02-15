import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Region } from '@/types';

interface RegionCardProps {
    currentRegion: Region | null;
    translateRegion: (name: string) => string;
    translate: (key: string) => string;
}

const RegionCard = ({ currentRegion, translateRegion, translate }: RegionCardProps) => {
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
                        {translate('hdi')}：{currentRegion?.hdi ?? '？'}
                    </div>
                    <div className="text-lg">
                        {translate('rarity')}：
                        {currentRegion?.populationPercentage
                            ? `${currentRegion.populationPercentage.toFixed(3)}${translate('percentage')}`
                            : '？'}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegionCard;
