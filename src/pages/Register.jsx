import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;

        // Password Validation
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setPasswordError("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter.");
            return;
        }
        setPasswordError("");

        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                // Update Profile
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        toast.success("Registration Successful!");
                        navigate("/");
                        window.location.reload(); // Reload to reflect user data in navbar immediately if context doesn't auto-update fully on pure object mutation (firebase quirk sometimes)
                        // Actually, onAuthStateChanged in AuthProvider should handle it, but sometimes the first user object doesn't have the updated profile yet.
                    })
                    .catch((err) => toast.error("Profile update failed: " + err.message));
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Google Login Successful!");
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-primary">Join WarmPaws!</h1>
                    <p className="py-6">Join our community of pet lovers ensuring a warm winter for furry friends.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Full Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="https://..." className="input input-bordered" required />
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
                            {passwordError && <p className="text-error text-sm mt-2">{passwordError}</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary text-white">Register</button>
                        </div>
                    </form>
                    <div className="px-8 pb-8">
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-secondary w-full">
                            <FaGoogle className="mr-2" /> Signup with Google
                        </button>
                        <p className="text-center mt-4">
                            Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
