import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
    const { serviceId, serviceName, image, price, title, description, rating } = service; // Destructure carefully. Wait, my json has serviceName.

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1" data-aos="fade-up">
            <figure className="h-48 overflow-hidden">
                <img src={image} alt={serviceName} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-between">
                    {serviceName}
                    <div className="badge badge-secondary">{rating} ★</div>
                </h2>
                <p className="text-gray-500 text-sm">{description.slice(0, 80)}...</p>
                <div className="card-actions items-center justify-between mt-4">
                    <div className="text-xl font-bold text-primary">${price}</div>
                    <Link to={`/service/${serviceId}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
};

export default ServiceCard;
