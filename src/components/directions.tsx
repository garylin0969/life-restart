import { Card, CardContent } from '@/components/ui/card';

interface DirectionsProps {
    translate: (key: string) => string;
}

const Directions = ({ translate }: DirectionsProps) => {
    return (
        <Card className="mb-6 shadow-lg rounded-lg">
            <CardContent className="flex-col flex gap-2 p-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {translate('hdiExplanationTitle')}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">{translate('hdiExplanation')}</p>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{translate('hdiStandardsTitle')}</h3>
                <ul className="list-disc pl-5">
                    <li className="text-gray-700 dark:text-gray-300">{translate('hdiStandardVeryHigh')}</li>
                    <li className="text-gray-700 dark:text-gray-300">{translate('hdiStandardHigh')}</li>
                    <li className="text-gray-700 dark:text-gray-300">{translate('hdiStandardMedium')}</li>
                    <li className="text-gray-700 dark:text-gray-300">{translate('hdiStandardLow')}</li>
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
