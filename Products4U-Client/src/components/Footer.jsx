import { Link } from "react-router-dom";
import AboutUs from "./AboutUs.jsx";
import ContactUs from "../pages/ContactUs";

const Footer = () => {
    return (
        <div className="text-white p-5">
            <hr className="border-t-2 border-white" />
            <footer className="footer bg-black p-10 w-full flex flex-row justify-around">
                <nav className="flex flex-col items-center justify-center w-1/4">
                    <h6 className="footer-title">Products4U</h6>
                    <Link to={'/queries'}><a className="link link-hover">All Queries</a></Link>
                    <Link to={'/myQueries'}><a className="link link-hover">My Queries</a></Link>
                    <Link to={'/addQuery'}><a className="link link-hover">Add Equipment</a></Link>
                </nav>
                <nav className="flex flex-col items-center justify-center w-1/4">
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover" href="/#about-us">About Us</a>
                    <a className="link link-hover" href="https://www.linkedin.com/in/muhammad-rafat-hossain">Contact Us</a>
                    <a className="link link-hover" href="https://www.linkedin.com/in/muhammad-rafat-hossain" target="_blank">Collaborate</a>
                </nav>
                <nav className="flex flex-col items-center justify-center w-1/4">
                    <h6 className="footer-title">Socials</h6>
                    <Link to={"https://x.com"} target="_blank"><a className="link link-hover">Twitter</a></Link>
                    <Link to={"https://www.facebook.com/rafat.hossain.564"} target="_blank"><a className="link link-hover">Facebook</a></Link>
                    <Link to={"https://instagram.com"} target="_blank"><a className="link link-hover">Instagram</a></Link>
                </nav>
            </footer>
            <footer className="footer bg-black text-base-content border-base-300 border-t px-10 py-4 text-center">
                <aside className="grid-flow-col text-center m-auto text-white">
                    <p>&copy;2025 Rafat Hossain. Some rights reserved.</p>
                </aside>
            </footer>
        </div>
    );
}

export default Footer;