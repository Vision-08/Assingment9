import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const { passwordReset } = useContext(AuthContext);
    const location = useLocation();
    const emailRef = useRef();

    useEffect(() => {
        if (location.state && location.state.email) {
            emailRef.current.value = location.state.email;
        }
    }, [location.state]);

    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;

        if (!email) {
            toast.error("Please provide an email address.");
            return;
        }

        passwordReset(email)
            .then(() => {
                toast.success("Password reset email sent!");
                window.location.href = "https://mail.google.com";
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleResetPassword} className="card-body">
                    <h2 className="text-2xl font-bold text-center text-primary mb-4">Reset Password</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            ref={emailRef}
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white">Reset Password</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
