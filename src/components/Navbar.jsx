import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then(() => console.log("User logged out"))
            .catch((error) => console.error(error));
    };

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            {user && <li><NavLink to="/profile">My Profile</NavLink></li>}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-bold text-primary gap-0">
                    Warm<span className="text-secondary">Paws</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                            <div className="w-10 rounded-full border border-primary">
                                <img alt="User" src={user.photoURL || "https://i.ibb.co/tYHjp6B/user.png"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="menu-title text-center text-primary">{user.displayName}</li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={handleSignOut}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-primary btn-sm md:btn-md text-white">Login</Link>
                        <Link to="/register" className="btn btn-outline btn-primary btn-sm md:btn-md hidden sm:flex">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
