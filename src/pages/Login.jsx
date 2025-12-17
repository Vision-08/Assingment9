import { useContext, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const emailRef = useRef();
    const [showPassword, setShowPassword] = useState(false);

    const from = location.state || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then((result) => {
                console.log(result.user);
                toast.success("Login Successful!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user);
                toast.success("Google Login Successful!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        navigate("/forgot-password", { state: { email } });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-primary">Login now!</h1>
                    <p className="py-6">Access your pet's winter care dashboard and manage bookings efficiently.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered w-full"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <label className="label">
                                <a onClick={handleForgetPassword} className="label-text-alt link link-hover cursor-pointer">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-white">Login</button>
                        </div>
                    </form>
                    <div className="px-8 pb-8">
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-secondary w-full">
                            <FaGoogle className="mr-2" /> Login with Google
                        </button>
                        <p className="text-center mt-4">
                            New here? <Link to="/register" className="text-primary font-bold">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
