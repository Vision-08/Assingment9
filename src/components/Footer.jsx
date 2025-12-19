import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-neutral text-neutral-content rounded-t-xl mt-10">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4 text-2xl">
                    <a href="https://www.facebook.com/programmingHero/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaFacebook /></a>
                    <a href="#" className="hover:text-primary transition-colors"><FaTwitter /></a>
                    <a href="https://www.instagram.com/programminghero/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaInstagram /></a>
                    <a href="https://bd.linkedin.com/in/essa-zaman-4b4a75380" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaLinkedin /></a>
                </div>
            </nav>
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by WarmPaws Industries Ltd</p>
                <p>Contact: support@warmpaws.com | +1 (555) 123-4567</p>
            </aside>
        </footer>
    );
};

export default Footer;
