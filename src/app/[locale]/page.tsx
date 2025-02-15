import Header from '@/components/header';
import MainContent from '@/components/main-content';
import Footer from '@/components/footer';

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-svh px-6">
            <Header />
            <MainContent />
            <Footer />
        </div>
    );
}
