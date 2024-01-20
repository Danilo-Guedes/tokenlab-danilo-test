/* eslint-disable react/prop-types */
import NavBar from './NavBar';
import Footer from './Footer';

const PageTemplate = ({ children }) => {
    return (
        <div className="h-full flex flex-col  relative">
            <NavBar />
            <div className="flex flex-grow flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default PageTemplate;
