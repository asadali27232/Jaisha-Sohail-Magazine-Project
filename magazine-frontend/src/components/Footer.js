const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white text-center py-4 flex flex-col md:flex-row justify-center items-center gap-2">
            <p>Developed by Asad Ali</p>
            <p>© {new Date().getFullYear()} All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
