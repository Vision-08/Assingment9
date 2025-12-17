import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
    const slides = [
        {
            id: 1,
            image: "https://i.ibb.co/6yxhvj6/winter-dog-coat.jpg",
            title: "Keep Your Furry Friends Warm",
            desc: "Discover the best winter outfit collection for your pets."
        },
        {
            id: 2,
            image: "https://i.ibb.co/Vq05h6t/grooming.jpg",
            title: "Professional Winter Care",
            desc: "Top-rated grooming and paw treatment services."
        },
        {
            id: 3,
            image: "https://i.ibb.co/mJN55z4/heated-bed.jpg",
            title: "Cozy Comfort at Home",
            desc: "Heated beds and indoor activities for cold days."
        }
    ];

    return (
        <div className="my-6 rounded-2xl overflow-hidden shadow-lg h-[400px] md:h-[500px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={30}
                effect={'fade'}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="h-full w-full"
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full">
                            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center text-white px-4">
                                    <h2 className="text-4xl md:text-6xl font-bold mb-4" data-aos="zoom-in">{slide.title}</h2>
                                    <p className="text-lg md:text-2xl" data-aos="fade-up" data-aos-delay="200">{slide.desc}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Hero;
