import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="text-center mt-20">
            <h1 className="text-5xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4">Page Not Found</p>
            <Link to="/" className="btn btn-primary mt-6">Go Home</Link>
        </div>
    );
};

export default ErrorPage;
