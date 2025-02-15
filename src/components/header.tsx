import { useTranslations } from 'next-intl';
import { LanguageSelect } from '@/components/language-select';
import { ThemeSwitch } from '@/components/theme-switch';

const Header = () => {
    const translate = useTranslations('HomePage');

    return (
        <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl mb:text-3xl font-bold">{translate('title')}</h1>
            <div className="flex items-center gap-2">
                <LanguageSelect />
                <ThemeSwitch />
            </div>
        </header>
    );
};

export default Header;
