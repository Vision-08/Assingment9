import { useLoaderData, useParams, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const ServiceDetails = () => {
    const services = useLoaderData();
    const { id } = useParams();
    const service = services.find(s => s.serviceId === parseInt(id));

    const [modalOpen, setModalOpen] = useState(false);

    if (!service) {
        return <div className="text-center mt-10">Service not found!</div>;
    }

    const handleBook = (e) => {
        e.preventDefault();
        toast.success("Service Booked Successfully!");
        setModalOpen(false);
        e.target.reset();
    };

    return (
        <div className="container mx-auto px-4 my-10">
            <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden">
                <figure className="lg:w-1/2">
                    <img src={service.image} alt={service.serviceName} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-3xl font-bold mb-2">{service.serviceName}</h2>
                    <div className="flex items-center gap-4 mb-4">
                        <span className="badge badge-primary text-lg p-3">${service.price}</span>
                        <span className="badge badge-secondary text-lg p-3">{service.rating} ★</span>
                        <span className="badge badge-outline p-3">{service.category}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="divider">Provider Info</div>
                    <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                                <span className="text-xs">{service.providerName[0]}</span>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{service.providerName}</p>
                            <p className="text-sm text-gray-500">{service.providerEmail}</p>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button onClick={() => setModalOpen(true)} className="btn btn-primary text-white w-full md:w-auto">Book Now</button>
                    </div>
                </div>
            </div>

            {/* Mock Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-box relative">
                        <button onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg mb-4">Book {service.serviceName}</h3>
                        <form onSubmit={handleBook} className="space-y-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Service Name</span></label>
                                <input type="text" value={service.serviceName} readOnly className="input input-bordered bg-gray-100" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Provider Email</span></label>
                                <input type="text" value={service.providerEmail} readOnly className="input input-bordered bg-gray-100" />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Your Email</span></label>
                                <input type="email" placeholder="Enter your email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">User Name</span></label>
                                <input type="text" placeholder="Enter your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary text-white">Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;
