import NavBar from './NavBar';
import Footer from './Footer';

const PageTemplate = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-1 flex-grow flex-col relative">
            <NavBar />
            <div className="flex flex-grow flex-col flex-1 px-5 md:px-36">{children}</div>
            <Footer />
        </div>
    );
};

export default PageTemplate;
