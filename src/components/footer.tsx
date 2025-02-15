import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="p-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">2025 Developed by Gary Lin</p>
            <div className="flex justify-center gap-4 mt-2">
                <a href="https://github.com/garylin0969" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                </a>
                <a href="https://www.linkedin.com/in/gary-lin-95723a247" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
