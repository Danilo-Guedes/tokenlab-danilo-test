import { LinkedinIcon, GithubIcon } from 'lucide-react';

function Footer() {
        
    return (
        <footer className="w-full  bg-white p-10 border-t-2 shadow-inner mt-10">
            <div className="flex flex-row justify-center items-center gap-10">
                <a href="https://www.linkedin.com/in/danilo-guedes-dev" target='_blank' rel="noreferrer">
                    <LinkedinIcon />
                </a>
                <a href="https://www.github.com/danilo-guedes" target='_blank' rel="noreferrer">
                    <GithubIcon />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
