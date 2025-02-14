import { LanguageSelect } from './language-select';

export function LanguageSwitcher() {
    return (
        <div className="relative w-[140px] h-9">
            <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity peer-[loaded]:opacity-100">
                <div className="h-9 w-[140px] rounded-md border border-input bg-muted animate-pulse" />
            </div>
            <LanguageSelect />
        </div>
    );
}
