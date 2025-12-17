import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        fetch("/services.json")
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);

    return (
        <div className="container mx-auto px-4">
            {/* Hero Section */}
            <section>
                <Hero />
            </section>

            {/* Services Section */}
            <section className="my-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary" data-aos="fade-up">
                    Popular Winter Care Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service.serviceId} service={service} />
                    ))}
                </div>
            </section>

            {/* Extra Section 1: Winter Care Tips */}
            <section className="my-16 bg-base-200 p-8 rounded-2xl" data-aos="fade-right">
                <h2 className="text-3xl font-bold text-center mb-6">Winter Care Tips</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="collapse collapse-plus bg-base-100 mb-2">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-xl font-medium">Protect the Paws</div>
                            <div className="collapse-content">
                                <p>Salt and ice melt can crack paws. Use paw wax or boots before walks.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 mb-2">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">Adjust Diet</div>
                            <div className="collapse-content">
                                <p>Pets burn more calories to stay warm. Consult your vet about increasing food intake.</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title text-xl font-medium">Hydration is Key</div>
                            <div className="collapse-content">
                                <p>Indoor heating dries out the air. Ensure your pet has plenty of fresh water.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src="https://i.ibb.co/hK7X1X/indoor-play.jpg" alt="Winter Tips" className="rounded-xl shadow-lg max-h-64 object-cover w-full" />
                    </div>
                </div>
            </section>

            {/* Extra Section 2: Meet Our Expert Vets */}
            <section className="my-16" data-aos="fade-left">
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Expert Vets</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {[
                        { name: "Dr. Sarah Smith", role: "Chief Veterinarian", img: "https://i.pravatar.cc/150?img=1" },
                        { name: "Dr. James Doe", role: "Nutrition Specialist", img: "https://i.pravatar.cc/150?img=11" },
                        { name: "Dr. Emily Blunt", role: "Grooming Expert", img: "https://i.pravatar.cc/150?img=5" }
                    ].map((vet, idx) => (
                        <div key={idx} className="card bg-base-100 shadow-md p-6 flex flex-col items-center">
                            <div className="avatar mb-4">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={vet.img} alt={vet.name} />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold">{vet.name}</h3>
                            <p className="text-secondary">{vet.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Extra Section 3: Newsletter (User Requirement: 1 extra section) */}
            <section className="my-16 py-12 px-4 bg-primary text-primary-content rounded-2xl text-center" data-aos="zoom-in">
                <h2 className="text-3xl font-bold mb-4">Join Our Winter Pack!</h2>
                <p className="mb-6 text-lg">Subscribe to get exclusive discounts on winter gear and grooming services.</p>
                <div className="join">
                    <input className="input input-bordered join-item text-black w-full max-w-xs" placeholder="Email address" />
                    <button className="btn btn-secondary join-item">Subscribe</button>
                </div>
            </section>
        </div>
    );
};

export default Home;
