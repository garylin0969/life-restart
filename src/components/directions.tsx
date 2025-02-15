import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DirectionsProps {
    translate: (key: string) => string;
}

const HDIWithColor = ({ type }: { type: string }) => {
    return (
        <div
            className={cn(
                'w-4 aspect-square inline-block rounded-md',
                { 'bg-[rgb(26,150,65)]': type === 'VeryHigh' },
                { 'bg-[rgb(166,217,106)]': type === 'High' },
                { 'bg-[rgb(253,174,97)]': type === 'Medium' },
                { 'bg-[rgb(215,25,28)]': type === 'Low' }
            )}
        />
    );
};

const Directions = ({ translate }: DirectionsProps) => {
    return (
        <Card className="mb-6 shadow-lg rounded-lg">
            <CardContent className="flex-col flex gap-2 p-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {translate('hdiExplanationTitle')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{translate('hdiExplanation')}</p>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{translate('hdiStandardsTitle')}</h3>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                        {translate('hdiStandardVeryHigh')}
                        <HDIWithColor type="VeryHigh" />
                    </li>
                    <li className="flex items-center gap-2">
                        {translate('hdiStandardHigh')}
                        <HDIWithColor type="High" />
                    </li>
                    <li className="flex items-center gap-2">
                        {translate('hdiStandardMedium')}
                        <HDIWithColor type="Medium" />
                    </li>
                    <li className="flex items-center gap-2">
                        {translate('hdiStandardLow')}
                        <HDIWithColor type="Low" />
                    </li>
                </ul>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{translate('disclaimer')}</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {translate('inspiration')}
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
    );
};

export default Directions;
